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
    public class PrecoPersist : IPrecoPersist
    {
        private readonly ComparaImovelContext _context;

        public PrecoPersist(ComparaImovelContext context)
        {
            _context = context;
        }

        public async Task<Preco> GetPrecoByIdsAsync(int imovelId, int id)
        {
            IQueryable<Preco> query = _context.Precos;

            query = query.AsNoTracking()
                .Where(preco => preco.ImovelId == imovelId
                                && preco.Id == id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Preco[]> GetPrecosByImovelIdAsync(int imovelId)
        {
            IQueryable<Preco> query = _context.Precos;

            query = query.AsNoTracking()
            .Where(preco => preco.ImovelId == imovelId);

            return await query.ToArrayAsync();
        }
    }
}
