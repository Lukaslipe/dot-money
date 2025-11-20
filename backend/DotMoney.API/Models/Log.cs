using System;

namespace DotMoney.API.Models;

public class Log
{
    public int LogId { get; set; }
    public int UsuarioId { get; set; }
    public Usuarios? Usuario { get; set; }
    public string Processo { get; set; } = string.Empty;
    public DateTime DataHora { get; set; } = DateTime.Now;

    
}
