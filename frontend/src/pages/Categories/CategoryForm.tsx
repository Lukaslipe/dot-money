import { useState } from "react";
import { categoryService } from "../../services/categoryService";
import  Categoria from "../../models/Categoria"; 

interface CategoryFormProps {
  onCancel?: () => void;
  categoriaEdicao?: Categoria | null;
}

function CategoryForm({ onCancel, categoriaEdicao = null }: CategoryFormProps) {
    const [nome, setNome] = useState(categoriaEdicao?.Nome || "");
    const [loading, setLoading] = useState(false);

    function submeterCategoria(e: React.FormEvent) {
        e.preventDefault();
        if (categoriaEdicao && categoriaEdicao.CategoriaId) {
            atualizarCategoriaAPI();
        } else {
            cadastrarCategoriaAPI();
        }
    }

    async function cadastrarCategoriaAPI() {
        setLoading(true);
        try {
            const categoria: Categoria = {
                Nome: nome
            }

            const resposta = await categoryService.create(categoria);
            console.log("Categoria cadastrada:", resposta);
            
            // Limpar formulário após cadastro
            setNome("");
            
            alert("Categoria cadastrada com sucesso!");

        } catch(error) {
            console.log("Erro ao cadastrar categoria: " + error);
            alert("Erro ao cadastrar categoria!");
        } finally {
            setLoading(false);
        }
    }

    async function atualizarCategoriaAPI() {
        if (!categoriaEdicao?.CategoriaId) return;
        
        setLoading(true);
        try {
            const categoria: Categoria = {
                CategoriaId: categoriaEdicao.CategoriaId,
                Nome: nome
            }

            const resposta = await categoryService.update(categoriaEdicao.CategoriaId, categoria);
            console.log("Categoria atualizada:", resposta);
            alert("Categoria atualizada com sucesso!");

        } catch(error) {
            console.log("Erro ao atualizar categoria: " + error);
            alert("Erro ao atualizar categoria!");
        } finally {
            setLoading(false);
        }
    }

    return(
        <div>
            <h1>{categoriaEdicao ? "Editar" : "Cadastrar"} Categoria</h1>

            <form onSubmit={submeterCategoria}>
                <div>
                    <label>Nome</label>
                    <input 
                        type="text" 
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Salvando..." : (categoriaEdicao ? "Atualizar" : "Cadastrar")}
                    </button>
                    {onCancel && (
                        <button type="button" onClick={onCancel} disabled={loading}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default CategoryForm;