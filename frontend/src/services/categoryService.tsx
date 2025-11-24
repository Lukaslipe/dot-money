import api from './api';
import Categoria from "../models/Categoria"; 

export const categoryService = {
  // Buscar todas as categorias
  getAll: async (nome?: string): Promise<Categoria[]> => {
    const params = nome ? { nome } : {};
    const resposta = await api.get(`/categorias/listar`, { params }); 
    return resposta.data as Categoria[]; 
  },

  // Buscar categoria por ID
  getById: async (id: number): Promise<Categoria> => {
    const resposta = await api.get(`/categorias/buscar`, { 
      params: { id } 
    });
    return resposta.data as Categoria;
  },

  // Criar categoria
  create: async (categoria: Categoria): Promise<Categoria> => {
    const resposta = await api.post(`/categorias/cadastrar`, { 
      nome: categoria.nome 
    });
    return resposta.data as Categoria;
  },

  // Atualizar categoria
  update: async (id: number, categoria: Categoria): Promise<Categoria> => {
    const resposta = await api.patch(
      `/categorias/editar`,
      { nome: categoria.nome },
      { params: { id } }
    );
    return resposta.data as Categoria;
  },

  // Deletar categoria
  delete: async (id: number): Promise<void> => {
    await api.delete(`/categorias/remover`, { 
      params: { id }
    });
  }
};