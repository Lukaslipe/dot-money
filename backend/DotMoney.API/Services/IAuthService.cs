using DotMoney.API.Models;
using System.Threading.Tasks;

namespace DotMoney.API.Services;

public interface IAuthService
{
    Task<UsuarioRespostaDTO?> Registrar(RegistroDTO registroDto);
    Task<UsuarioRespostaDTO?> Login(LoginDTO loginDto);
}