import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { usuario, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-layout">
        {/* Sidebar */}
        <div className="dashboard-sidebar">
          <h2>DotMoney</h2>
          <nav className="sidebar-nav">
            <a href="/dashboard" className="sidebar-link">Dashboard</a>
            <a href="/costs" className="sidebar-link">Custos</a>
            <a href="/categories" className="sidebar-link">Categorias</a>
          </nav>
          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout}>Sair</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-main">
          <div className="dashboard-header">
            <h1>{title}</h1>
            <div className="user-info">
              Olá, {usuario?.nomeDeUsuario || 'Usuário'}!
            </div>
          </div>
          <div className="dashboard-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;