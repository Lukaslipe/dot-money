using Microsoft.AspNetCore.Mvc;
using DotMoney.API.Models;
using DotMoney.API.Services;

namespace DotMoney.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    //AuthService no construtor
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    //POST api/auth/register
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistroDTO registroDto)
    {
        //Chama o service para registrar e gerar o token
        var resposta = await _authService.Registrar(registroDto);

        //Retorna HTTP correto
        if (resposta == null)
        {
            return BadRequest(new { Message = "Usuário ou E-mail já cadastrado." });
        }

        //Retorna o token junto com as informações do usuário
        return Ok(resposta); 
    }

    //POST api/auth/login
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
    {
        //Chama service para validar o login e gerar o token
        var resposta = await _authService.Login(loginDto);

        //Retorna HTTP correto
        if (resposta == null)
        {
            return Unauthorized(new { Message = "Nome de usuário ou senha inválidos." }); // 401 Unauthorized
        }

        //Retorna o token
        return Ok(resposta); 
    }
}