import axios from "axios";

const API_URL = "http://localhost:5252/api";

export default interface Categoria {
  categoriaId?: number;  // ⬅️ Mudei para number
  nome: string;
}

export const categoryService = {
  // Buscar todas as categorias (com filtro opcional por nome)
  getAll: async (nome?: string): Promise<Categoria[]> => {
    const params = nome ? { nome } : {};
    const resposta = await axios.get(`${API_URL}/categorias/listar`, { params });
    return resposta.data;
  },

  // Buscar categoria por ID
  getById: async (id: number): Promise<Categoria> => {
    const resposta = await axios.get(`${API_URL}/categorias/buscar`, { 
      params: { id } 
    });
    return resposta.data;
  },

  // Criar categoria
  create: async (categoria: Categoria): Promise<Categoria> => {
    const resposta = await axios.post(`${API_URL}/categorias/cadastrar`, {
      nome: categoria.nome
    });
    return resposta.data;
  },

  // Atualizar categoria
  update: async (id: number, categoria: Categoria): Promise<Categoria> => {
    const resposta = await axios.patch(`${API_URL}/categorias/editar`, 
      { nome: categoria.nome },
      { params: { id } }
    );
    return resposta.data;
  },

  // Deletar categoria
  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/categorias/remover`, {
      params: { id }
    });
  }
};