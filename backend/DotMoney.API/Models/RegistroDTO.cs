using System;

namespace DotMoney.API.Models;

public class RegistroDTO
{
    public string NomeDeUsuario { get; set; } = string.Empty;
    public string Senha { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}