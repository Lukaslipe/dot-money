// DTO: vai enviar as credenciais no login
export interface LoginDTO {
    nomeDeUsuario: string;
    senha: string;
}

// DTO: vai enviar dados no registro
export interface RegistroDTO {
    nomeDeUsuario: string;
    senha: string;
    email: string;
}

// DTO: para receber a resposta da API após o login/registro do usuário
// Dados do usuário e o token JWT.
export interface UsuarioRespostaDTO {
    id: number;
    nomeDeUsuario: string;
    email: string;
    token: string;
}

// Tipo de dados do usuário que será armazenado no contexto global
export type Usuario = Omit<UsuarioRespostaDTO, 'token'>;