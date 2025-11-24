import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { costService } from '../../services/costService';
import { categoryService } from '../../services/categoryService';
import { Custo } from '../../models/Costs';
import Categoria from '../../models/Categoria';
import './dashboard.css';

const Dashboard: React.FC = () => {
  const [custos, setCustos] = useState<Custo[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [custosData, categoriasData] = await Promise.all([
          costService.getAll(),
          categoryService.getAll()
        ]);
        setCustos(custosData);
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calcula os totais
  const totalCustosQuantidade = custos.length;
  const totalCustosValor = custos.reduce((soma, custo) => soma + custo.valor, 0);
  const totalCategorias = categorias.length;

  if (loading) {
    return (
      <Layout title="Dashboard">
        <div className="loading-text">Carregando dados...</div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard">
      <div className="welcome-message">
        <p>Resumo completo das suas finanças</p>
      </div>
      
      <section className="summary-grid">
        <div className="summary-card">
          <h3>Total em Custos</h3>
          <p>R$ {totalCustosValor.toFixed(2)}</p>
          <small>Valor total gasto</small>
        </div>
        
        <div className="summary-card">
          <h3>Total de Custos</h3>
          <p>{totalCustosQuantidade}</p>
          <small>Lançamentos cadastrados</small>
        </div>
        
        <div className="summary-card">
          <h3>Categorias</h3>
          <p>{totalCategorias}</p>
          <small>Categorias cadastradas</small>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;