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
    public class ImovelPersist : IImovelPersist
    {
        private readonly ComparaImovelContext _context;

        public ImovelPersist(ComparaImovelContext context)
        {
            _context = context;
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Imovel[]> GetAllImoveisAsync(bool includeClientes = false)
        {
            IQueryable<Imovel> query = _context.Imoveis
                .Include(e => e.Precos)
                .Include(e => e.RedesSociais);

            if (includeClientes)
            {
                query = query
                    .Include(e => e.ClientesImoveis)
                    .ThenInclude(pe => pe.Cliente);
            }

            query = query.AsNoTracking().OrderBy(e => e.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Imovel[]> GetAllImoveisByNomeAsync(string nome, bool includeClientes = false)
        {
            IQueryable<Imovel> query = _context.Imoveis
                .Include(e => e.Precos)
                .Include(e => e.RedesSociais);

            if (includeClientes)
            {
                query = query
                    .Include(e => e.ClientesImoveis)
                    .ThenInclude(pe => pe.Cliente);
            }

            query = query.AsNoTracking().OrderBy(e => e.Id)
                         .Where(e =>e.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Imovel> GetImovelByIdAsync(int imovelId, bool includeClientes = false)
        {
            IQueryable<Imovel> query = _context.Imoveis
                    .Include(e => e.Precos)
                    .Include(e => e.RedesSociais);

            if (includeClientes)
            {
                query = query
                    .Include(e => e.ClientesImoveis)
                    .ThenInclude(pe => pe.Cliente);
            }

            query = query.AsNoTracking().OrderBy(e => e.Id)
                         .Where(e => e.Id == imovelId);

            return await query.FirstOrDefaultAsync();
        }
    }
}
