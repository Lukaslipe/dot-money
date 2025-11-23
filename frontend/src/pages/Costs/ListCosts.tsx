import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { costService } from "../../services/costService";
import { categoryService } from "../../services/categoryService";
import { Custo } from "../../models/Costs";
import Categoria from "../../models/Categoria";

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
    <div>
      <h1>Gestão de Custos</h1>

      <div>
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

        <label>Mês</label>
        <input
          type="month"
          value={filtroData}
          onChange={(e) => setFiltroData(e.target.value)}
        />
      </div>

      <h3>Total: R$ {total.toFixed(2)}</h3>

      <button onClick={() => navigate("/costs/new")}>Novo Custo</button>

      <table>
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
              <td>
                <button onClick={() => navigate(`/costs/${c.id}/edit`)}>
                  Editar
                </button>
                <button onClick={() => remover(c.id!)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
