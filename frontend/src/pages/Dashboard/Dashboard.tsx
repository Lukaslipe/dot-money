import React from 'react';
import { useAuth } from '../../hooks/useAuth'; 
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard: React.FC = () => {
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
                    
                    {/* Botão de Logout na Sidebar */}
                    <div className="sidebar-footer">
                        <button className="logout-btn" onClick={handleLogout}>
                            Sair
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="dashboard-main">
                    
                    {/* Header */}
                    <div className="dashboard-header">
                        <h1>Dashboard</h1>
                        <div className="user-info">
                            Olá, {usuario?.nomeDeUsuario || 'Usuário'}!
                            <button className="logout-btn-header" onClick={handleLogout}>
                                Sair
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="dashboard-content">
                        <div className="welcome-message">
                            <h1>Bem-vindo(a), {usuario?.nomeDeUsuario || 'Usuário'}!</h1>
                            <p>Aqui você verá o resumo das suas finanças.</p>
                        </div>
                        
                        <section className="summary-grid">
                            <div className="summary-card">
                                <h3>Total de Custos</h3>
                                <p>R$ 0,00</p>
                            </div>
                            <div className="summary-card">
                                <h3>Lançamentos Recentes</h3>
                                <p>0</p>
                            </div>
                            <div className="summary-card">
                                <h3>Categorias</h3>
                                <p>0</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;