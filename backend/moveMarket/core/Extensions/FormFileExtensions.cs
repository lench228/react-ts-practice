using Microsoft.AspNetCore.Http;

namespace core.Extensions;

public static class FormFileExtensions
{
    public static async Task<string> SaveFormFile(this IFormFile file, string savePath)
    {
        var filename = Guid.NewGuid() + Path.GetExtension(file.FileName);
        var path = Path.Combine(savePath, filename);
        await using var fileStream = new FileStream(path, FileMode.Create);
        await file.CopyToAsync(fileStream);
        return path;
    }
}