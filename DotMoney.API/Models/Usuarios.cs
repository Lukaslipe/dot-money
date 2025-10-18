using System;

namespace DotMoney.API.Models;

public class Usuarios
{
    public int Id { get; set; }
    public string NomeDeUsuario { get; set; } = string.Empty;
    public string SenhaHash { get; set; } = string.Empty;
    public string SenhaSalt { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DateTime DataCriacao { get; set; }
}
