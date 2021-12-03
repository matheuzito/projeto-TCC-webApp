using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProEventos.Application
{
    public class ImovelService : IImovelService
    {
        public readonly IGeralPersist _geralPersist;
        private readonly IImovelPersist _imovelPersist;
        private readonly IMapper _mapper;

        public ImovelService(IGeralPersist geralPersist, 
                              IImovelPersist imovelPersist,
                              IMapper mapper)
        {
            _geralPersist = geralPersist;
            _imovelPersist = imovelPersist;
            _mapper = mapper;
        }
        public async Task<ImovelDto> AddImoveis(ImovelDto model)
        {
            try
            {
                var imovel = _mapper.Map<Imovel>(model);

                _geralPersist.Add<Imovel>(imovel);

                if (await _geralPersist.SaveChangesAsync())
                {
                    var imovelRetorno = await _imovelPersist.GetImovelByIdAsync(imovel.Id, false);
                   
                    return _mapper.Map<ImovelDto>(imovelRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ImovelDto> UpdateImovel(int imovelId, ImovelDto model)
        {
            try
            {
                var imovel = await _imovelPersist.GetImovelByIdAsync(imovelId, false);
                if (imovel == null) return null;

                model.Id = imovel.Id;

                _mapper.Map(model, imovel);

                _geralPersist.Update<Imovel>(imovel);

                if (await _geralPersist.SaveChangesAsync())
                {
                    var imovelRetorno = await _imovelPersist.GetImovelByIdAsync(imovel.Id, false);

                    return _mapper.Map<ImovelDto>(imovelRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteImovel(int imovelId)
        {
            try
            {
                var imovel = await _imovelPersist.GetImovelByIdAsync(imovelId, false);
                if (imovel == null) throw new Exception("Evento para delete não encontrado.");

                _geralPersist.Delete<Imovel>(imovel);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ImovelDto[]> GetAllImoveisAsync(bool includeClientes = false)
        {
            try
            {
                var imoveis = await _imovelPersist.GetAllImoveisAsync(includeClientes);
                if (imoveis == null) return null;

                var resultado = _mapper.Map<ImovelDto[]>(imoveis);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ImovelDto[]> GetAllImoveisByNomeAsync(string nome, bool includeClientes = false)
        {
            try
            {
                var imoveis = await _imovelPersist.GetAllImoveisByNomeAsync(nome, includeClientes);
                if (imoveis == null) return null;

                var resultado = _mapper.Map<ImovelDto[]>(imoveis);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ImovelDto> GetImovelByIdAsync(int imovelId, bool includeClientes = false)
        {
            try
            {
                var imovel = await _imovelPersist.GetImovelByIdAsync(imovelId, includeClientes);
                if (imovel == null) return null;

                var resultado = _mapper.Map<ImovelDto>(imovel);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
