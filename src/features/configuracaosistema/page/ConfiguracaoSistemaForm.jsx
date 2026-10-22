import { useRef, useState } from "react";
import { toast } from "react-toastify";

import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";

import { cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_CONFIGURACAOSISTEMA_CADASTRO } from "../service/configuracaosistemaService";

const estadoInicial = {
    nomeEmpresa: "",
    cnpj: "",
    site: "",
    emailContato: "",
    tempoMinimoAgendamentoPedidos: "",
    ligarAceitePedidos: false,
    dataEntradaSistema: ""
};

export default function ConfiguracaoSistemaForm() {

    const [configuracaosistema, setConfiguracaoSistema] = useState(estadoInicial);

    // Referência ao formulário, para forçar a validação do navegador
    const formRef = useRef(null);

    // Evita envio duplicado (onSubmit do form + onClick do SaveButton)
    const enviando = useRef(false);

    async function salvar() {

        // Bloqueia o envio se houver campo vazio ou inválido
        if (!formRef.current.reportValidity()) {
            return;
        }

        if (enviando.current) {
            return;
        }

        enviando.current = true;

        try {

            const payload = {
                nomeEmpresa: configuracaosistema.nomeEmpresa,
                cnpj: configuracaosistema.cnpj,
                site: configuracaosistema.site,
                emailContato: configuracaosistema.emailContato,
                tempoMinimoAgendamentoPedidos:
                    configuracaosistema.tempoMinimoAgendamentoPedidos === ""
                        ? null
                        : Number(configuracaosistema.tempoMinimoAgendamentoPedidos),
                ligarAceitePedidos: Boolean(configuracaosistema.ligarAceitePedidos),
                dataEntradaSistema: configuracaosistema.dataEntradaSistema || null
            };

            console.log(
                "ENVIANDO Configuracao Sistema:",
                payload
            );

            const resposta = await cadastrar(
                MAPPING_CONTROLLER_CONFIGURACAOSISTEMA_CADASTRO,
                payload
            );

            console.log(
                "CONFIGURACAO SISTEMA CADASTRADA:",
                resposta
            );

            toast.success(
                "Configuração cadastrada com sucesso!"
            );

            setConfiguracaoSistema(estadoInicial);

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
                    JSON.stringify(erro.response.data, null, 2)
                );
            }

            toast.error(
                "Erro ao cadastrar configuração."
            );

        } finally {

            enviando.current = false;
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
                            Nova Configuração do Sistema
                        </h1>

                    </div>

                    <div className="divider divider-info" />

                    <div
                        className="overflow-x-auto"
                        style={{ padding: "30px" }}
                    >

                        <form
                            ref={formRef}
                            onSubmit={(e) => {

                                e.preventDefault();

                                salvar();

                            }}
                        >

                            {/* NOME EMPRESA */}

                            <div className="flex w-full">

                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{ padding: "30px" }}
                                >

                                    <fieldset className="fieldset w-full">

                                        <label
                                            className="fieldset-legend"
                                            htmlFor="nomeEmpresa"
                                        >
                                            Nome da Empresa
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
                                                    nomeEmpresa: e.target.value
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
                                    style={{ padding: "30px" }}
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
                                            maxLength={18}
                                            pattern="\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}"
                                            title="Use o formato 00.000.000/0000-00"
                                            placeholder="00.000.000/0000-00"
                                            className="input input-bordered w-full"
                                            value={configuracaosistema.cnpj}
                                            required
                                            onChange={(e) =>
                                                setConfiguracaoSistema({
                                                    ...configuracaosistema,
                                                    cnpj: e.target.value
                                                })
                                            }
                                        />

                                    </fieldset>

                                </div>

                            </div>


                            {/* SITE + E-MAIL */}

                            <div className="flex w-full">

                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{ padding: "30px" }}
                                >

                                    <fieldset className="fieldset w-full">

                                        <label
                                            className="fieldset-legend"
                                            htmlFor="site"
                                        >
                                            Site
                                        </label>

                                        <input
                                            type="url"
                                            id="site"
                                            placeholder="https://www.suaempresa.com.br"
                                            className="input input-bordered w-full"
                                            value={configuracaosistema.site}
                                            required
                                            onChange={(e) =>
                                                setConfiguracaoSistema({
                                                    ...configuracaosistema,
                                                    site: e.target.value
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
                                            htmlFor="emailContato"
                                        >
                                            E-mail de Contato
                                        </label>

                                        <input
                                            type="email"
                                            id="emailContato"
                                            placeholder="contato@suaempresa.com.br"
                                            className="input input-bordered w-full"
                                            value={configuracaosistema.emailContato}
                                            required
                                            onChange={(e) =>
                                                setConfiguracaoSistema({
                                                    ...configuracaosistema,
                                                    emailContato: e.target.value
                                                })
                                            }
                                        />

                                    </fieldset>

                                </div>

                            </div>


                            {/* TEMPO MÍNIMO + DATA DE ENTRADA */}

                            <div className="flex w-full">

                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{ padding: "30px" }}
                                >

                                    <fieldset className="fieldset w-full">

                                        <label
                                            className="fieldset-legend"
                                            htmlFor="tempoMinimoAgendamentoPedidos"
                                        >
                                            Tempo Mínimo Agendamento Pedidos
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            id="tempoMinimoAgendamentoPedidos"
                                            className="input input-bordered w-full"
                                            value={configuracaosistema.tempoMinimoAgendamentoPedidos}
                                            required
                                            onChange={(e) =>
                                                setConfiguracaoSistema({
                                                    ...configuracaosistema,
                                                    tempoMinimoAgendamentoPedidos: e.target.value
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
                                            htmlFor="dataEntradaSistema"
                                        >
                                            Data de Entrada no Sistema
                                        </label>

                                        <input
                                            type="date"
                                            id="dataEntradaSistema"
                                            className="input input-bordered w-full"
                                            value={configuracaosistema.dataEntradaSistema}
                                            required
                                            onChange={(e) =>
                                                setConfiguracaoSistema({
                                                    ...configuracaosistema,
                                                    dataEntradaSistema: e.target.value
                                                })
                                            }
                                        />

                                    </fieldset>

                                </div>

                            </div>


                            {/* LIGAR ACEITE PEDIDOS */}

                            <div className="flex w-full">

                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{ padding: "30px" }}
                                >

                                    <fieldset className="fieldset w-full">

                                        <label
                                            className="fieldset-legend"
                                            htmlFor="ligarAceitePedidos"
                                        >
                                            Ligar Aceite de Pedidos
                                        </label>

                                        <input
                                            type="checkbox"
                                            id="ligarAceitePedidos"
                                            className="toggle toggle-info"
                                            checked={configuracaosistema.ligarAceitePedidos}
                                            onChange={(e) =>
                                                setConfiguracaoSistema({
                                                    ...configuracaosistema,
                                                    ligarAceitePedidos: e.target.checked
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

                                        <BackButton
                                            destino="/configuracaosistema"
                                        />

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
