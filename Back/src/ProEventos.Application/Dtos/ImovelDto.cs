using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Application.Dtos
{
    public class ImovelDto
    {
        public int Id { get; set; }
        public string Endereco { get; set; }
        public string DataImovelCadastrado { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório."),
        //MinLength(3, ErrorMessage = "{0} deve ter no mínimo 4 caracteres"),
        //MaxLength(50, ErrorMessage = "{0} deve ter no máximo 50 caracteres")
        StringLength(50, MinimumLength =3,
                         ErrorMessage ="Intervalo permitido entre 3 a 50 caracteres.")]
        public string Nome { get; set; }
        public string TipoImovel { get; set; }
        public string DescricaoImovel { get; set; }

        [Display(Name ="Qtd Quartos")]
        [Range(1, 4, ErrorMessage ="{0} não pode ser menor que 1 e maior que 4")]
        public int QtdQuartos { get; set; }
        public string Area { get; set; }

        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$",
            ErrorMessage ="Não é uma imagem válida. (gif, jpg, jpeg, bmp ou png)")]
        public string ImagemURL { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatório")]
        [Phone(ErrorMessage = "O campo {0} está com número inválido")]
        public string Telefone { get; set; }

        [Display(Name = "e-mail"),
        Required(ErrorMessage ="O campo {0} é obrigatório."),
        EmailAddress(ErrorMessage = "É necessário ser um {0} válido")]
        public string Email { get; set; }

        public IEnumerable<PrecoDto> Precos { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<ClienteDto> Clientes { get; set; }
    }
}
