using ProEventos.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProEventos.Persistence.Contratos
{
   public interface IClientePersist
    {

        //Palestrantes
        Task<Cliente[]> GetAllClientesByNomeAsync(string nome, bool includeImoveis);
        Task<Cliente[]> GetAllClientesAsync(bool includeImoveis);
        Task<Cliente> GetClienteByIdAsync(int clienteId, bool includeImoveis);

    }
}
