import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import CrudActions from "../../../shared/components/CrudActions";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import NewButton from "../../../shared/components/NewButton";

import { listar, remover } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_CATEGORIAPRODUTO } from "../service/categoriaprodutoService";

const CATEGORIAPRODUTO_VAZIO = {
    descricao: ""
};

export default function CategoriaProdutoPage() {
    const [lista, setLista] = useState([]);
    const [categoriaproduto, setCategoriaproduto] = useState(
        CATEGORIAPRODUTO_VAZIO
    );

    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {
        try {
            const data = await listar(MAPPING_CONTROLLER_CATEGORIAPRODUTO);
            setLista(data);
        } catch (erro) {
            console.error("ERRO AO CARREGAR CATEGORIAS DE PRODUTOS:", erro);
            toast.error("Erro ao carregar as categorias de produtos.");
        }
    }

    function editar(id) {
        // A edição ainda precisa ser implementada.
        console.log("Editar categoria de produto:", id);
    }

    async function confirmarRemover(id) {
        if (!window.confirm("Deseja realmente excluir esta categoria de produto?")) {
            return;
        }

        try {
            await remover(MAPPING_CONTROLLER_CATEGORIAPRODUTO, id);
            await carregar();
            toast.success("Categoria de produto removida com sucesso!");
        } catch (erro) {
            console.error("ERRO AO REMOVER CATEGORIA:", erro);
            toast.error("Erro ao tentar remover a categoria de produto.");
        }
    }

    function detalhar(item) {
        setCategoriaproduto(item);
        document.getElementById("modal-detalhar").showModal();
    }

    return (
        <div>
            <Menu />

            <Breadcrumbs
                items={[
                    { label: "Categoria de Produto" },
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
                            Categorias de Produtos
                        </h1>

                        <NewButton destino="/categoriaproduto-form" />
                    </div>

                    <div className="divider divider-info" />

                    <div
                        className="overflow-x-auto"
                        style={{ marginTop: "30px" }}
                    >
                        <table className="table table-zebra">
                            <thead>
                                <tr style={{ textAlign: "center" }}>
                                    <th>Descrição</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {lista.length === 0 ? (
                                    <tr>
                                        <td colSpan="2" className="text-center">
                                            Nenhuma categoria de produto encontrada.
                                        </td>
                                    </tr>
                                ) : (
                                    lista.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.descricao}</td>

                                            <td style={{ textAlign: "center" }}>
                                                <CrudActions
                                                    onDetail={() => detalhar(item)}
                                                    onEdit={() => editar(item.id)}
                                                    onDelete={() =>
                                                        confirmarRemover(item.id)
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <dialog id="modal-detalhar" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Detalhamento da Categoria de Produto
                    </h3>

                    <div className="divider" />

                    <p className="py-2">
                        <strong>ID:</strong> {categoriaproduto.id}
                    </p>

                    <p className="py-2">
                        <strong>Descrição:</strong>{" "}
                        {categoriaproduto.descricao}
                    </p>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Fechar</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <Footer />
        </div>
    );
}