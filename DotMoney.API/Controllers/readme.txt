Aqui vamos criar as rotas/endpoints da API

Como por exemplo essa:

app.MapGet("/api/produto/listar",
    ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Produtos.Any())
    {
        return Results.Ok(ctx.Produtos.ToList());
    } 

    return Results.NotFound("Lista vazia!");
});