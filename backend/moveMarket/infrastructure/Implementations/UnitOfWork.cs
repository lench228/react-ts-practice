using domain.Interfaces;

namespace infrastructure.Implementations;

internal class UnitOfWork(ApplicationDbContext context) : IUnitOfWork
{
    public Task SaveChangesAsync()
    {
        return context.SaveChangesAsync();
    }
}