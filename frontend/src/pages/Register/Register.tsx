import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Componentes Inputs e Botão
import LoginInput from '../../components/Login/LoginInput'; 
import LoginButton from '../../components/Login/LoginButton'; 

// 2. Dependências de Autenticação
import { useAuth } from '../../hooks/useAuth'; 
import { RegistroDTO } from '../../models/dtos'; 

const Register: React.FC = () => {
  // Estados para capturar os dados do formulário
  const [nomeDeUsuario, setNomeDeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  // Pega a função 'signUp'  de autenticação
  const { signUp } = useAuth(); 

  // Função que lida com o envio do formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validação básica
    if (!nomeDeUsuario || !email || !senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    // Cria o DTO com os dados
    const credentials: RegistroDTO = { nomeDeUsuario, email, senha };

    try {
      await signUp(credentials); // Chama a função 'signUp' do AuthContext
      
      // Se o registro for bem-sucedido, vai redirecionar para o Dashboard
      navigate('/dashboard'); 
    } catch (err: any) {
      // Exibe a mensagem de erro da API (lançada em authService.ts)
      setError(err.message || 'Falha no registro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Usa as classes globais definidas (login-container e login-card)
    <div className="login-container"> 
      <div className="login-card"> 
        <h2>Criar Nova Conta</h2>
        
        <form onSubmit={handleSubmit} className="login-form">
          
          {/* Input: Nome de Usuário */}
          <LoginInput 
            label="Nome de Usuário"
            id="regNomeDeUsuario"
            type="text"
            value={nomeDeUsuario}
            onChange={(e) => setNomeDeUsuario(e.target.value)}
            disabled={loading}
          />
          
          {/* Input: Email */}
          <LoginInput 
            label="Email"
            id="regEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          {/* Input: Senha */}
          <LoginInput 
            label="Senha"
            id="regSenha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            disabled={loading}
          />

          {/* Exibe o erro se houver */}
          {error && <p className="error-message">{error}</p>}
          
          {/* Botão de Registro */}
          <LoginButton type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrar'}
          </LoginButton>

          <p className="register-link">
            Já tem uma conta? <a href="/login">Fazer Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;