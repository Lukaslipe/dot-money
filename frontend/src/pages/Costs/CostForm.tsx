import { useEffect, useState } from "react";
import { costService } from "../../services/costService";
import { categoryService } from "../../services/categoryService";
import { Custo } from "../../models/Costs";
import Categoria from "../../models/Categoria";

interface Props {
  custoEdit?: Custo | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function CostForm({ custoEdit, onSave, onCancel }: Props) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [form, setForm] = useState<Custo>({
    categoriaId: 0,
    data: "",
    descricao: "",
    usuarioId: 7,
    valor: 0,
  });

  useEffect(() => {
    categoryService.getAll().then(setCategorias);

    if (custoEdit) {
      setForm({
        ...custoEdit,
        data: custoEdit.data ? custoEdit.data.split("T")[0] : "",
      });
    }
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

    const body = {
      ...form,
      data: new Date(form.data + "T00:00:00").toISOString(), // garante formato válido
    };

    console.log("📤 Enviando para o backend:", body);

    try {
      if (custoEdit && custoEdit.id) {
        await costService.update(custoEdit.id, body);
        alert("Custo atualizado!");
      } else {
        await costService.create(body);
        alert("Custo cadastrado!");
      }

      onSave();
    } catch (error) {
      console.error("❌ Erro ao salvar:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{custoEdit ? "Editar Custo" : "Cadastrar Custo"}</h2>

      <label>Categoria</label>
      <select
        name="categoriaId"
        value={form.categoriaId}
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
        value={form.data}
        onChange={handleChange}
        required
      />

      <label>Descrição</label>
      <input
        type="text"
        name="descricao"
        value={form.descricao}
        onChange={handleChange}
        required
      />

      <label>Valor (R$)</label>
      <input
        type="number"
        step="0.01"
        name="valor"
        value={form.valor}
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
