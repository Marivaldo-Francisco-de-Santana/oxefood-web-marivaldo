import { BrowserRouter, Route, Routes } from "react-router-dom";

import ClienteForm from "../features/cliente/page/ClienteForm";
import ClientePage from "../features/cliente/page/ClientePage";

import Home from "../features/home/page/Home";

import ProdutoForm from "../features/produto/page/ProdutoForm";
import ProdutoPage from "../features/produto/page/ProdutoPage";

import EmpresaForm from "../features/empresa/page/EmpresaForm";
import EmpresaPage from "../features/empresa/page/EmpresaPage";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />

                {/* CLIENTE */}
                <Route path="/cliente" element={<ClientePage />} />
                <Route path="/cliente-form/:idCliente?" element={<ClienteForm />} />

                {/* PRODUTO */}
                <Route path="/produto" element={<ProdutoPage />} />
                <Route path="/produto-form/:idProduto?" element={<ProdutoForm />} />

                {/* EMPRESA */}
                <Route path="/empresa" element={<EmpresaPage />} />
                <Route path="/empresa-form/:idEmpresa?" element={<EmpresaForm />} />

            </Routes>
        </BrowserRouter>
    );
}