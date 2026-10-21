import { useState } from "react";
import { toast } from "react-toastify";

import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";

import { cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_CONFIGURACAOSISTEMA_CADASTRO } from "../service/configuracaosistemaService";

export default function ConfiguracaoSistemaForm() {

    const [configuracaosistema, setConfiguracaoSistema] = useState({
        nomeEmpresa: "",
        cnpj: "",
        site: "",
        emailContato: "",
        tempoMinimoAgendamentoPedidos: "",
        ligarAceitePedidos: "",
        dataEntradaSistema: ""
    });

    async function salvar() {

        try {

            console.log(
                "ENVIANDO Configuracao Sistema:",
                configuracaosistema
            );

            const resposta = await cadastrar(
                MAPPING_CONTROLLER_CONFIGURACAOSISTEMA_CADASTRO,
                configuracaosistema
            );

            console.log(
                "CONFIGURACAO SISTEMA CADASTRADA:",
                resposta
            );

            toast.success(
                "ConfiguracaoSistema cadastrada com sucesso!"
            );

            setConfiguracaoSistema({
                nomeConfiguracaoSistema: "",
        cnpj: "",
        site: "",
        emailContato: "",
        tempoMinimoAgendamentoPedidos: "",
        ligarAceitePedidos: "",
        dataEntradaSistema: ""
            });

        } catch (erro) {

            console.error(
                "ERRO AO CADASTRAR CONFIGURACAO SISTEMA:",
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
                "Erro ao cadastrar configuracaosistema."
            );
        }
    }

    return (
        <div>

            <Menu />

            <Breadcrumbs
                items={[
                    { label: "ConfiguracaoSistema" },
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
                            Nova Configuracao Sistema
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

                            {/* NOME EMPRESA */}

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
                                            NOME EMPRESA
                                        </label>

                                        <input
                                            type="text"
                                            id="nomeEmpresa"
                                            className="input input-bordered w-full"
                                            value={configuracaosistema.nomeEmpresa}
                                            required
                                            onChange={(e) =>
                                                setConfiguracaoSistema({
                                                    ...configuracaosistema,
                                                    nomeEmpresa:
                                                        e.target.value
                                                })
                                            }
                                        />

                                    </fieldset>

                                </div>

                            </div>


                            {/* CNPJ */}

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
                                            htmlFor="site"
                                        >
                                            CNPJ
                                        </label>

                                        <input
                                            type="text"
                                            id="cnpj"
                                            className="input input-bordered w-full"
                                            value={configuracaosistema.cnpj}
                                            required
                                            onChange={(e) =>
                                                setConfiguracaoSistema({
                                                    ...configuracaosistema,
                                                    cnpj:
                                                        e.target.value
                                                })
                                            }
                                        />

                                    </fieldset>

                                </div>

                            </div>


                            {/* SITE */}

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
                                            SITE
                                        </label>

                                        <input
                                            type="text"
                                            id="site"
                                            placeholder="00.000.000/0000-00"
                                            className="input input-bordered w-full"
                                            value={configuracaosistema.site}
                                            required
                                            onChange={(e) =>
                                                setConfiguracaoSistema({
                                                    ...configuracaosistema,
                                                    site:
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
                                            E-mail Contato
                                        </label>

                                        <input
                                            type="emailContato"
                                            id="emailContato"
                                            placeholder="configuracaosistema@emailContato.com"
                                            className="input input-bordered w-full"
                                            value={configuracaosistema.emailContato}
                                            required
                                            onChange={(e) =>
                                                setConfiguracaoSistema({
                                                    ...configuracaosistema,
                                                    emailContato:
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
                                            Tempo Minimo Agendamento Pedidos
                                        </label>

                                        <input
                                            type="text"
                                            id="tempoMinimoAgendamentoPedidos"
                                            placeholder="(81) 3333-4444"
                                            className="input input-bordered w-full"
                                            value={configuracaosistema.tempoMinimoAgendamentoPedidos}
                                            onChange={(e) =>
                                                setConfiguracaoSistema({
                                                    ...configuracaosistema,
                                                    tempoMinimoAgendamentoPedidos:
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
                                            Ligar Aceite Pedidos
                                        </label>

                                        <input
                                            type="text"
                                            id="ligarAceitePedidos"
                                            className="input input-bordered w-full"
                                            value={configuracaosistema.ligarAceitePedidos}
                                            required
                                            onChange={(e) =>
                                                setConfiguracaoSistema({
                                                    ...configuracaosistema,
                                                    ligarAceitePedidos:
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
                                            destino="/configuracaosistema"
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