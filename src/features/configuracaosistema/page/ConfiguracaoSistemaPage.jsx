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

export default function ConfiguracaoSistemaPage() {

    const [lista, setLista] = useState([]);

    const [configuracaosistema, setConfiguracaoSistema] = useState({
        id: null,
        razaoSocial: "",
        nomeFantasia: "",
        cnpj: "",
        email: "",
        telefone: "",
        endereco: ""
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
            "Deseja realmente excluir esta configuracaosistema?"
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
                "ConfiguracaoSistema removida com sucesso!"
            );

        } catch (erro) {

            console.error(erro);

            toast.error(
                "Erro ao tentar remover a configuracaosistema."
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
                nomeEmpresa: data.cnpj ?? "",
                site: data.nomeFantasia ?? "",
                cnpj: data.cnpj ?? "",
                email: data.email ?? "",
                telefone: data.telefone ?? "",
                endereco: data.endereco ?? ""
            });

            document
                .getElementById("modal-detalhar")
                .showModal();

        } catch (erro) {

            console.error(erro);

            toast.error(
                "Erro ao carregar configuracaosistema."
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
                            Configuracao Sistemas
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

                                    <th>Razão Social</th>
                                    <th>Nome Fantasia</th>
                                    <th>CNPJ</th>
                                    <th>E-mail</th>
                                    <th>Telefone</th>
                                    <th>Endereço</th>
                                    <th>Ações</th>

                                </tr>

                            </thead>

                            <tbody>

                                {lista.map((configuracaosistema) => (

                                    <tr key={configuracaosistema.id}>

                                        <td>
                                            {configuracaosistema.nomeEmpresa}
                                        </td>

                                        <td>
                                            {configuracaosistema.cnpj}
                                        </td>

                                        <td>
                                            {configuracaosistema.site}
                                        </td>

                                        <td>
                                            {configuracaosistema.emailContatol}
                                        </td>

                                        <td>
                                            {configuracaosistema.ligarAceitePedidos}
                                        </td>

                                        <td>
                                            {configuracaosistema.dataEntradaSistema}
                                        </td>

                                        <td
                                            style={{
                                                textAlign: "center"
                                            }}
                                        >

                                            <CrudActions

                                                onDetail={() =>
                                                    detalhar(
                                                        configuracaosistema.id
                                                    )
                                                }

                                                onEdit={() =>
                                                    editar(
                                                        configuracaosistema.id
                                                    )
                                                }

                                                onDelete={() =>
                                                    confirmarRemover(
                                                        configuracaosistema.id
                                                    )
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
                        Dados da ConfiguracaoSistema
                    </h3>

                    <div className="divider" />

                    <p className="py-2">
                        <strong>Nome Empresa:</strong>{" "}
                        {configuracaosistema.nomeEmpresa}
                    </p>

                    <p className="py-2">
                        <strong>CNPJ:</strong>{" "}
                        {configuracaosistema.cnpj}
                    </p>

                    <p className="py-2">
                        <strong>SITE:</strong>{" "}
                        {configuracaosistema.site}
                    </p>

                    <p className="py-2">
                        <strong>E-mail Contato:</strong>{" "}
                        {configuracaosistema.emailContato}
                    </p>

                    <p className="py-2">
                        <strong>Tempo Minimo Agendamento Pedidos:</strong>{" "}
                        {configuracaosistema.tempoMinimoAgendamentoPedidos}
                    </p>

                    <p className="py-2">
                        <strong>Data Entrada Sistema:</strong>{" "}
                        {configuracaosistema.dataEntradaSistema}
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