import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { costService } from "../../services/costService";
import { categoryService } from "../../services/categoryService";
import { Custo } from "../../models/Costs";
import Categoria from "../../models/Categoria";
import "./costs.css";

export default function ListCosts() {
  const [custos, setCustos] = useState<Custo[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [filtroCategoria, setFiltroCategoria] = useState<number | "">("");
  const [filtroData, setFiltroData] = useState("");

  const navigate = useNavigate();

  const loadData = () => {
    costService.getAll().then(setCustos);
    categoryService.getAll().then(setCategorias);
  };

  useEffect(() => loadData(), []);

  const remover = async (id: number) => {
    if (window.confirm("Tem certeza?")) {
      await costService.delete(id);
      loadData();
    }
  };

  const custosFiltrados = custos.filter((c) => {
    return (
      (!filtroCategoria || c.categoriaId === filtroCategoria) &&
      (!filtroData || c.data.startsWith(filtroData))
    );
  });

  const total = custosFiltrados.reduce((soma, c) => soma + c.valor, 0);

  return (
    <div className="costs-container">
      <div className="costs-header">
        <h1>Gestão de Custos</h1>
        <button className="new-cost-btn" onClick={() => navigate("/costs/new")}>
          Novo Custo
        </button>
      </div>

      <div className="costs-filters">
        <div className="filter-group">
          <label>Categoria</label>
          <select
            value={filtroCategoria}
            onChange={(e) =>
              setFiltroCategoria(e.target.value ? Number(e.target.value) : "")
            }
          >
            <option value="">Todas</option>
            {categorias.map((c) => (
              <option key={c.categoriaId} value={c.categoriaId}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Mês</label>
          <input
            type="month"
            value={filtroData}
            onChange={(e) => setFiltroData(e.target.value)}
          />
        </div>
      </div>

      <div className="costs-total">
        Total: R$ {total.toFixed(2)}
      </div>

      <table className="costs-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {custosFiltrados.map((c) => (
            <tr key={c.id}>
              <td>{new Date(c.data).toLocaleDateString("pt-BR")}</td>
              <td>
                {categorias.find((x) => x.categoriaId === c.categoriaId)?.nome}
              </td>
              <td>{c.descricao}</td>
              <td>R$ {c.valor.toFixed(2)}</td>
              <td className="actions-cell">
                <button 
                  className="action-btn edit-btn"
                  onClick={() => navigate(`/costs/${c.id}/edit`)}
                >
                  Editar
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => remover(c.id!)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {custosFiltrados.length === 0 && (
        <p className="empty-state">Nenhum custo encontrado.</p>
      )}
    </div>
  );
}
