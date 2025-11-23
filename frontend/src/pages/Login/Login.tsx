// src/pages/Login/Login.tsx
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginInput from '../../components/Login/LoginInput'; 
import LoginButton from '../../components/Login/LoginButton'; 

import { useAuth } from '../../hooks/useAuth'; 
import { LoginDTO } from '../../models/dtos'; 

const Login: React.FC = () => {

  const [nomeDeUsuario, setNomeDeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { signIn } = useAuth(); 

  // Função que lida com o envio do formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validação básica (Feedback para o usuário)
    if (!nomeDeUsuario || !senha) {
      setError('Por favor, preencha o nome de usuário e a senha.');
      return;
    }

    setLoading(true);
    const credentials: LoginDTO = { nomeDeUsuario, senha };

    try {
      await signIn(credentials);
      // Redireciona para o Dashboard em caso de sucesso
      navigate('/dashboard'); 
    } catch (err: any) {
      // Exibe a mensagem de erro
      setError(err.message || 'Falha na autenticação. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Usa classes que virão de src/styles/globals.css
    <div className="login-container"> 
      <div className="login-card"> 
        <h2>Entrar no DotMoney 💰</h2>
        
        <form onSubmit={handleSubmit} className="login-form">
          
          {/* USANDO O COMPONENTE DE INPUT ISOLADO */}
          <LoginInput 
            label="Nome de Usuário"
            id="nomeDeUsuario"
            type="text"
            value={nomeDeUsuario}
            onChange={(e) => setNomeDeUsuario(e.target.value)}
            disabled={loading}
          />
          
          {/* USANDO O COMPONENTE DE INPUT ISOLADO */}
          <LoginInput 
            label="Senha"
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            disabled={loading}
          />

          {/* Exibe o erro se houver */}
          {error && <p className="error-message">{error}</p>}
          
          {/* USANDO O COMPONENTE DE BOTÃO ISOLADO */}
          <LoginButton type="submit" disabled={loading}>
            {loading ? 'Aguarde...' : 'Entrar'}
          </LoginButton>

          <p className="register-link">
            Não tem uma conta? <a href="/register">Registre-se</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
