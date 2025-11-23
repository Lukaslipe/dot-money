import axios from "axios";
import { Custo } from "../models/Costs";

const API_URL = "http://localhost:5252/api";

export const costService = {
  getAll: async (): Promise<Custo[]> => {
    const response = await axios.get(`${API_URL}/custo`);
    return response.data;
  },

  getById: async (id: number): Promise<Custo> => {
    const response = await axios.get(`${API_URL}/custo/${id}`);
    return response.data;
  },

  create: async (custo: Custo): Promise<Custo> => {
    const response = await axios.post(`${API_URL}/custo/cadastrar`, custo);
    return response.data;
  },

  update: async (id: number, custo: Custo): Promise<Custo> => {
    const response = await axios.put(`${API_URL}/custo/atualizar/${id}`, custo);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/custo/deletar/${id}`);
  },
};
