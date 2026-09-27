import { useState } from "react";
import { toast } from "react-toastify";

import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";

import { cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_CLIENTE } from "../../cliente/service/clienteService";

export default function ClienteForm() {

    const [cliente, setCliente] = useState({
        nome: "",
        cpf: "",
        foneCelular: "",
        foneFixo: "",
        dataNascimento: ""
    });

    async function salvar() {

        try {
            console.log("ENVIANDO CLIENTE:", cliente);

            const resposta = await cadastrar(
                MAPPING_CONTROLLER_CLIENTE,
                cliente
            );

            console.log("CLIENTE CADASTRADO:", resposta);

            toast.success("Cliente cadastrado com sucesso!");

            setCliente({
                nome: "",
                cpf: "",
                foneCelular: "",
                foneFixo: "",
                dataNascimento: ""
            });

        } catch (erro) {

            console.error("ERRO AO CADASTRAR CLIENTE:", erro);

            if (erro.response) {
                console.error("STATUS:", erro.response.status);
                console.error("RESPOSTA:", erro.response.data);
            }

            toast.error("Erro ao cadastrar cliente.");
        }
    }

    return (
        <div>

            <Menu />

            <Breadcrumbs items={[
                { label: "Cliente" },
                { label: "Cadastrar" }
            ]} />

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
                            Novo Cliente
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

                            {/* NOME E CPF */}

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
                                            className="input input-bordered w-full"
                                            value={cliente.nome}
                                            required
                                            onChange={(e) =>
                                                setCliente({
                                                    ...cliente,
                                                    nome: e.target.value
                                                })
                                            }
                                        />

                                    </fieldset>

                                </div>


                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{ padding: "30px" }}
                                >

                                    <fieldset className="fieldset w-full">

                                        <label
                                            className="fieldset-legend"
                                            htmlFor="cpf"
                                        >
                                            CPF
                                        </label>

                                        <input
                                            type="text"
                                            id="cpf"
                                            placeholder="000.000.000-00"
                                            className="input input-bordered w-full"
                                            value={cliente.cpf}
                                            required
                                            onChange={(e) =>
                                                setCliente({
                                                    ...cliente,
                                                    cpf: e.target.value
                                                })
                                            }
                                        />

                                    </fieldset>

                                </div>

                            </div>


                            {/* TELEFONES E DATA */}

                            <div className="flex w-full">

                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{ padding: "30px" }}
                                >

                                    <fieldset className="fieldset w-full">

                                        <label
                                            className="fieldset-legend"
                                            htmlFor="foneCelular"
                                        >
                                            Fone Celular
                                        </label>

                                        <input
                                            type="text"
                                            id="foneCelular"
                                            placeholder="(81) 9 8888-7777"
                                            className="input input-bordered w-full"
                                            value={cliente.foneCelular}
                                            required
                                            onChange={(e) =>
                                                setCliente({
                                                    ...cliente,
                                                    foneCelular: e.target.value
                                                })
                                            }
                                        />

                                    </fieldset>

                                </div>


                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{ padding: "30px" }}
                                >

                                    <fieldset className="fieldset w-full">

                                        <label
                                            className="fieldset-legend"
                                            htmlFor="foneFixo"
                                        >
                                            Fone Fixo
                                        </label>

                                        <input
                                            type="text"
                                            id="foneFixo"
                                            placeholder="(81) 3333-4444"
                                            className="input input-bordered w-full"
                                            value={cliente.foneFixo}
                                            onChange={(e) =>
                                                setCliente({
                                                    ...cliente,
                                                    foneFixo: e.target.value
                                                })
                                            }
                                        />

                                    </fieldset>

                                </div>


                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{ padding: "30px" }}
                                >

                                    <fieldset className="fieldset w-full">

                                        <label
                                            className="fieldset-legend"
                                            htmlFor="dataNascimento"
                                        >
                                            Data de Nascimento
                                        </label>

                                        <input
                                            type="date"
                                            id="dataNascimento"
                                            className="input input-bordered w-full"
                                            value={cliente.dataNascimento}
                                            required
                                            onChange={(e) =>
                                                setCliente({
                                                    ...cliente,
                                                    dataNascimento: e.target.value
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
                                    style={{ padding: "30px" }}
                                >

                                    <div
                                        style={{
                                            marginTop: "50px",
                                            textAlign: "left"
                                        }}
                                    >
                                        <BackButton destino="/cliente" />
                                    </div>

                                </div>


                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{ padding: "30px" }}
                                >

                                    <div
                                        style={{
                                            marginTop: "50px",
                                            textAlign: "right"
                                        }}
                                    >
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