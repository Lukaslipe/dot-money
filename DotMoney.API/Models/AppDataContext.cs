using System;
using DotMoney.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DotMoney.API.Models;

public class AppDataContext : DbContext
{
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Custos> Custos { get; set; }
    public DbSet<Usuarios> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=dotMoney.db");
    }
}
