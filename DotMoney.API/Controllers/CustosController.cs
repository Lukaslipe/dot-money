using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DotMoney.API.Models;
using DotMoney.API.Services;

namespace DotMoney.API.Controllers;

[ApiController]
[Route("api/custos")]
public class CustosController : ControllerBase
{
    private readonly CustosService _service;

    public CustosController(CustosService service)
    {
         _service = service;
    }

    // Listar todos ou filtrar por descrição
    [HttpGet("listar")]
    public IResult Listar([FromQuery] string? descricao)
    {
         var custos = _service.Listar(descricao);
         return Results.Ok(custos);
    }

    // Buscar por ID
    [HttpGet("buscar")]
    public IResult Buscar([FromQuery] int id)
    {
        var custo = _service.BuscarPorId(id);
         if (custo == null)
            return Results.NotFound("Custo não encontrado.");
        return Results.Ok(custo);
    }

    // Cadastrar novo custo
    [HttpPost("cadastrar")]
    public IResult Cadastrar([FromBody] Custos custo)
    {
        var criado = _service.Criar(custo);
        return Results.Created($"/api/custos/buscar?id={criado.Id}", criado);
    }

    // Editar custo
    [HttpPatch("editar")]
    public IResult Editar([FromQuery] int id, [FromBody] Custos custo)
    {
        var atualizado = _service.Atualizar(id, custo);
        if (atualizado == null)
            return Results.NotFound("Custo não encontrado.");
        return Results.Ok(atualizado);
    }

    // Remover custo
    [HttpDelete("remover")]
    public IResult Remover([FromQuery] int id)
    {
         var sucesso = _service.Deletar(id);
        if (!sucesso)
            return Results.NotFound("Custo não encontrado.");
        return Results.Ok("Custo removido com sucesso.");
    }
}
    

