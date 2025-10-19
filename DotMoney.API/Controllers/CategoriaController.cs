using Microsoft.AspNetCore.Mvc;
using DotMoney.API.Models;
using DotMoney.API.Services;
using Microsoft.AspNetCore.Authorization;

namespace DotMoney.API.Controllers;

[Authorize]
[ApiController]
[Route("api/categorias")]
public class CategoriasController : ControllerBase
{
    private readonly CategoriaService _service;

    public CategoriasController(CategoriaService service)
    {
        _service = service;
    }

    // Listar todas ou filtrar por nome
    [HttpGet("listar")]
    public IResult Listar([FromQuery] string? nome)
    {
        var categorias = _service.Listar(nome);
        return Results.Ok(categorias);
    }

    // Buscar por ID
    [HttpGet("buscar")]
    public IResult Buscar([FromQuery] int id)
    {
        var categoria = _service.BuscarPorId(id);
        if (categoria == null)
            return Results.NotFound("Categoria não encontrada.");
        return Results.Ok(categoria);
    }

    // Cadastrar nova categoria
    [HttpPost("cadastrar")]
    public IResult Cadastrar([FromBody] Categoria categoria)
    {
        var criada = _service.Criar(categoria);
        return Results.Created($"/api/categorias/buscar?id={criada.CategoriaId}", criada);
    }

    // Editar categoria
    [HttpPatch("editar")]
    public IResult Editar([FromQuery] int id, [FromBody] Categoria categoria)
    {
        var atualizada = _service.Atualizar(id, categoria);
        if (atualizada == null)
            return Results.NotFound("Categoria não encontrada.");
        return Results.Ok(atualizada);
    }

    // Remover categoria
    [HttpDelete("remover")]
    public IResult Remover([FromQuery] int id)
    {
        var sucesso = _service.Deletar(id);
        if (!sucesso)
            return Results.NotFound("Categoria não encontrada.");
        return Results.Ok("Categoria removida com sucesso.");
    }
}