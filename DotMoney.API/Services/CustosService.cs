using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DotMoney.API.Models;
namespace DotMoney.API.Services;

public class CustosService
{
    private readonly AppDataContext ctx;

    public CustosService(AppDataContext context)
    {
        ctx = context;
    }

    // Listar todos ou filtrar por descrição
    public List<Custos> Listar(string? descricao = null)
    {
        var query = ctx.Custos.AsQueryable();

        if (!string.IsNullOrEmpty(descricao))
            query = query.Where(c => c.Descricao.Contains(descricao));

        return query.ToList();
    }

    // Buscar por ID
    public Custos? BuscarPorId(int id)
    {
        return ctx.Custos.FirstOrDefault(c => c.Id == id);
    }

    // Criar novo custo
    public Custos Criar(Custos custo)
    {
        ctx.Custos.Add(custo);
        ctx.SaveChanges();
        return custo;
    }

    // Atualizar custo existente
    public Custos? Atualizar(int id, Custos custo)
    {
        var existente = ctx.Custos.FirstOrDefault(c => c.Id == id);
        if (existente == null) return null;

        existente.Descricao = custo.Descricao;
        existente.Valor = custo.Valor;
        existente.Data = custo.Data;
        existente.CategoriaId = custo.CategoriaId;
        existente.UsuarioId = custo.UsuarioId;

        ctx.SaveChanges();
        return existente;
    }

    // Deletar custo
    public bool Deletar(int id)
    {
        var custo = ctx.Custos.FirstOrDefault(c => c.Id == id);
        if (custo == null) return false;

        ctx.Custos.Remove(custo);
        ctx.SaveChanges();
        return true;
    }
}

