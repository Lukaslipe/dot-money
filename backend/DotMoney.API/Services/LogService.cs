using System;

namespace DotMoney.API.Services;

using Microsoft.EntityFrameworkCore;
using DotMoney.API.Models;
public class LogService
{
    private readonly AppDataContext ctx;

    public LogService(AppDataContext context)
    {
        ctx = context;
    }

    public async Task RegistrarLog(int usuarioId, string processo)
    {
        var log = new Log
        {
            UsuarioId = usuarioId,
            Processo = processo,
            DataHora = DateTime.Now
        };

        ctx.Log.Add(log);
        await ctx.SaveChangesAsync();
    }
}