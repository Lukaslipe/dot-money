using DotMoney.API;
using DotMoney.API.Services;
using DotMoney.API.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Adicionar DbContext
builder.Services.AddDbContext<AppDataContext>();

// Devemos ter uma linha dessa para cada Service criado
builder.Services.AddScoped<CategoriaService>();

builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();

app.Run();
