import { useState } from "react";
import { toast } from "react-toastify";

import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";

import { cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_PRODUTO_CADASTRO } from "../service/produtoService";

export default function ProdutoForm() {

    const [produto, setProduto] = useState({
        nome: "",
        descricao: "",
        preco: ""
    });

    async function salvar() {

        try {

            const produtoParaSalvar = {
                nome: produto.nome,
                descricao: produto.descricao,
                preco: Number(produto.preco)
            };

            console.log(
                "ENVIANDO PRODUTO:",
                produtoParaSalvar
            );

            const resposta = await cadastrar(
                MAPPING_CONTROLLER_PRODUTO_CADASTRO,
                produtoParaSalvar
            );

            console.log(
                "PRODUTO CADASTRADO:",
                resposta
            );

            toast.success(
                "Produto cadastrado com sucesso!"
            );

            setProduto({
                nome: "",
                descricao: "",
                preco: ""
            });

        } catch (erro) {

            console.error(
                "ERRO AO CADASTRAR PRODUTO:",
                erro
            );

            if (erro.response) {

                console.error(
                    "STATUS:",
                    erro.response.status
                );

                console.error(
                    "RESPOSTA DO SERVIDOR:",
                    erro.response.data
                );

            }

            toast.error(
                "Erro ao cadastrar produto."
            );
        }
    }

    return (

        <div>

            <Menu />

            <Breadcrumbs
                items={[
                    { label: "Produto" },
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
                            Novo Produto
                        </h1>

                    </div>

                    <div className="divider divider-info" />

                    <div
                        className="overflow-x-auto"
                        style={{
                            padding: "30px"
                        }}
                    >

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                salvar();
                            }}
                        >

                            {/* NOME */}

                            <div className="flex w-full">

                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{
                                        padding: "30px"
                                    }}
                                >

                                    <fieldset className="fieldset w-full">

                                        <label
                                            className="fieldset-legend"
                                            htmlFor="nome"
                                        >
                                            Nome
                                        </label>

                                        <input
                                            type="text"
                                            id="nome"
                                            className="input input-bordered w-full"
                                            value={produto.nome}
                                            required
                                            onChange={(e) =>
                                                setProduto({
                                                    ...produto,
                                                    nome: e.target.value
                                                })
                                            }
                                        />

                                    </fieldset>

                                </div>

                            </div>

                            {/* DESCRIÇÃO */}

                            <div className="flex w-full">

                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{
                                        padding: "30px"
                                    }}
                                >

                                    <fieldset className="fieldset w-full">

                                        <label
                                            className="fieldset-legend"
                                            htmlFor="descricao"
                                        >
                                            Descrição
                                        </label>

                                        <textarea
                                            id="descricao"
                                            className="textarea textarea-bordered w-full"
                                            rows="5"
                                            value={produto.descricao}
                                            required
                                            onChange={(e) =>
                                                setProduto({
                                                    ...produto,
                                                    descricao: e.target.value
                                                })
                                            }
                                        />

                                    </fieldset>

                                </div>

                            </div>

                            {/* PREÇO */}

                            <div className="flex w-full">

                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{
                                        padding: "30px"
                                    }}
                                >

                                    <fieldset className="fieldset w-full">

                                        <label
                                            className="fieldset-legend"
                                            htmlFor="preco"
                                        >
                                            Preço
                                        </label>

                                        <input
                                            type="number"
                                            id="preco"
                                            className="input input-bordered w-full"
                                            step="0.01"
                                            min="0"
                                            value={produto.preco}
                                            required
                                            onChange={(e) =>
                                                setProduto({
                                                    ...produto,
                                                    preco: e.target.value
                                                })
                                            }
                                        />

                                    </fieldset>

                                </div>

                            </div>

                            {/* BOTÕES */}

                            <div className="flex w-full">

                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{
                                        padding: "30px"
                                    }}
                                >

                                    <div
                                        style={{
                                            marginTop: "50px",
                                            textAlign: "left"
                                        }}
                                    >

                                        <BackButton
                                            destino="/produto"
                                        />

                                    </div>

                                </div>

                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{
                                        padding: "30px"
                                    }}
                                >

                                    <div
                                        style={{
                                            marginTop: "50px",
                                            textAlign: "right"
                                        }}
                                    >

                                        <SaveButton
                                            save={salvar}
                                        />

                                    </div>

                                </div>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

            <Footer />

        </div>
    );
}