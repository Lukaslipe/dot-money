using DotMoney.API.Models;

namespace DotMoney.API.Services;

public interface ITokenService
{
    string GerarToken(Usuarios usuario);
}