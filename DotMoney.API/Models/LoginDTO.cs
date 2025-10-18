using System;

namespace DotMoney.API.Models;

public class LoginDTO
{
    public string NomeDeUsuario { get; set; } = string.Empty;
    public string Senha { get; set; } = string.Empty;
}
