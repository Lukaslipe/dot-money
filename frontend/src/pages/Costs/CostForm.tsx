import { useEffect, useState } from "react";
import { costService } from "../../services/costService";
import { categoryService } from "../../services/categoryService";
import { Custo } from "../../models/Costs";
import  Categoria  from "../../models/Categoria";

interface Props {
  custoEdit?: Custo | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function CostForm({ custoEdit, onSave, onCancel }: Props) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [form, setForm] = useState<Custo>({
    CategoriaId: 0,
    Data: "",
    Descricao: "",
    UsuarioId: 1, // substituir quando tiver auth
    Valor: 0,
  });

  useEffect(() => {
    categoryService.getAll().then(setCategorias);

    if (custoEdit) setForm(custoEdit);
  }, [custoEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "valor" || name === "categoriaId" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.Descricao || !form.Valor || !form.CategoriaId) return;

    if (custoEdit?.id) {
      await costService.update(custoEdit.id, form);
    } else {
      await costService.create(form);
    }

    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{custoEdit ? "Editar Custo" : "Cadastrar Custo"}</h2>

      <label>Categoria</label>
      <select
        name="categoriaId"
        value={form.CategoriaId}
        onChange={handleChange}
        required
      >
        <option value={0}>Selecione...</option>
        {categorias.map((c) => (
          <option key={c.categoriaId} value={c.categoriaId}>
            {c.nome}
          </option>
        ))}
      </select>

      <label>Data</label>
      <input
        type="date"
        name="data"
        value={form.Data}
        onChange={handleChange}
        required
      />

      <label>Descrição</label>
      <input
        type="text"
        name="descricao"
        value={form.Descricao}
        onChange={handleChange}
        required
      />

      <label>Valor (R$)</label>
      <input
        type="number"
        step="0.01"
        name="valor"
        value={form.Valor}
        onChange={handleChange}
        required
      />

      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
}
