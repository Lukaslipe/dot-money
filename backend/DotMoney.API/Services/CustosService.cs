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

    // Listar custos do usuário específico
    public List<Custos> Listar(int usuarioId, string? descricao = null)
    {
        var query = ctx.Custos.Where(c => c.UsuarioId == usuarioId);

        if (!string.IsNullOrEmpty(descricao))
            query = query.Where(c => c.Descricao.Contains(descricao));

        return query.ToList();
    }

    // Buscar custo por ID do usuário
    public Custos? BuscarPorId(int id, int usuarioId)
    {
        return ctx.Custos.FirstOrDefault(c => c.Id == id && c.UsuarioId == usuarioId);
    }

    // Criar novo custo
    public async Task<Custos> Criar(Custos custo, int usuarioId)
    {
        custo.UsuarioId = usuarioId;
        ctx.Custos.Add(custo);
        ctx.SaveChanges();

        await log.RegistrarLog(usuarioId, $"Custo cadastrado: {custo.Descricao}");
        
        return custo;
    }

    // Atualizar custo existente
    public async Task<Custos?> Atualizar(int id, Custos custo, int usuarioId)
    {
        var existente = ctx.Custos.FirstOrDefault(c => c.Id == id && c.UsuarioId == usuarioId);
        if (existente == null) return null;

        existente.Descricao = custo.Descricao;
        existente.Valor = custo.Valor;
        existente.Data = custo.Data;
        existente.CategoriaId = custo.CategoriaId;

        ctx.SaveChanges();

        await log.RegistrarLog(usuarioId, $"Custo atualizado id:{existente.Id}");

        return existente;
    }

    // Deletar custo
    public async Task<bool> Deletar(int id, int usuarioId)
    {
        var custo = ctx.Custos.FirstOrDefault(c => c.Id == id && c.UsuarioId == usuarioId);
        if (custo == null) return false;

        ctx.Custos.Remove(custo);
        ctx.SaveChanges();

        await log.RegistrarLog(usuarioId, $"Custo deletado: {custo.Descricao}");

        return true;
    }
}