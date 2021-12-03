using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;
using ProEventos.Persistence.Contratos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProEventos.Persistence
{
    public class ClientePersist : IClientePersist
    {
        private readonly ComparaImovelContext _context;

        public ClientePersist(ComparaImovelContext context)
        {
            _context = context;
        }

        public async Task<Cliente[]> GetAllClientesAsync(bool includeImoveis = false)
        {
            IQueryable<Cliente> query = _context.Clientes
                      .Include(p => p.RedesSociais);

            if (includeImoveis)
            {
                query = query
                    .Include(p => p.ClientesImoveis)
                    .ThenInclude(pe => pe.Imovel);
            }

            query = query.AsNoTracking().OrderBy(p => p.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Cliente[]> GetAllClientesByNomeAsync(string nome, bool includeImoveis)
        {
            IQueryable<Cliente> query = _context.Clientes
          .Include(p => p.RedesSociais);

            if (includeImoveis)
            {
                query = query
                    .Include(p => p.ClientesImoveis)
                    .ThenInclude(pe => pe.Imovel);
            }

            query = query.AsNoTracking().OrderBy(p => p.Id)
                .Where(p => p.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Cliente> GetClienteByIdAsync(int clienteId, bool includeImoveis)
        {
            IQueryable<Cliente> query = _context.Clientes
                        .Include(p => p.RedesSociais);

            if (includeImoveis)
            {
                query = query
                    .Include(p => p.ClientesImoveis)
                    .ThenInclude(pe => pe.Imovel);
            }

            query = query.AsNoTracking().OrderBy(p => p.Id)
                .Where(p => p.Id == clienteId);

            return await query.FirstOrDefaultAsync();
        }

    }
}
