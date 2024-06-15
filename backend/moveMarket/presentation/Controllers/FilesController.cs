using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace presentation.Controllers;

public class FilesController(IWebHostEnvironment env, IConfiguration config) : Controller
{
    [HttpGet("api/files/{imageId}")]
    public IActionResult GetImage(string imageId)
    {
        var path = Path.Combine(env.ContentRootPath, config["ImagesDirPath"]!);
        var imagePath = Directory.GetFiles(path, $"{imageId}.*").FirstOrDefault();
        if (imagePath == null)
            return NotFound();
        var stream = new FileStream(imagePath, FileMode.Open);
        return File(stream, $"image/{Path.GetExtension(imagePath).TrimStart('.')}");
    }
}