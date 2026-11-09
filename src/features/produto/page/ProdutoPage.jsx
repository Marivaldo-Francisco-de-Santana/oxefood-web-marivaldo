import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import CrudActions from "../../../shared/components/CrudActions";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import NewButton from "../../../shared/components/NewButton";

import {
    buscarPorId,
    listar,
    remover
} from "../../../shared/services/crudService";

import {
    MAPPING_CONTROLLER_PRODUTO
} from "../service/produtoService";

export default function ProdutoPage() {

    const navigate = useNavigate();

    const [lista, setLista] = useState([]);

    const [produto, setProduto] = useState({
        id: null,
        nome: "",
        descricao: "",
        preco: ""
    });

    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {

        try {

            const data = await listar(MAPPING_CONTROLLER_PRODUTO);

            console.log("PRODUTOS RECEBIDOS:", data);

            setLista(data);

        } catch (erro) {

            console.error("ERRO AO CARREGAR PRODUTOS:", erro);

            toast.error("Erro ao carregar produtos.");
        }
    }

    // abre o formulário para editar o produto
    function editar(id) {
        navigate(`/produto-form/${id}`);
    }

    async function confirmarRemover(id) {

        if (!confirm("Deseja realmente excluir este produto?")) {
            return;
        }

        try {

            await remover(MAPPING_CONTROLLER_PRODUTO, id);

            await carregar();

            toast.success("Produto removido com sucesso!");

        } catch (erro) {

            console.error(erro);

            toast.error("Erro ao tentar remover o produto.");
        }
    }

    function formatarPreco(preco) {

        return Number(preco).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    async function detalhar(id) {

        try {

            const data = await buscarPorId(MAPPING_CONTROLLER_PRODUTO, id);

            setProduto({
                id: data.id,
                nome: data.nome ?? "",
                descricao: data.descricao ?? "",
                preco: data.preco ?? ""
            });

            document.getElementById("modal-detalhar").showModal();

        } catch (erro) {

            console.error(erro);

            toast.error("Erro ao carregar produto.");
        }
    }

    return (

        <div>

            <Menu />

            <Breadcrumbs
                items={[
                    { label: "Produto" },
                    { label: "Listar" }
                ]}
            />

            <div
                style={{
                    marginTop: "40px",
                    marginLeft: "10%",
                    marginRight: "10%"
                }}
            >

                <div className="overflow-x-auto shadow-sm">

                    <div
                        className="flex items-center justify-between mb-6"
                        style={{
                            marginTop: "20px",
                            marginLeft: "10px",
                            marginRight: "10px"
                        }}
                    >

                        <h1 className="text-3xl font-bold text-gray-800">
                            Produtos
                        </h1>

                        <NewButton destino="/produto-form" />

                    </div>

                    <div className="divider divider-info" />

                    <div
                        className="overflow-x-auto"
                        style={{ marginTop: "30px" }}
                    >

                        <table className="table table-zebra">

                            <thead>

                                <tr style={{ textAlign: "center" }}>

                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Preço</th>
                                    <th>Ações</th>

                                </tr>

                            </thead>

                            <tbody>

                                {lista.map((item) => (

                                    <tr key={item.id}>

                                        <td style={{ width: "30%" }}>
                                            {item.nome}
                                        </td>

                                        <td style={{ width: "40%" }}>
                                            {item.descricao}
                                        </td>

                                        <td style={{ textAlign: "center" }}>
                                            {formatarPreco(item.preco)}
                                        </td>

                                        <td style={{ textAlign: "center" }}>

                                            <CrudActions
                                                onDetail={() => detalhar(item.id)}
                                                onEdit={() => editar(item.id)}
                                                onDelete={() => confirmarRemover(item.id)}
                                            />

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* MODAL DE DETALHES DO PRODUTO */}

            <dialog id="modal-detalhar" className="modal">

                <div className="modal-box">

                    <h3 className="font-bold text-lg">
                        Dados do Produto
                    </h3>

                    <div className="divider" />

                    <p className="py-4">
                        <strong>Nome:</strong> {produto.nome}
                    </p>

                    <p className="py-4">
                        <strong>Descrição:</strong> {produto.descricao}
                    </p>

                    <p className="py-4">
                        <strong>Preço:</strong> {formatarPreco(produto.preco)}
                    </p>

                    <div className="modal-action">

                        <form method="dialog">

                            <button className="btn">
                                Fechar
                            </button>

                        </form>

                    </div>

                </div>

            </dialog>

            <Footer />

        </div>
    );
}