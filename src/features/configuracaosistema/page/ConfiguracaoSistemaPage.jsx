import { useEffect, useState } from "react";
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
    MAPPING_CONTROLLER_CONFIGURACAOSISTEMA
} from "../service/configuracaosistemaService";

// Formata yyyy-MM-dd para dd/MM/yyyy sem sofrer efeito de fuso horário
function formatarData(data) {

    if (!data) {
        return "-";
    }

    const [ano, mes, dia] = String(data).split("-");

    return `${dia}/${mes}/${ano}`;
}

function formatarAceite(valor) {
    return valor ? "Ligado" : "Desligado";
}

export default function ConfiguracaoSistemaPage() {

    const [lista, setLista] = useState([]);

    const [configuracaosistema, setConfiguracaoSistema] = useState({
        id: null,
        nomeEmpresa: "",
        cnpj: "",
        site: "",
        emailContato: "",
        tempoMinimoAgendamentoPedidos: "",
        ligarAceitePedidos: false,
        dataEntradaSistema: ""
    });

    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {

        try {

            const data = await listar(
                MAPPING_CONTROLLER_CONFIGURACAOSISTEMA
            );

            console.log(
                "CONFIGURACAO SISTEMAS RECEBIDAS:",
                data
            );

            setLista(data);

        } catch (erro) {

            console.error(
                "ERRO AO CARREGAR CONFIGURACAO SISTEMAS:",
                erro
            );
        }
    }

    function editar(id) {

        console.log(
            "Editar configuracaosistema:",
            id
        );
    }

    async function confirmarRemover(id) {

        if (!confirm(
            "Deseja realmente excluir esta configuração?"
        )) {
            return;
        }

        try {

            await remover(
                MAPPING_CONTROLLER_CONFIGURACAOSISTEMA,
                id
            );

            await carregar();

            toast.success(
                "Configuração removida com sucesso!"
            );

        } catch (erro) {

            console.error(erro);

            toast.error(
                "Erro ao tentar remover a configuração."
            );
        }
    }

    async function detalhar(id) {

        try {

            const data = await buscarPorId(
                MAPPING_CONTROLLER_CONFIGURACAOSISTEMA,
                id
            );

            setConfiguracaoSistema({
                id: data.id,
                nomeEmpresa: data.nomeEmpresa ?? "",
                cnpj: data.cnpj ?? "",
                site: data.site ?? "",
                emailContato: data.emailContato ?? "",
                tempoMinimoAgendamentoPedidos:
                    data.tempoMinimoAgendamentoPedidos ?? "",
                ligarAceitePedidos: data.ligarAceitePedidos ?? false,
                dataEntradaSistema: data.dataEntradaSistema ?? ""
            });

            document
                .getElementById("modal-detalhar")
                .showModal();

        } catch (erro) {

            console.error(erro);

            toast.error(
                "Erro ao carregar configuração."
            );
        }
    }

    return (

        <div>

            <Menu />

            <Breadcrumbs
                items={[
                    { label: "ConfiguracaoSistema" },
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
                            Configurações do Sistema
                        </h1>

                        <NewButton
                            destino="/configuracaosistema-form"
                        />

                    </div>

                    <div className="divider divider-info" />

                    <div
                        className="overflow-x-auto"
                        style={{
                            marginTop: "30px"
                        }}
                    >

                        <table className="table table-zebra">

                            <thead>

                                <tr
                                    style={{
                                        textAlign: "center"
                                    }}
                                >

                                    <th>Nome da Empresa</th>
                                    <th>CNPJ</th>
                                    <th>Site</th>
                                    <th>E-mail de Contato</th>
                                    <th>Tempo Mínimo (min)</th>
                                    <th>Aceite de Pedidos</th>
                                    <th>Data de Entrada</th>
                                    <th>Ações</th>

                                </tr>

                            </thead>

                            <tbody>

                                {lista.map((item) => (

                                    <tr key={item.id}>

                                        <td>
                                            {item.nomeEmpresa}
                                        </td>

                                        <td>
                                            {item.cnpj}
                                        </td>

                                        <td>
                                            {item.site}
                                        </td>

                                        <td>
                                            {item.emailContato}
                                        </td>

                                        <td>
                                            {item.tempoMinimoAgendamentoPedidos}
                                        </td>

                                        <td>
                                            {formatarAceite(item.ligarAceitePedidos)}
                                        </td>

                                        <td>
                                            {formatarData(item.dataEntradaSistema)}
                                        </td>

                                        <td
                                            style={{
                                                textAlign: "center"
                                            }}
                                        >

                                            <CrudActions

                                                onDetail={() =>
                                                    detalhar(item.id)
                                                }

                                                onEdit={() =>
                                                    editar(item.id)
                                                }

                                                onDelete={() =>
                                                    confirmarRemover(item.id)
                                                }

                                            />

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* MODAL DE DETALHES DA CONFIGURACAO SISTEMA */}

            <dialog
                id="modal-detalhar"
                className="modal"
            >

                <div className="modal-box">

                    <h3 className="font-bold text-lg">
                        Dados da Configuração do Sistema
                    </h3>

                    <div className="divider" />

                    <p className="py-2">
                        <strong>Nome da Empresa:</strong>{" "}
                        {configuracaosistema.nomeEmpresa}
                    </p>

                    <p className="py-2">
                        <strong>CNPJ:</strong>{" "}
                        {configuracaosistema.cnpj}
                    </p>

                    <p className="py-2">
                        <strong>Site:</strong>{" "}
                        {configuracaosistema.site}
                    </p>

                    <p className="py-2">
                        <strong>E-mail de Contato:</strong>{" "}
                        {configuracaosistema.emailContato}
                    </p>

                    <p className="py-2">
                        <strong>Tempo Mínimo Agendamento Pedidos:</strong>{" "}
                        {configuracaosistema.tempoMinimoAgendamentoPedidos}
                    </p>

                    <p className="py-2">
                        <strong>Aceite de Pedidos:</strong>{" "}
                        {formatarAceite(configuracaosistema.ligarAceitePedidos)}
                    </p>

                    <p className="py-2">
                        <strong>Data de Entrada no Sistema:</strong>{" "}
                        {formatarData(configuracaosistema.dataEntradaSistema)}
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
