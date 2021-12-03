using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProEventos.Application.Dtos
{
    public class RedeSocialDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string URL { get; set; }
        public int? ImovelId { get; set; }
        public ImovelDto Imovel { get; set; }
        public int? ClienteId { get; set; }
        public ClienteDto Cliente { get; set; }
    }
}
