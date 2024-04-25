using System.Text;
using core.Jwt;
using infrastructure;
using infrastructure.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using presentation;
using services.Extensions;
using web.Middleware;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    ContentRootPath = new DirectoryInfo(Directory.GetCurrentDirectory()).Parent!.Parent!.FullName,
    WebRootPath = "img"
});

builder.Configuration.AddJsonFile("moveMarket/web/appsettings.json");
var jwtOptions = builder.Configuration.GetSection("Jwt").Get<JwtOptions>();
builder.Services.AddSingleton(jwtOptions!);

builder.Services.AddTransient<ExceptionHandlingMiddleware>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter 'Bearer [jwt]'",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    var scheme = new OpenApiSecurityScheme 
    {
        Reference = new OpenApiReference
        {
            Type = ReferenceType.SecurityScheme,
            Id = "Bearer"
        }
    };
    options.AddSecurityRequirement(new OpenApiSecurityRequirement { { scheme, Array.Empty<string>() } });
});

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidateIssuer = false,
            ValidateAudience = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions!.Secret)),
            ClockSkew = TimeSpan.Zero
        };
    });


builder.Services.AddControllers()
    .AddApplicationPart(typeof(AssemblyRef).Assembly);

builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddServices();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using var scope = app.Services.CreateScope();
    
    var serviceProvider = scope.ServiceProvider;
    DatabaseUpdater.UpdateDatabase(serviceProvider);
    var users = app.Configuration.GetSection("SeededUsers").GetChildren().AsEnumerable()
        .Select(entry => (email: entry.Key, password: entry.Value!));
    await SeedData.EnsureUsersCreated(users, serviceProvider);
}

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.MapControllers();

app.Run();