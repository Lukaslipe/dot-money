import CostForm from "./CostForm";
import { useNavigate } from "react-router-dom";

export default function CreateCost() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Cadastrar Custo</h1>

      <CostForm
        onSave={() => navigate("/custos")} 
        onCancel={() => navigate("/custos")}
      />
    </div>
  );
}
