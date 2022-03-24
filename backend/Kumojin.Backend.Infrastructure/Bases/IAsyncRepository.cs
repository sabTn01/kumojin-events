using System.Collections.Generic;
using System.Threading.Tasks;
using Kumojin.Backend.Domain.Bases;

namespace Kumojin.Backend.Infrastructure.Bases
{
    public interface IAsyncRepository<TEntity> where TEntity : BaseModel
    {
        Task InsertAsync(TEntity entity);
        Task<ICollection<TEntity>> GetListAsync();
    }
}