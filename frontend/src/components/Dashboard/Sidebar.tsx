// src/components/Dashboard/Sidebar.tsx
import React from 'react';
import styles from './Sidebar.module.css'; 
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <aside className={styles.sidebar}>
            
            <div className={styles.logo}>
                DotMoney 
            </div>

            {/* Links de Navegação */}
            <nav className={styles.navMenu}>
                {/* Os links que aparecerão no menu */}
                <Link to="/dashboard" className={styles.navItem}>Dashboard</Link>
                <Link to="/costs" className={styles.navItem}>Custos</Link>
                <Link to="/categories" className={styles.navItem}>Categorias</Link>
            </nav>

            <div className={styles.footer}>
                <p>Versão 1.0</p>
            </div>
        </aside>
    );
};

export default Sidebar;