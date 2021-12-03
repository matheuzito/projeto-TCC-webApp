using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProEventos.Domain
{
    public class ClienteImovel
    {
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }
        public int ImovelId { get; set; }
        public Imovel Imovel { get; set; }
    }
}
