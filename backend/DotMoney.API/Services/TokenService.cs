using DotMoney.API.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DotMoney.API.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GerarToken(Usuarios usuario)
    {
        var claims = new[]
        {
            //Chave principal para identificar o usuário logado
            new Claim("id", usuario.Id.ToString()),
            new Claim(ClaimTypes.Name, usuario.NomeDeUsuario),
            new Claim(ClaimTypes.Email, usuario.Email)
        };

        //Chave secreta
        var keyString = _configuration["Jwt:Key"] ?? throw new ArgumentNullException("Jwt:Key is missing in configuration.");
        var chave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));
        
        //Credenciais de assinatura
        var credenciais = new SigningCredentials(chave, SecurityAlgorithms.HmacSha256);

        //Descrição do token
        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(2), // Validade do token (2 horas)
            signingCredentials: credenciais
        );

        // Retorna o token como string
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}