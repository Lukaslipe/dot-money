import api from './api';
import { Custo } from "../models/Costs";

export const costService = {
  getAll: async (descricao?: string): Promise<Custo[]> => {
    const params = descricao ? { descricao } : {};
    const response = await api.get(`/custos/listar`, { params });
    return response.data;
  },

  getById: async (id: number): Promise<Custo> => {
    const response = await api.get(`/custos/buscar`, {
      params: { id }
    });
    return response.data;
  },

  create: async (custo: Custo): Promise<Custo> => {
    const response = await api.post(`/custos/cadastrar`, custo);
    return response.data;
  },

  update: async (id: number, custo: Custo): Promise<Custo> => {
    const response = await api.patch(`/custos/editar`, custo, {
      params: { id }
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/custos/remover`, {
      params: { id }
    });
  },
};