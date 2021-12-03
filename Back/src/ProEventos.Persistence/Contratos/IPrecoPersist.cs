using ProEventos.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProEventos.Persistence.Contratos
{
   public interface IPrecoPersist
    {
        Task<Preco[]> GetPrecosByImovelIdAsync(int imovelId);
        Task<Preco> GetPrecoByIdsAsync(int imovelId, int id);

    }
}
