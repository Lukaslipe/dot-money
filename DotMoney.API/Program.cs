using DotMoney.API.Models;
using DotMoney.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// === BANCO DE DADOS ===
builder.Services.AddDbContext<AppDataContext>();

// === INJEÇÃO DE DEPENDÊNCIAS ===
builder.Services.AddScoped<CategoriaService>();
builder.Services.AddScoped<CustosService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped(typeof(IPasswordHasher<>), typeof(PasswordHasher<>));
builder.Services.AddScoped<LogService>();

// === JWT ===
var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwtSettings["Key"] ?? throw new ArgumentNullException("Jwt:Key não está configurada."));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

builder.Services.AddAuthorization();

// === SWAGGER ===
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "DotMoney API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Bearer. Exemplo: 'Bearer {seu_token}'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

// --- AUTH ---
app.MapPost("/api/auth/register", async (RegistroDTO dto, IAuthService auth) =>
{
    var result = await auth.Registrar(dto);
    return result is null ? Results.BadRequest(new { Message = "Usuário ou E-mail já cadastrado." }) : Results.Ok(result);
});

app.MapPost("/api/auth/login", async (LoginDTO dto, IAuthService auth) =>
{
    var result = await auth.Login(dto);
    return result is null ? Results.Unauthorized() : Results.Ok(result);
});

// --- CATEGORIAS ---
app.MapGet("/api/categorias/listar", (string? nome, CategoriaService service) =>
{
    var categorias = service.Listar(nome);
    return Results.Ok(categorias);
}).RequireAuthorization();

app.MapGet("/api/categorias/buscar", (int id, CategoriaService service) =>
{
    var cat = service.BuscarPorId(id);
    return cat is null ? Results.NotFound("Categoria não encontrada.") : Results.Ok(cat);
}).RequireAuthorization();

app.MapPost("/api/categorias/cadastrar", async (Categoria categoria, CategoriaService service, HttpContext ctx) =>
{
    var usuarioId = int.Parse(ctx.User.FindFirst("id")!.Value);
    var criada = await service.Criar(categoria, usuarioId);
    return Results.Created($"/api/categorias/buscar?id={criada.CategoriaId}", criada);
}).RequireAuthorization();

app.MapPatch("/api/categorias/editar", (int id, Categoria categoria, CategoriaService service, HttpContext ctx) =>
{
    var usuarioId = int.Parse(ctx.User.FindFirst("id")!.Value);
    var atualizada = service.Atualizar(id, categoria, usuarioId);
    return atualizada is null ? Results.NotFound("Categoria não encontrada.") : Results.Ok(atualizada);
}).RequireAuthorization();

app.MapDelete("/api/categorias/remover", async (int id, CategoriaService service, HttpContext ctx) =>
{
	var usuarioId = int.Parse(ctx.User.FindFirst("id")!.Value);
	var sucesso = await service.Deletar(id, usuarioId);
	return sucesso ? Results.Ok("Categoria removida com sucesso.") : Results.NotFound("Categoria não encontrada.");
}).RequireAuthorization();

// --- CUSTOS ---
app.MapGet("/api/custos/listar", (string? descricao, CustosService service) =>
{
    var list = service.Listar(descricao);
    return Results.Ok(list);
}).RequireAuthorization();

app.MapGet("/api/custos/buscar", (int id, CustosService service) =>
{
    var item = service.BuscarPorId(id);
    return item is null ? Results.NotFound("Custo não encontrado.") : Results.Ok(item);
}).RequireAuthorization();

app.MapPost("/api/custos/cadastrar", (Custos custo, CustosService service, HttpContext ctx) =>
{
    var usuarioId = int.Parse(ctx.User.FindFirst("id")!.Value);
    var criado = service.Criar(custo, usuarioId);
    return Results.Created($"/api/custos/buscar?id={criado.Id}", criado);
}).RequireAuthorization();

app.MapPatch("/api/custos/editar", (int id, Custos custo, CustosService service, HttpContext ctx) =>
{
    var usuarioId = int.Parse(ctx.User.FindFirst("id")!.Value);
    var atualizado = service.Atualizar(id, custo, usuarioId);
    return atualizado is null ? Results.NotFound("Custo não encontrado.") : Results.Ok(atualizado);
}).RequireAuthorization();

app.MapDelete("/api/custos/remover", async (int id, CustosService service, HttpContext ctx) =>
{
    var usuarioId = int.Parse(ctx.User.FindFirst("id")!.Value);
    var sucesso = await service.Deletar(id, usuarioId);
    return sucesso ? Results.Ok("Custo removido com sucesso.") : Results.NotFound("Custo não encontrado.");
}).RequireAuthorization();

app.Run();
