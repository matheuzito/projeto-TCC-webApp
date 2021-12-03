using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.Persistence;
using ProEventos.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Persistence.Contextos;
using ProEventos.Application.Contratos;
using Microsoft.AspNetCore.Http;
using ProEventos.Application.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrecosController : ControllerBase
    {
        private readonly IPrecoService _precoService;

        public PrecosController(IPrecoService PrecoService)
        {
            _precoService = PrecoService;
        }

        [HttpGet("{imovelId}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int imovelId)
        {
            try
            {
                var precos = await _precoService.GetPrecosByImovelIdAsync(imovelId);
                if (precos == null) return NoContent();

          
                return Ok(precos);
            }
            catch (Exception ex)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar preços. Erro: {ex.Message}");
            }
        }



        [HttpPut("{imovelId}")]
        public async Task<IActionResult> SavePrecos(int imovelId, PrecoDto[] models)
        {
            try
            {
                var preco = await _precoService.SavePrecos(imovelId, models);
                if (preco == null) return NoContent();
                return Ok(preco);
            }
            catch (Exception ex)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar salvar preços. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{imovelId}/{precoId}")]
        public async Task<IActionResult> Delete(int imovelId, int precoId)
        {
            try
            {
                var preco = await _precoService.GetPrecoByIdsAsync(imovelId, precoId);
                if (preco == null) return NoContent();

                return await _precoService.DeletePreco(preco.ImovelId, preco.Id)
                    ? Ok(new { message = "Preço Deletado" }):
                     throw new Exception("Ocorreu um problema não específico ao tentar deletar preço!");
                
            }
            catch (Exception ex)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar os preços. Erro: {ex.Message}");
            }
        }
    }
}
