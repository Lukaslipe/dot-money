import { useState, useEffect } from "react";
import { categoryService } from "../../services/categoryService";
import Categoria from "../../services/categoryService";
import CategoryForm from "./CategoryForm";

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
            console.log(resposta)
            setCategorias(resposta);
        } catch(error) {
            console.log("Erro ao carregar categorias: " + error);
            alert("Erro ao carregar categorias!");
        } finally {
            setLoading(false);
        }
    }

    async function deletarCategoria(id: number) {
        if (window.confirm("Tem certeza que deseja deletar esta categoria?")) {
            try {
                await categoryService.delete(id);
                carregarCategorias(); // Recarregar a lista
                alert("Categoria deletada com sucesso!");
            } catch(error) {
                console.log("Erro ao deletar categoria: " + error);
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
            <CategoryForm 
                onCancel={fecharForm}
                categoriaEdicao={categoriaEdicao}
            />
        );
    }

    return(
        <div>
            <h1>Lista de Categorias</h1>
            
            <button onClick={novaCategoria} disabled={loading}>
                Nova Categoria
            </button>

            {loading ? (
                <p>Carregando categorias...</p>
            ) : (
                <table border={1}>
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
                                <td>
                                    <button 
                                        onClick={() => editarCategoria(categoria)}
                                        disabled={loading}
                                    >
                                        Editar
                                    </button>
                                    <button 
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
                <p>Nenhuma categoria cadastrada.</p>
            )}
        </div>
    );
}

export default ListCategories;