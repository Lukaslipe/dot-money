using System;
using System.Threading.Tasks;
using DotMoney.API.Models;
namespace DotMoney.API.Services;

public class CategoriaService
{
    private readonly AppDataContext ctx;
    private readonly LogService log;
    public CategoriaService(AppDataContext context, LogService LogService)
    {
        ctx = context;
        log = LogService;
    }

    // Listar todas ou filtrar por nome
    public List<Categoria> Listar(string? nome = null)
    {
        var query = ctx.Categorias.AsQueryable();

        if (!string.IsNullOrEmpty(nome))
            query = query.Where(c => c.Nome.Contains(nome));

        return query.ToList();
    }

    // Buscar por ID
    public Categoria? BuscarPorId(int id)
    {
        return ctx.Categorias.FirstOrDefault(c => c.CategoriaId == id);
    }

    // Criar
    public async Task<Categoria> Criar(Categoria categoria, int usuarioId)
    {
        ctx.Categorias.Add(categoria);
        ctx.SaveChanges();

        await log.RegistrarLog(usuarioId, $"Categoria cadastrada: {categoria.Nome}");
        return categoria;
    }

    // Atualizar
    public async Task<Categoria?> Atualizar(int id, Categoria categoria, int usuarioId)
    {
        var existente = ctx.Categorias.FirstOrDefault(c => c.CategoriaId == id);
        if (existente is null) return null;

        existente.Nome = categoria.Nome;
        ctx.SaveChanges();

        await log.RegistrarLog(usuarioId, $"Categoria editada id:{id}");
        return existente;
    }

    // Deletar
    public async Task<bool> Deletar(int id, int usuarioId)
    {
        var categoria = ctx.Categorias.FirstOrDefault(c => c.CategoriaId == id);
        if (categoria is null) return false;

        ctx.Categorias.Remove(categoria);
        await ctx.SaveChangesAsync();

        await log.RegistrarLog(usuarioId, $"Categoria deletada: {categoria.Nome}");
        return true;
    }
}