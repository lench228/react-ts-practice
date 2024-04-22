using core.Entities.Base;

namespace domain.Interfaces;

public interface IRepository<TEntity> : ITypedRepository<Guid, TEntity>
    where TEntity: IEntity<Guid>
{
    
}