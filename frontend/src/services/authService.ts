import api from './api';
import { LoginDTO, RegistroDTO, UsuarioRespostaDTO } from '../models/dtos';

// REMOVA o /api no início, pois já está na BASE_URL
const AUTH_LOGIN = '/auth/login';
const AUTH_REGISTER = '/auth/register';

// Função login p/ ser exportada
export const login = async (dados: LoginDTO): Promise<UsuarioRespostaDTO> => {
  try {
    const response = await api.post<UsuarioRespostaDTO>(AUTH_LOGIN, dados);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message 
      || 'Falha no login. Verifique seu nome de usuário e senha.';
    
    throw new Error(message);
  }
};

// função registrar p/ ser exportada
export const registrar = async (dados: RegistroDTO): Promise<UsuarioRespostaDTO> => {
    try {
        const response = await api.post<UsuarioRespostaDTO>(AUTH_REGISTER, dados);
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message 
            || 'Falha no registro. Nome de usuário ou E-mail já cadastrado.';
        
        throw new Error(message);
    }
};