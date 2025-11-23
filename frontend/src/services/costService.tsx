import { Custo } from "../models/Costs";
import api from "./api";

export const costService = {
  getAll: async (): Promise<Custo[]> => {
    const response = await api.get("/custos/listar");
    return response.data;
  },

  getById: async (id: number): Promise<Custo> => {
    const response = await api.get(`/custos/buscar`, {
      params: { id },
    });
    return response.data;
  },

  create: async (custo: Custo): Promise<Custo> => {
    const response = await api.post("/custos/cadastrar", custo);
    return response.data;
  },

  update: async (id: number, custo: Custo): Promise<Custo> => {
    const response = await api.patch(`/custos/editar`, custo, {
      params: { id },
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete("/custos/remover", {
      params: { id },
    });
  },
};
