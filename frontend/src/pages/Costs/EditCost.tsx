import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { costService } from "../../services/costService";
import { Custo } from "../../models/Costs";
import CostForm from "./CostForm";
import Layout from "../../components/Layout";
import "./costs.css";

export default function EditCost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [custo, setCusto] = useState<Custo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const data = await costService.getById(Number(id));
        setCusto(data);
      } catch (err) {
        console.error("Erro ao carregar custo:", err);
        alert("Erro ao carregar dados do custo.");
        navigate("/costs");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, navigate]);

  if (loading) return (
    <Layout title="Editar Custo">
      <div className="costs-container">
        <div className="loading-text">Carregando...</div>
      </div>
    </Layout>
  );
  
  if (!custo) return (
    <Layout title="Editar Custo">
      <div className="costs-container">
        <div className="empty-state">Custo não encontrado</div>
      </div>
    </Layout>
  );

  return (
    <Layout title="Editar Custo">
      <CostForm
        custoEdit={custo}
        onSave={() => navigate("/costs")}
        onCancel={() => navigate("/costs")}
      />
    </Layout>
  );
}