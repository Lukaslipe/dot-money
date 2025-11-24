import { useState } from "react";
import { categoryService } from "../../services/categoryService";
import  Categoria from "../../models/Categoria"; 

interface CategoryFormProps {
  onCancel?: () => void;
  categoriaEdicao?: Categoria | null;
}

function CategoryForm({ onCancel, categoriaEdicao = null }: CategoryFormProps) {
    const [nome, setNome] = useState(categoriaEdicao?.nome || "");
    const [loading, setLoading] = useState(false);

    function submeterCategoria(e: React.FormEvent) {
        e.preventDefault();
        if (categoriaEdicao && categoriaEdicao.categoriaId) {
            atualizarCategoriaAPI();
        } else {
            cadastrarCategoriaAPI();
        }
    }

    async function cadastrarCategoriaAPI() {
        setLoading(true);
        try {
            const categoria: Categoria = {
                nome: nome
            }

            const resposta = await categoryService.create(categoria);

            if(!resposta){
                console.log("Erro na criação de categoria")
            }
            
            // Limpar formulário após cadastro
            setNome("");
            
            alert("Categoria cadastrada com sucesso!");

            if (onCancel) {
                onCancel();
            }

        } catch(error) {
            alert("Erro ao cadastrar categoria!");
        } finally {
            setLoading(false);
        }
    }

    async function atualizarCategoriaAPI() {
        if (!categoriaEdicao?.categoriaId) return;
        
        setLoading(true);
        try {
            const categoria: Categoria = {
                categoriaId: categoriaEdicao.categoriaId,
                nome: nome
            }

            const resposta = await categoryService.update(categoriaEdicao.categoriaId, categoria);
            if(!resposta){
                console.log("Erro na criação de categoria")
            }
            alert("Categoria atualizada com sucesso!");

            if (onCancel) {
                onCancel();
            }

        } catch(error) {
            alert("Erro ao atualizar categoria!");
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="categories-container">
            <div className="form-container">
                <h1>{categoriaEdicao ? "Editar" : "Cadastrar"} Categoria</h1>

                <form onSubmit={submeterCategoria}>
                    <div className="form-group">
                        <label>Nome</label>
                        <input 
                            type="text" 
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? "Salvando..." : (categoriaEdicao ? "Atualizar" : "Cadastrar")}
                        </button>
                        {onCancel && (
                            <button type="button" className="cancel-btn" onClick={onCancel} disabled={loading}>
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CategoryForm;