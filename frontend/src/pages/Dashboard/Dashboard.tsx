// src/pages/Dashboard/Dashboard.tsx
import React from 'react';
import Header from '../../components/Dashboard/Header'; 
import Sidebar from '../../components/Dashboard/Sidebar'; 
import { useAuth } from '../../hooks/useAuth'; 
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
    const { usuario } = useAuth(); 

    return (
        // Contêiner principal para o layout de toda a tela
        <div className={styles.dashboardLayout}>
            
            <Sidebar />

            <div className={styles.mainContent}>
                
                <Header />

                <main className={styles.contentArea}>
                    
                    <h1>Bem-vindo(a), {usuario?.nomeDeUsuario || 'Usuário'}!</h1>
                    <p>Aqui você verá o resumo das suas finanças.</p>
                    
                    <section className={styles.summaryGrid}>
                        <div className={styles.summaryCard}>Total de Custos: R$ 0,00</div>
                        <div className={styles.summaryCard}>Lançamentos Recentes</div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;