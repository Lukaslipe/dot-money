using System.Collections.Generic;

namespace DotMoney.API.Models;

public class Categoria
{
    public int CategoriaId { get; set; }
    public string Nome { get; set; } = string.Empty;

    public List<Custos> Custos { get; set; } = new List<Custos>();
}