using ProEventos.Application.Dtos;
using ProEventos.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProEventos.Application.Contratos
{
    public interface IPrecoService
    {
        Task<PrecoDto[]> SavePrecos(int imovelId, PrecoDto[] models);
        Task<bool> DeletePreco(int imovelId, int precoId);

        Task<PrecoDto[]> GetPrecosByImovelIdAsync(int imovelId);
        Task<PrecoDto> GetPrecoByIdsAsync(int imovelId, int precoId);
    }
}
