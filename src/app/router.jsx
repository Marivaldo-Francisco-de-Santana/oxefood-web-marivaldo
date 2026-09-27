import { BrowserRouter, Route, Routes } from "react-router-dom";

import ClientePage from "../features/cliente/page/ClientePage";
import ClienteForm from "../features/cliente/page/ClienteForm";

import Home from "../features/home/page/Home";

import ProdutoPage from "../features/produto/page/ProdutoPage";
import ProdutoForm from "../features/produto/page/ProdutoForm";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/cliente" element={<ClientePage />} />
                <Route path="/cliente-form" element={<ClienteForm />} />

                <Route path="/produto" element={<ProdutoPage />} />
                <Route path="/produto-form" element={<ProdutoForm />} />
            </Routes>
        </BrowserRouter>
    );
}