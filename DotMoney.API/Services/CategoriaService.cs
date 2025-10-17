using System;
using DotMoney.API.Models;
namespace DotMoney.API.Services;

public class CategoriaService
{
    private readonly AppDataContext ctx;

    public CategoriaService(AppDataContext context)
    {
        ctx = context;
    }

    // 🔹 Listar todas ou filtrar por nome
    public List<Categoria> Listar(string? nome = null)
    {
        var query = ctx.Categorias.AsQueryable();

        if (!string.IsNullOrEmpty(nome))
            query = query.Where(c => c.Nome.Contains(nome));

        return query.ToList();
    }

    // 🔹 Buscar por ID
    public Categoria? BuscarPorId(int id)
    {
        return ctx.Categorias.FirstOrDefault(c => c.CategoriaId == id);
    }

    // 🔹 Criar
    public Categoria Criar(Categoria categoria)
    {
        ctx.Categorias.Add(categoria);
        ctx.SaveChanges();
        return categoria;
    }

    // 🔹 Atualizar
    public Categoria? Atualizar(int id, Categoria categoria)
    {
        var existente = ctx.Categorias.FirstOrDefault(c => c.CategoriaId == id);
        if (existente is null) return null;

        existente.Nome = categoria.Nome;
        ctx.SaveChanges();
        return existente;
    }

    // 🔹 Deletar
    public bool Deletar(int id)
    {
        var categoria = ctx.Categorias.FirstOrDefault(c => c.CategoriaId == id);
        if (categoria is null) return false;

        ctx.Categorias.Remove(categoria);
        ctx.SaveChanges();
        return true;
    }
}