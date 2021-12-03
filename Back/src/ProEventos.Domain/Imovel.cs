using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Domain
{
    public class Imovel
    {
        public int Id { get; set; }
        public string Endereco { get; set; }
        public DateTime? DataImovelCadastrado { get; set; }
        public string Nome { get; set; }
        public string TipoImovel { get; set; }
        public string DescricaoImovel { get; set; }
        public int QtdQuartos { get; set; }
        public string Area { get; set; }
        public string ImagemURL { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public IEnumerable<Preco> Precos { get; set; }
        public IEnumerable<RedeSocial> RedesSociais { get; set; }
        public IEnumerable<ClienteImovel> ClientesImoveis { get; set; }
    }
}
