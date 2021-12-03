using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProEventos.Application.Dtos
{
    public class PrecoDto
    {
        public int Id { get; set; }
        public string Descricao { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Valor { get; set; }
        public int ImovelId { get; set; }
        public ImovelDto Imovel { get; set; }
    }
}
