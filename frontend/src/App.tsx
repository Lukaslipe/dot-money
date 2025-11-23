import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth'; 
import Login from './pages/Login/Login'; 
import Dashboard from './pages/Dashboard/Dashboard'; 
import Register from './pages/Register/Register'; 


const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
    const { usuario, loading } = useAuth(); 

    if (loading) {
        return <div>Carregando aplicação...</div>; 
    }
    
    // Se não houver usuário logado, vai redireciona para o Login
    if (!usuario) {
        return <Navigate to="/login" replace />;
    }
    
    // Se o usuário estiver logado, exibe o Dashboard
    return element;
};


// 1 - Um componente SEMPRE deve começar com a primeira letra maiúscula
// 2 - Todo componente DEVE ser uma função do JS
// 3 - Todo deve retornar apenas UM elemento HTML
function App() {
    const { usuario } = useAuth(); 
    
    return (
        <BrowserRouter>
            {/* O Routes define as rotas disponíveis na aplicação */}
            <Routes>
                
                {/* Tela de Login (Acesso livre) */}
                <Route path="/login" element={<Login />} />
                
                {/* NOVO: Rota 2: Tela de Registro (Acesso livre) */}
                <Route path="/register" element={<Register />} />
                
                {/* 🚨 Rota 3: Dashboard (PROTEGIDA) */}
                <Route 
                    path="/dashboard" 
                    element={<ProtectedRoute element={<Dashboard />} />} 
                />
                {/* Categorias (PROTEGIDA) */}
                <Route 
                    path="/categories" 
                    element={<ProtectedRoute element={<ListCategories />} />} 
                />
                
                {/* Rota 4: Rota Raiz ('/'): Redireciona para o Dashboard se logado, ou para Login */}
                <Route 
                    path="/" 
                    element={<Navigate to={usuario ? "/dashboard" : "/login"} replace />} 
                />
                
                {/* Rota 5: 404 para URLs não encontradas */}
                <Route path="*" element={<h1>404 | Página Não Encontrada</h1>} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;