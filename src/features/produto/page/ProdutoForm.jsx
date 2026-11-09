import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";

import {
    atualizar,
    buscarPorId,
    cadastrar
} from "../../../shared/services/crudService";

import {
    MAPPING_CONTROLLER_PRODUTO,
    MAPPING_CONTROLLER_PRODUTO_CADASTRO
} from "../service/produtoService";

export default function ProdutoForm() {

    const { idProduto } = useParams();
    const navigate = useNavigate();

    const [produto, setProduto] = useState({
        id: null,
        nome: "",
        descricao: "",
        preco: ""
    });

    // evita envio duplicado (onSubmit + clique no SaveButton)
    const salvando = useRef(false);

    useEffect(() => {
        if (idProduto) {
            carregarProduto();
        }
    }, [idProduto]);

    async function carregarProduto() {
        try {
            const data = await buscarPorId(
                MAPPING_CONTROLLER_PRODUTO,
                idProduto
            );

            setProduto({
                id: data.id,
                nome: data.nome ?? "",
                descricao: data.descricao ?? "",
                preco: data.preco ?? ""
            });

        } catch (erro) {
            console.error("Erro ao carregar produto:", erro);
            toast.error("Erro ao carregar produto.");
        }
    }

    function atualizarCampo(event) {
        const { name, value } = event.target;

        setProduto((anterior) => ({
            ...anterior,
            [name]: value
        }));
    }

    async function salvar() {

        if (salvando.current) {
            return;
        }

        salvando.current = true;

        try {

            const produtoParaSalvar = {
                nome: produto.nome,
                descricao: produto.descricao,
                preco: Number(produto.preco)
            };

            console.log("ENVIANDO PRODUTO:", produtoParaSalvar);

            if (idProduto) {

                await atualizar(
                    MAPPING_CONTROLLER_PRODUTO,
                    { ...produtoParaSalvar, id: idProduto }
                );

                toast.success("Produto atualizado com sucesso!");

            } else {

                const resposta = await cadastrar(
                    MAPPING_CONTROLLER_PRODUTO_CADASTRO,
                    produtoParaSalvar
                );

                console.log("PRODUTO CADASTRADO:", resposta);

                toast.success("Produto cadastrado com sucesso!");
            }

            navigate("/produto");

        } catch (erro) {

            console.error("ERRO AO SALVAR PRODUTO:", erro);

            if (erro.response) {
                console.error("STATUS:", erro.response.status);
                console.error("RESPOSTA DO SERVIDOR:", erro.response.data);
            }

            toast.error("Erro ao salvar produto.");

        } finally {
            salvando.current = false;
        }
    }

    return (

        <div>

            <Menu />

            <Breadcrumbs
                items={[
                    { label: "Produto" },
                    { label: idProduto ? "Alterar" : "Cadastrar" }
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
                            {idProduto ? "Alterar Produto" : "Novo Produto"}
                        </h1>

                    </div>

                    <div className="divider divider-info" />

                    <div
                        className="overflow-x-auto"
                        style={{ padding: "30px" }}
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
                                    style={{ padding: "30px" }}
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
                                            name="nome"
                                            className="input input-bordered w-full"
                                            value={produto.nome}
                                            required
                                            onChange={atualizarCampo}
                                        />

                                    </fieldset>

                                </div>

                            </div>

                            {/* DESCRIÇÃO */}

                            <div className="flex w-full">

                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{ padding: "30px" }}
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
                                            name="descricao"
                                            className="textarea textarea-bordered w-full"
                                            rows="5"
                                            value={produto.descricao}
                                            required
                                            onChange={atualizarCampo}
                                        />

                                    </fieldset>

                                </div>

                            </div>

                            {/* PREÇO */}

                            <div className="flex w-full">

                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{ padding: "30px" }}
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
                                            name="preco"
                                            className="input input-bordered w-full"
                                            step="0.01"
                                            min="0"
                                            value={produto.preco}
                                            required
                                            onChange={atualizarCampo}
                                        />

                                    </fieldset>

                                </div>

                            </div>

                            {/* BOTÕES */}

                            <div className="flex w-full">

                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{ padding: "30px" }}
                                >

                                    <div style={{ marginTop: "50px", textAlign: "left" }}>
                                        <BackButton destino="/produto" />
                                    </div>

                                </div>

                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{ padding: "30px" }}
                                >

                                    <div style={{ marginTop: "50px", textAlign: "right" }}>
                                        <SaveButton save={salvar} />
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