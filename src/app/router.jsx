import { BrowserRouter, Route, Routes } from "react-router-dom";

import ClientePage from "../features/cliente/page/ClientePage";
import ClienteForm from "../features/cliente/page/ClienteForm";

import Home from "../features/home/page/Home";

import ProdutoPage from "../features/produto/page/ProdutoPage";
import ProdutoForm from "../features/produto/page/ProdutoForm";

import EmpresaPage from "../features/empresa/page/EmpresaPage";
import EmpresaForm from "../features/empresa/page/EmpresaForm";

import VotoPage from "../features/voto/page/VotoPage";
import VotoForm from "../features/voto/page/VotoForm";

import SturnoPage from "../features/sturno/page/SturnoPage";
import SturnoForm from "../features/sturno/page/SturnoForm";

import CategoriaProdutoPage from "../features/categoriaproduto/page/CategoriaProdutoPage";
import CategoriaProdutoForm from "../features/categoriaproduto/page/CategoriaProdutoForm";

import UsuarioPage from "../features/usuario/page/UsuarioPage";
import UsuarioForm from "../features/usuario/page/UsuarioForm";

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

                <Route path="/voto" element={<VotoPage />} />
                <Route path="/voto-form" element={<VotoForm />} />

                <Route path="/sturno" element={<SturnoPage />} />
                <Route path="/sturno-form" element={<SturnoForm />} />

                <Route path="/categoriaproduto" element={<CategoriaProdutoPage />} />
                <Route path="/categoriaproduto-form" element={<CategoriaProdutoForm />} />

                <Route path="/usuario" element={<UsuarioPage />} />
                <Route path="/usuario-form" element={<UsuarioForm />} />

            </Routes>
        </BrowserRouter>
    );
}