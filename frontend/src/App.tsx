import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ListCategories from "./pages/Categories/ListCategories";
import ListCosts from "./pages/Costs/ListCosts";
import CreateCost from "./pages/Costs/CreateCost"; 
import EditCost from "./pages/Costs/EditCost";
import Register from './pages/Register/Register';

const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
    const { usuario, loading } = useAuth();

    if (loading) return <div>Carregando aplicação...</div>;

    return usuario ? element : <Navigate to="/login" replace />;
};

function App() {
    const { usuario } = useAuth();

    return (
        <BrowserRouter>
            <Routes>

                {/* Rotas públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rotas protegidas */}
                <Route
                    path="/dashboard"
                    element={<ProtectedRoute element={<Dashboard />} />}
                />

                <Route
                    path="/categories"
                    element={<ProtectedRoute element={<ListCategories />} />}
                />

                <Route
                    path="/costs"
                    element={<ProtectedRoute element={<ListCosts />} />}
                />

                <Route
                    path="/costs/new"
                    element={<ProtectedRoute element={<CreateCost />} />}
                />

                <Route
                    path="/costs/:id/edit"
                    element={<ProtectedRoute element={<EditCost />} />}
                />

                {/* Redirecionamento raiz */}
                <Route
                    path="/"
                    element={<Navigate to={usuario ? "/dashboard" : "/login"} replace />}
                />

                {/* 404 */}
                <Route path="*" element={<h1>404 | Página Não Encontrada</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
