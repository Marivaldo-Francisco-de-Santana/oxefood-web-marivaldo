import { useState } from "react";
import { toast } from "react-toastify";

import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";

import { cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_EMPRESA_CADASTRO } from "../service/empresaService";

export default function EmpresaForm() {

    const [empresa, setEmpresa] = useState({
        razaoSocial: "",
        nomeFantasia: "",
        cnpj: "",
        email: "",
        telefone: "",
        endereco: ""
    });

    async function salvar() {

        try {

            console.log(
                "ENVIANDO EMPRESA:",
                empresa
            );

            const resposta = await cadastrar(
                MAPPING_CONTROLLER_EMPRESA_CADASTRO,
                empresa
            );

            console.log(
                "EMPRESA CADASTRADA:",
                resposta
            );

            toast.success(
                "Empresa cadastrada com sucesso!"
            );

            setEmpresa({
                razaoSocial: "",
                nomeFantasia: "",
                cnpj: "",
                email: "",
                telefone: "",
                endereco: ""
            });

        } catch (erro) {

            console.error(
                "ERRO AO CADASTRAR EMPRESA:",
                erro
            );

            if (erro.response) {

                console.error(
                    "STATUS:",
                    erro.response.status
                );

                console.error(
                    "RESPOSTA:",
                    erro.response.data
                );
            }

            toast.error(
                "Erro ao cadastrar empresa."
            );
        }
    }

    return (
        <div>

            <Menu />

            <Breadcrumbs
                items={[
                    { label: "Empresa" },
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
                            Nova Empresa
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

                            {/* RAZÃO SOCIAL */}

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
                                            htmlFor="razaoSocial"
                                        >
                                            Razão Social
                                        </label>

                                        <input
                                            type="text"
                                            id="razaoSocial"
                                            className="input input-bordered w-full"
                                            value={empresa.razaoSocial}
                                            required
                                            onChange={(e) =>
                                                setEmpresa({
                                                    ...empresa,
                                                    razaoSocial:
                                                        e.target.value
                                                })
                                            }
                                        />

                                    </fieldset>

                                </div>

                            </div>


                            {/* NOME FANTASIA */}

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
                                            htmlFor="nomeFantasia"
                                        >
                                            Nome Fantasia
                                        </label>

                                        <input
                                            type="text"
                                            id="nomeFantasia"
                                            className="input input-bordered w-full"
                                            value={empresa.nomeFantasia}
                                            required
                                            onChange={(e) =>
                                                setEmpresa({
                                                    ...empresa,
                                                    nomeFantasia:
                                                        e.target.value
                                                })
                                            }
                                        />

                                    </fieldset>

                                </div>

                            </div>


                            {/* CNPJ + EMAIL */}

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
                                            htmlFor="cnpj"
                                        >
                                            CNPJ
                                        </label>

                                        <input
                                            type="text"
                                            id="cnpj"
                                            placeholder="00.000.000/0000-00"
                                            className="input input-bordered w-full"
                                            value={empresa.cnpj}
                                            required
                                            onChange={(e) =>
                                                setEmpresa({
                                                    ...empresa,
                                                    cnpj:
                                                        e.target.value
                                                })
                                            }
                                        />

                                    </fieldset>

                                </div>


                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{
                                        padding: "30px"
                                    }}
                                >

                                    <fieldset className="fieldset w-full">

                                        <label
                                            className="fieldset-legend"
                                            htmlFor="email"
                                        >
                                            E-mail
                                        </label>

                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="empresa@email.com"
                                            className="input input-bordered w-full"
                                            value={empresa.email}
                                            required
                                            onChange={(e) =>
                                                setEmpresa({
                                                    ...empresa,
                                                    email:
                                                        e.target.value
                                                })
                                            }
                                        />

                                    </fieldset>

                                </div>

                            </div>


                            {/* TELEFONE + ENDEREÇO */}

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
                                            htmlFor="telefone"
                                        >
                                            Telefone
                                        </label>

                                        <input
                                            type="text"
                                            id="telefone"
                                            placeholder="(81) 3333-4444"
                                            className="input input-bordered w-full"
                                            value={empresa.telefone}
                                            onChange={(e) =>
                                                setEmpresa({
                                                    ...empresa,
                                                    telefone:
                                                        e.target.value
                                                })
                                            }
                                        />

                                    </fieldset>

                                </div>


                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{
                                        padding: "30px"
                                    }}
                                >

                                    <fieldset className="fieldset w-full">

                                        <label
                                            className="fieldset-legend"
                                            htmlFor="endereco"
                                        >
                                            Endereço
                                        </label>

                                        <input
                                            type="text"
                                            id="endereco"
                                            className="input input-bordered w-full"
                                            value={empresa.endereco}
                                            required
                                            onChange={(e) =>
                                                setEmpresa({
                                                    ...empresa,
                                                    endereco:
                                                        e.target.value
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
                                            destino="/empresa"
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