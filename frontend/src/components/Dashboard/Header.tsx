// src/components/Dashboard/Header.tsx
import React from 'react';
import styles from './Header.module.css'; 
import { useAuth } from '../../hooks/useAuth'; 

const Header: React.FC = () => {
    const { signOut, usuario } = useAuth(); 

    return (
        <header className={styles.header}>
            
            {/* Onde fica o título da página atual */}
            <div className={styles.pageTitle}>Dashboard</div>
            
            {/* Área de Informações do Usuário e Logout */}
            <div className={styles.userInfo}>
                
                {/* Mostra o nome do usuário, ou 'Usuário' como fallback */}
                <span>Olá, {usuario?.nomeDeUsuario || 'Usuário'}</span>
                
                {/* Botão de Logout que será estilizado */}
                <button onClick={signOut} className={styles.logoutButton}>
                    Sair
                </button>
            </div>
        </header>
    );
};

export default Header;