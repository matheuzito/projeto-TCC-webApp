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
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImoveisController : ControllerBase
    {
        private readonly IImovelService _imovelService;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ImoveisController(IImovelService imovelService, IWebHostEnvironment hostEnvironment)
        {
            _imovelService = imovelService;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Get()
        {
            try
            {
                var imoveis = await _imovelService.GetAllImoveisAsync(true);
                if (imoveis == null) return NoContent();


                return Ok(imoveis);
            }
            catch (Exception ex)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar imoveis. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var imovel = await _imovelService.GetImovelByIdAsync(id, true);
                if (imovel == null) return NoContent();
                return Ok(imovel);
            }
            catch (Exception ex)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar imoveis. Erro: {ex.Message}");
            }
        }

        [HttpGet("{nome}/nome")]
        public async Task<IActionResult> GetByNome(string nome)
        {
            try
            {
                var imovel = await _imovelService.GetAllImoveisByNomeAsync(nome, true);
                if (imovel == null) return NoContent();
                return Ok(imovel);
            }
            catch (Exception ex)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpPost("upload-image/{imovelId}")]
        public async Task<IActionResult> UploadImage(int imovelId)
        {
            try
            {
                var imovel = await _imovelService.GetImovelByIdAsync(imovelId, true);
                if (imovel == null) return NoContent();


                var file = Request.Form.Files[0];
                if (file.Length > 0)
                {
                    DeleteImage(imovel.ImagemURL);
                    imovel.ImagemURL = await SaveImage(file);
                }
                var ImovelRetorno = await _imovelService.UpdateImovel(imovelId, imovel);

                return Ok(ImovelRetorno);
            }
            catch (Exception ex)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar imoveis. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(ImovelDto model)
        {
            try
            {
                var imovel = await _imovelService.AddImoveis(model);
                if (imovel == null) return NoContent();
                return Ok(imovel);
            }
            catch (Exception ex)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar imoveis. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ImovelDto model)
        {
            try
            {
                var imovel = await _imovelService.UpdateImovel(id, model);
                if (imovel == null) return NoContent();
                return Ok(imovel);
            }
            catch (Exception ex)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar imoveis. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var imovel = await _imovelService.GetImovelByIdAsync(id, true);
                if (imovel == null) return NoContent();

                if (await _imovelService.DeleteImovel(id))
                {
                    DeleteImage(imovel.ImagemURL);
                    return Ok(new { message = "Deletado" });
                }
                else
                {
                     throw new Exception("Ocorreu um problema não específico ao tentar deletar Imóvel!");
                }

            }
            catch (Exception ex)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar os imoveis. Erro: {ex.Message}");
            }
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName)
                                             .Take(10)
                                             .ToArray()
                                             ).Replace(' ', '-');

            imageName = $"{imageName}{DateTime.UtcNow.ToString("yymmssfff")}{Path.GetExtension(imageFile.FileName)}";

            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, @"Resources/Images", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return imageName;
        }


        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, @"Resources/Images", imageName);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
