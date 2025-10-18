using DotMoney.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DotMoney.API.Services;

public class AuthService : IAuthService
{
    private readonly AppDataContext _context;
    private readonly ITokenService _tokenService; 
    private readonly IPasswordHasher<Usuarios> _passwordHasher; 

    public AuthService(AppDataContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
        _passwordHasher = new PasswordHasher<Usuarios>(); 
    }

    // LÓGICA DE CADASTRO
    public async Task<UsuarioRespostaDTO?> Registrar(RegistroDTO registroDto)
    {
        if (await _context.Usuarios.AnyAsync(u => u.NomeDeUsuario == registroDto.NomeDeUsuario))
        {
            return null; // FALHA
        }

        var novoUsuario = new Usuarios
        {
            NomeDeUsuario = registroDto.NomeDeUsuario,
            Email = registroDto.Email,
            DataCriacao = DateTime.UtcNow
        };

    
        novoUsuario.SenhaHash = _passwordHasher.HashPassword(novoUsuario, registroDto.Senha);

        _context.Usuarios.Add(novoUsuario);
        await _context.SaveChangesAsync();

        // Pede o Token e devolve
        var token = _tokenService.GerarToken(novoUsuario);
        return new UsuarioRespostaDTO { Id = novoUsuario.Id, NomeDeUsuario = novoUsuario.NomeDeUsuario, Email = novoUsuario.Email, Token = token };
    }

    // LÓGICA DE LOGIN
    public async Task<UsuarioRespostaDTO?> Login(LoginDTO loginDto)
    {
        var usuario = await _context.Usuarios
            .FirstOrDefaultAsync(u => u.NomeDeUsuario == loginDto.NomeDeUsuario);

        if (usuario == null)
        {
            return null; // FALHA
        }

        // VERIFICA SE A SENHA DIGITADA BATE COM O HASH
        var resultadoVerificacao = _passwordHasher.VerifyHashedPassword(
            usuario, 
            usuario.SenhaHash, 
            loginDto.Senha
        );

        if (resultadoVerificacao == PasswordVerificationResult.Failed)
        {
            return null; // FALHA
        }

        // Deu certo! Pede o Token e devolve
        var token = _tokenService.GerarToken(usuario);
        return new UsuarioRespostaDTO { Id = usuario.Id, NomeDeUsuario = usuario.NomeDeUsuario, Email = usuario.Email, Token = token };
    }
}