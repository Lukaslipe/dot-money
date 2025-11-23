import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { costService } from "../../services/costService";
import { Custo } from "../../models/Costs";
import CostForm from "./CostForm";

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

  const handleSubmit = async (dados: Custo) => {
    try {
      await costService.update(Number(id), dados);
      alert("Custo atualizado com sucesso!");
      navigate("/costs");
    } catch (err) {
      console.error("Erro ao atualizar:", err);
      alert("Erro ao atualizar o custo");
    }
  };

  if (loading) return <h2>Carregando...</h2>;
  if (!custo) return <h2>Custo não encontrado</h2>;

  return (
    <div>
      <h1>Editar Custo</h1>
      <CostForm
        custoEdit={custo}
        onSave={() => navigate("/costs")}
        onCancel={() => navigate("/costs")}
        />
    </div>
  );
}
