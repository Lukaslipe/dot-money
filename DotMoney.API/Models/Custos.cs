using System;

namespace DotMoney.API.Models;

public class Custos
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        
        // Relacionamento com Categoria
        public int CategoriaId { get; set; }
        public Categoria? Categoria { get; set; }

        // Relacionamento com Usuário
        public int UsuarioId { get; set; }
        public Usuarios? Usuario { get; set; }

        public DateTime DataRegistro { get; set; } = DateTime.Now;
    }
