import { useState, useEffect } from "react";
import { categoryService } from "../../services/categoryService";
import Categoria from "../../models/Categoria"; 
import CategoryForm from "./CategoryForm";
import Layout from "../../components/Layout";
import "./categories.css";

function ListCategories() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [categoriaEdicao, setCategoriaEdicao] = useState<Categoria | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        carregarCategorias();
    }, []);

    async function carregarCategorias() {
        setLoading(true);
        try {
            const resposta = await categoryService.getAll();
            setCategorias(resposta);
        } catch(error) {
            alert("Erro ao carregar categorias!");
        } finally {
            setLoading(false);
        }
    }

    async function deletarCategoria(id: number) {
        const token = localStorage.getItem('dotmoney_token');
        if (!token) {
            console.log('Token não encontrado no localStorage');
        }
        if (window.confirm("Tem certeza que deseja deletar esta categoria?")) {
            try {
                await categoryService.delete(id);
                carregarCategorias(); // Recarregar a lista
                alert("Categoria deletada com sucesso!");
            } catch(error) {
                alert("Erro ao deletar categoria!");
            }
        }
    }

    function editarCategoria(categoria: Categoria) {
        setCategoriaEdicao(categoria);
        setMostrarForm(true);
    }

    function novaCategoria() {
        setCategoriaEdicao(null);
        setMostrarForm(true);
    }

    function fecharForm() {
        setMostrarForm(false);
        setCategoriaEdicao(null);
        carregarCategorias(); // Recarregar lista após salvar
    }

    if (mostrarForm) {
        return (
            <Layout title={categoriaEdicao ? "Editar Categoria" : "Nova Categoria"}>
                <div className="categories-container">
                    <CategoryForm 
                        onCancel={fecharForm}
                        categoriaEdicao={categoriaEdicao}
                    />
                </div>
            </Layout>
        );
    }

    return(
        <Layout title="Categorias"> {/* ⬅️ ENVOLVA COM LAYOUT */}
            <div className="categories-container">
                <div className="categories-header">
                    <h1>Lista de Categorias</h1>
                    <button className="new-category-btn" onClick={novaCategoria} disabled={loading}>
                        Nova Categoria
                    </button>
                </div>

                {loading ? (
                    <p className="loading-text">Carregando categorias...</p>
                ) : (
                    <table className="categories-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map(categoria => (
                                <tr key={categoria.categoriaId}>
                                    <td>{categoria.categoriaId}</td>
                                    <td>{categoria.nome}</td>
                                    <td className="actions-cell">
                                        <button 
                                            className="action-btn edit-btn"
                                            onClick={() => editarCategoria(categoria)}
                                            disabled={loading}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            className="action-btn delete-btn"
                                            onClick={() => deletarCategoria(categoria.categoriaId!)}
                                            disabled={loading}
                                        >
                                            Deletar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {categorias.length === 0 && !loading && (
                    <p className="empty-state">Nenhuma categoria cadastrada.</p>
                )}
            </div>
        </Layout>
    );
}

export default ListCategories;