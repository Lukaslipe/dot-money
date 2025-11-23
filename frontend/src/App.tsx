// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth'; 
import Login from './pages/Login/Login'; 
import Dashboard from './pages/Dashboard/Dashboard'; 
import ListCategories from "./pages/Categories/ListCategories";


const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
    const { usuario, loading } = useAuth(); 

    if (loading) {
        return <div>Carregando aplicação...</div>; 
    }
    
    // Se não houver usuário logado (usuario === null), redireciona para o Login
    if (!usuario) {
        return <Navigate to="/login" replace />;
    }
    
    // Se o usuário estiver logado, exibe o componente (Dashboard)
    return element;
};

function App() {
    // NOVO: Usa o useAuth para decidir o redirecionamento da rota raiz ('/')
    const { usuario } = useAuth(); 
    
    return (
        // Envolve a aplicação com o Router para habilitar a navegação
        <BrowserRouter>
            {/* O Routes define as rotas disponíveis na aplicação */}
            <Routes>
                
                {/* Tela de Login (Acesso livre) */}
                <Route path="/login" element={<Login />} />
                
                {/* Dashboard (PROTEGIDA) */}
                <Route 
                    path="/dashboard" 
                    element={<ProtectedRoute element={<Dashboard />} />} 
                />
                {/* Categorias (PROTEGIDA) */}
                <Route 
                    path="/categories" 
                    element={<ProtectedRoute element={<ListCategories />} />} 
                />
                
                {/* Rota Raiz ('/'): Redireciona para o Dashboard se logado, ou para Login */}
                <Route 
                    path="/" 
                    element={<Navigate to={usuario ? "/dashboard" : "/login"} replace />} 
                />
                
                {/* 404 para URLs não encontradas */}
                <Route path="*" element={<h1>404 | Página Não Encontrada</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
