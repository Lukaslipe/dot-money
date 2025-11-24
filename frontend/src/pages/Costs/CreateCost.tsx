import CostForm from "./CostForm";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

export default function CreateCost() {
  const navigate = useNavigate();

  return (
    <Layout title="Cadastrar Custo">
      <CostForm
        onSave={() => navigate("/costs")} 
        onCancel={() => navigate("/costs")}
      />
    </Layout>
  );
}