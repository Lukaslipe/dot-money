import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, registrar as apiRegister } from '../services/authService';
import { LoginDTO, RegistroDTO, Usuario, UsuarioRespostaDTO } from '../models/dtos';


// Tipagem do Contexto
export interface AuthContextData {
  usuario: Usuario | null;
  token: string | null;
  loading: boolean;
  signIn(credentials: LoginDTO): Promise<void>;
  signUp(credentials: RegistroDTO): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Vai carregar a autenticação do LocalStorage
  useEffect(() => {
    async function loadUser() {
      const storedToken = localStorage.getItem('dotmoney_token');
      const storedUser = localStorage.getItem('dotmoney_user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUsuario(JSON.parse(storedUser));
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  // Lógica de Login
  async function signIn(credentials: LoginDTO) {
    try {
      const data: UsuarioRespostaDTO = await apiLogin(credentials);

      const { token: userToken, ...userData } = data;
      
      // Vai armazenar no LocalStorage
      localStorage.setItem('dotmoney_token', userToken);
      localStorage.setItem('dotmoney_user', JSON.stringify(userData));

      setToken(userToken);
      setUsuario(userData);
      
    } catch (error) {
      throw error; 
    }
  }

  // Lógica de Registro 
  async function signUp(credentials: RegistroDTO) {
    try {
        const data: UsuarioRespostaDTO = await apiRegister(credentials);

        const { token: userToken, ...userData } = data;
        
        localStorage.setItem('dotmoney_token', userToken);
        localStorage.setItem('dotmoney_user', JSON.stringify(userData));

        setToken(userToken);
        setUsuario(userData);
    } catch (error) {
        throw error;
    }
  }

  // Lógica de Logout
  function signOut() {
    localStorage.removeItem('dotmoney_token');
    localStorage.removeItem('dotmoney_user');
    setUsuario(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, token, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };