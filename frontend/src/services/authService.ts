import api from './api';
import { LoginDTO, RegistroDTO, UsuarioRespostaDTO } from '../models/dtos';

const AUTH_LOGIN = '/api/auth/login';
const AUTH_REGISTER = '/api/auth/register';

// Função login p/ ser exportada
export const login = async (dados: LoginDTO): Promise<UsuarioRespostaDTO> => {
  try {
    const response = await api.post<UsuarioRespostaDTO>(AUTH_LOGIN, dados);
    return response.data;
  } catch (error) {
    console.error('Erro ao tentar logar:', error);
    throw new Error('Falha no login. Verifique seu nome de usuário e senha.');
  }
};

// função registrar p/ ser exportada
export const registrar = async (dados: RegistroDTO): Promise<UsuarioRespostaDTO> => {
    try {
        const response = await api.post<UsuarioRespostaDTO>(AUTH_REGISTER, dados);
        return response.data;
    } catch (error) {
        console.error('Erro ao tentar registrar:', error);
        throw new Error('Falha no registro. Nome de usuário ou E-mail já cadastrado.');
    }
};