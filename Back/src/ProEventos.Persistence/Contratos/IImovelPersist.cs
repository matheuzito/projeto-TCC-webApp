using ProEventos.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProEventos.Persistence.Contratos
{
   public interface IImovelPersist
    {
        //Eventos
        Task<Imovel[]> GetAllImoveisByNomeAsync(string nome, bool includeClientes = false);
        Task<Imovel[]> GetAllImoveisAsync(bool includeClientes = false);
        Task<Imovel> GetImovelByIdAsync(int imovelId, bool includeClientes = false);

    }
}
