import { useEffect, useState } from "react";
import { costService } from "../../services/costService";
import { categoryService } from "../../services/categoryService";
import CostForm from "./CostForm";
import { Custo } from "../../models/Costs";
import  Categoria from "../../models/Categoria";

export default function ListCosts() {
  const [custos, setCustos] = useState<Custo[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editando, setEditando] = useState<Custo | null>(null);

  const [filtroCategoria, setFiltroCategoria] = useState<number | "">("");
  const [filtroData, setFiltroData] = useState("");

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
      (!filtroCategoria || c.CategoriaId === filtroCategoria) &&
      (!filtroData || c.Data.startsWith(filtroData))
    );
  });

  const total = custosFiltrados.reduce((soma, c) => soma + c.Valor, 0);

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

      {editando && (
        <CostForm
          custoEdit={editando}
          onSave={() => {
            setEditando(null);
            loadData();
          }}
          onCancel={() => setEditando(null)}
        />
      )}

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
              <td>{new Date(c.Data).toLocaleDateString("pt-BR")}</td>
              <td>{categorias.find((x) => x.categoriaId === c.CategoriaId)?.nome}</td>
              <td>{c.Descricao}</td>
              <td>R$ {c.Valor.toFixed(2)}</td>
              <td>
                <button onClick={() => setEditando(c)}>Editar</button>
                <button onClick={() => remover(c.id!)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
