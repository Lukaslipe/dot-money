import api from './api';
import { LoginDTO, RegistroDTO, UsuarioRespostaDTO } from '../models/dtos';

// REMOVA o /api no início, pois já está na BASE_URL
const AUTH_LOGIN = '/auth/login';
const AUTH_REGISTER = '/auth/register';

// Função login p/ ser exportada
export const login = async (dados: LoginDTO): Promise<UsuarioRespostaDTO> => {
  try {
    console.log('📤 Enviando login para:', AUTH_LOGIN, dados);
    const response = await api.post<UsuarioRespostaDTO>(AUTH_LOGIN, dados);
    console.log('✅ Resposta do login recebida:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Erro detalhado ao fazer login:', error);
    
    // Tratamento mais específico
    const message = error.response?.data?.message 
      || 'Falha no login. Verifique seu nome de usuário e senha.';
    
    throw new Error(message);
  }
};

// função registrar p/ ser exportada
export const registrar = async (dados: RegistroDTO): Promise<UsuarioRespostaDTO> => {
    try {
        console.log('📤 Enviando registro para:', AUTH_REGISTER, dados);
        const response = await api.post<UsuarioRespostaDTO>(AUTH_REGISTER, dados);
        console.log('✅ Resposta do registro recebida:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('❌ Erro detalhado ao registrar:', error);
        
        // Tratamento mais específico
        const message = error.response?.data?.message 
            || 'Falha no registro. Nome de usuário ou E-mail já cadastrado.';
        
        throw new Error(message);
    }
};