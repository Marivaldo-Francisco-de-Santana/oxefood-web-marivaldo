import { BrowserRouter, Route, Routes } from "react-router-dom";

import ClientePage from "../features/cliente/page/ClientePage";
import ClienteForm from "../features/cliente/page/ClienteForm";

import Home from "../features/home/page/Home";

import ProdutoPage from "../features/produto/page/ProdutoPage";
import ProdutoForm from "../features/produto/page/ProdutoForm";

import EmpresaPage from "../features/empresa/page/EmpresaPage";
import EmpresaForm from "../features/empresa/page/EmpresaForm";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/cliente" element={<ClientePage />} />
                <Route path="/cliente-form" element={<ClienteForm />} />

                <Route path="/produto" element={<ProdutoPage />} />
                <Route path="/produto-form" element={<ProdutoForm />} />

                <Route path="/empresa" element={<EmpresaPage />} />
                <Route path="/empresa-form" element={<EmpresaForm />} />

            </Routes>
        </BrowserRouter>
    );
}