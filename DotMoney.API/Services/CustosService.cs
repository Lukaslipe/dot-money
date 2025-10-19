using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DotMoney.API.Models;
namespace DotMoney.API.Services;

public class CustosService
{
    private readonly AppDataContext ctx;
    private readonly LogService log;
    public CustosService(AppDataContext context, LogService LogService)
    {
        ctx = context;
        log = LogService;
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
    public async Task<Custos> Criar(Custos custo, int usuarioId)
    {
        ctx.Custos.Add(custo);
        ctx.SaveChanges();

        await log.RegistrarLog(usuarioId, $"Custo cadastrado: {custo.Descricao}");
        
        return custo;
    }


    // Atualizar custo existente
    public async Task<Custos?> Atualizar(int id, Custos custo, int usuarioId)
    {
        var existente = ctx.Custos.FirstOrDefault(c => c.Id == id);
        if (existente == null) return null;

        existente.Descricao = custo.Descricao;
        existente.Valor = custo.Valor;
        existente.Data = custo.Data;
        existente.CategoriaId = custo.CategoriaId;
        existente.UsuarioId = custo.UsuarioId;

        ctx.SaveChanges();

        await log.RegistrarLog(usuarioId, $"Custo atualizado id:{existente.Id}");

        return existente;
    }


    // Deletar custo
    public async Task<bool> Deletar(int id, int usuarioId)
    {
        var custo = ctx.Custos.FirstOrDefault(c => c.Id == id);
        if (custo == null) return false;

        ctx.Custos.Remove(custo);
        ctx.SaveChanges();

        await log.RegistrarLog(usuarioId, $"Custo deletado: {custo.Descricao}");

        return true;
    }
}

