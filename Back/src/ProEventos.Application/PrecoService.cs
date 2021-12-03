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
    public class PrecoService : IPrecoService
    {
        public readonly IGeralPersist _geralPersist;
        private readonly IPrecoPersist _precoPersist;
        private readonly IMapper _mapper;

        public PrecoService(IGeralPersist geralPersist,
                              IPrecoPersist precoPersist,
                              IMapper mapper)
        {
            _geralPersist = geralPersist;
            _precoPersist = precoPersist;
            _mapper = mapper;
        }
        public async Task AddPreco(int imovelId, PrecoDto model)
        {
            try
            {
                var preco = _mapper.Map<Preco>(model);
                preco.ImovelId = imovelId;

                _geralPersist.Add<Preco>(preco);

                await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<PrecoDto[]> SavePrecos(int imovelId, PrecoDto[] models)
        {
            try
            {
                var precos = await _precoPersist.GetPrecosByImovelIdAsync(imovelId);
                if (precos == null) return null;

                foreach (var model in models)
                {
                    if (model.Id == 0)
                    {
                        await AddPreco(imovelId, model);
                    }
                    else
                    {

                        var preco = precos.FirstOrDefault(preco => preco.Id == model.Id);
                        model.ImovelId = imovelId;

                        _mapper.Map(model, preco);

                        _geralPersist.Update<Preco>(preco);

                        await _geralPersist.SaveChangesAsync();
                    }
                }

               
                    var precoRetorno = await _precoPersist.GetPrecosByImovelIdAsync(imovelId);

                    return _mapper.Map<PrecoDto[]>(precoRetorno);
                
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeletePreco(int imovelId, int precoId)
        {
            try
            {
                var preco = await _precoPersist.GetPrecoByIdsAsync(imovelId, precoId);
                if (preco == null) throw new Exception("Preco para delete não encontrado.");

                _geralPersist.Delete<Preco>(preco);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<PrecoDto[]> GetPrecosByImovelIdAsync(int imovelId)
        {
            try
            {
                var imoveis = await _precoPersist.GetPrecosByImovelIdAsync(imovelId);
                if (imoveis == null) return null;

                var resultado = _mapper.Map<PrecoDto[]>(imoveis);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<PrecoDto> GetPrecoByIdsAsync(int imovelId, int precoId)
        {
            try
            {
                var preco = await _precoPersist.GetPrecoByIdsAsync(imovelId, precoId);
                if (preco == null) return null;

                var resultado = _mapper.Map<PrecoDto>(preco);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
