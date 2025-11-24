import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; 
import { LoginDTO } from '../../models/dtos'; 
import './login.css';

const Login: React.FC = () => {
  const [nomeDeUsuario, setNomeDeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { signIn } = useAuth(); 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!nomeDeUsuario || !senha) {
      setError('Por favor, preencha o nome de usuário e a senha.');
      return;
    }

    setLoading(true);
    const credentials: LoginDTO = { nomeDeUsuario, senha };

    try {
      await signIn(credentials);
      navigate('/dashboard'); 
    } catch (err: any) {
      setError(err.message || 'Falha na autenticação. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container"> 
      <div className="login-card"> 
        <h2>Entrar no DotMoney</h2>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="nomeDeUsuario">Nome de Usuário</label>
            <input 
              id="nomeDeUsuario"
              type="text"
              value={nomeDeUsuario}
              onChange={(e) => setNomeDeUsuario(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input 
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Aguarde...' : 'Entrar'}
          </button>

          <p className="register-link">
            Não tem uma conta? <a href="/register">Registre-se</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;