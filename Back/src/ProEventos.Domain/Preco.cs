using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProEventos.Domain
{
    public class Preco
    {
        public int Id { get; set; }
        public string Descricao { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Valor{ get; set; }
        public int ImovelId { get; set; }
        public Imovel Imovel { get; set; }
    }
}
