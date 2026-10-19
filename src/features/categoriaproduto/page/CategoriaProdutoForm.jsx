import { useState } from "react";
import { toast } from "react-toastify";

import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";

import { cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_CATEGORIAPRODUTO } from "../service/categoriaprodutoService";

const CATEGORIA_PRODUTO_VAZIO = {
    descricao: ""
};

export default function CategoriaProdutoForm() {
    const [categoriaProduto, setCategoriaProduto] = useState(
        CATEGORIA_PRODUTO_VAZIO
    );

    function alterar(campo, valor) {
        setCategoriaProduto({
            ...categoriaProduto,
            [campo]: valor
        });
    }

    async function salvar() {
        if (!categoriaProduto.descricao.trim()) {
            toast.error("Informe a descrição da categoria.");
            return;
        }

        const categoriaProdutoRequest = {
            descricao: categoriaProduto.descricao.trim()
        };

        try {
            await cadastrar(
                MAPPING_CONTROLLER_CATEGORIAPRODUTO,
                categoriaProdutoRequest
            );

            toast.success("Categoria de Produto cadastrada com sucesso!");

            setCategoriaProduto({ ...CATEGORIA_PRODUTO_VAZIO });
        } catch (erro) {
            console.error("Erro ao cadastrar categoria:", erro);
            toast.error("Erro ao cadastrar categoria de produto.");
        }
    }

    return (
        <div>
            <Menu />

            <Breadcrumbs
                items={[
                    { label: "Categoria de Produto" },
                    { label: "Cadastrar" }
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
                            Categoria de Produto
                        </h1>
                    </div>

                    <div className="divider divider-info" />

                    <div style={{ padding: "30px" }}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                salvar();
                            }}
                        >
                            <div className="grid grid-cols-1 gap-y-10 p-8">
                                <fieldset className="fieldset w-full">
                                    <label
                                        className="fieldset-legend"
                                        htmlFor="descricao"
                                    >
                                        Descrição
                                    </label>

                                    <input
                                        type="text"
                                        id="descricao"
                                        name="descricao"
                                        className="input input-bordered w-full"
                                        value={categoriaProduto.descricao}
                                        required
                                        onChange={(e) =>
                                            alterar("descricao", e.target.value)
                                        }
                                    />
                                </fieldset>
                            </div>

                            <div
                                className="flex w-full justify-between p-8"
                                style={{ marginTop: "40px" }}
                            >
                                <BackButton destino="/categoriaproduto" />
                                <SaveButton save={salvar} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
