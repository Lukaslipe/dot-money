using System;

namespace DotMoney.API.Models;

public class Usuarios
{
    public int UsuarioId { get; set; }
    public string NomeDeUsuario { get; set; }
    public string SenhaHash { get; set; }
    public string SenhaSalt { get; set; }
    public string Email { get; set; }
    public DateTime DataCriacao { get; set; }
}
