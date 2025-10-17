using System.Collections.Generic;

namespace DotMoney.API.Models;

public class Categoria
{
    public int CategoriaId { get; set; }
    public string Nome { get; set; } = string.Empty;

    // Relacionamento inverso: uma categoria pode ter vários custos
    public List<Custos> Custos { get; set; } = new List<Custos>();
}