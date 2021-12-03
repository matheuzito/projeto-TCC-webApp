using ProEventos.Application.Dtos;
using ProEventos.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProEventos.Application.Contratos
{
    public interface IImovelService
    {
        Task<ImovelDto> AddImoveis(ImovelDto model);
        Task<ImovelDto> UpdateImovel(int imovelId, ImovelDto model);
        Task<bool> DeleteImovel(int imovelId);

        Task<ImovelDto[]> GetAllImoveisAsync(bool includeClientes = false);
        Task<ImovelDto[]> GetAllImoveisByNomeAsync(string nome, bool includeClientes = false);
        Task<ImovelDto> GetImovelByIdAsync(int imovelId, bool includeClientes = false);
    }
}
