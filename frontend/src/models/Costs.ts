export interface Custo {
  id?: number;
  CategoriaId: number;
  Data: string;
  DataRegistro?: string; // API pode preencher
  Descricao: string;
  UsuarioId: number;
  Valor: number;
}
