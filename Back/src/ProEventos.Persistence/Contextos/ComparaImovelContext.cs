using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Domain.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Persistence.Contextos
{
    public class ComparaImovelContext : IdentityDbContext<User, Role, int,
                                                            IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
                                                            IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public ComparaImovelContext(DbContextOptions<ComparaImovelContext> options) 
            : base(options) { }
        public DbSet<Imovel> Imoveis { get; set; }
        public DbSet<Preco> Precos { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<ClienteImovel> ClienteImoveis { get; set; }
        public DbSet<RedeSocial> RedesSociais { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                            .WithMany(r => r.UserRoles)
                            .HasForeignKey(ur => ur.RoleId)
                            .IsRequired();

                userRole.HasOne(ur => ur.User)
                            .WithMany(r => r.UserRoles)
                            .HasForeignKey(ur => ur.UserId)
                            .IsRequired();
            });

            modelBuilder.Entity<ClienteImovel>()
                .HasKey(PE => new { PE.ImovelId, PE.ClienteId});

            modelBuilder.Entity<Imovel>()
                .HasMany(e => e.RedesSociais)
                .WithOne(rs => rs.Imovel)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Cliente>()
                .HasMany(e => e.RedesSociais)
                .WithOne(rs => rs.Cliente)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
