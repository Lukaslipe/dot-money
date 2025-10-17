using System;

namespace DotMoney.API.Models;

public class RegistroDTO
{
    public string NomeDeUsuario { get; set; }
    public string Senha { get; set; }
    public string Email { get; set; }
}