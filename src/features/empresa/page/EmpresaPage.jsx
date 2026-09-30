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
    MAPPING_CONTROLLER_EMPRESA
} from "../service/empresaService";

export default function EmpresaPage() {

    const [lista, setLista] = useState([]);

    const [empresa, setEmpresa] = useState({
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
                MAPPING_CONTROLLER_EMPRESA
            );

            console.log(
                "EMPRESAS RECEBIDAS:",
                data
            );

            setLista(data);

        } catch (erro) {

            console.error(
                "ERRO AO CARREGAR EMPRESAS:",
                erro
            );
        }
    }

    function editar(id) {

        console.log(
            "Editar empresa:",
            id
        );
    }

    async function confirmarRemover(id) {

        if (!confirm(
            "Deseja realmente excluir esta empresa?"
        )) {
            return;
        }

        try {

            await remover(
                MAPPING_CONTROLLER_EMPRESA,
                id
            );

            await carregar();

            toast.success(
                "Empresa removida com sucesso!"
            );

        } catch (erro) {

            console.error(erro);

            toast.error(
                "Erro ao tentar remover a empresa."
            );
        }
    }

    async function detalhar(id) {

        try {

            const data = await buscarPorId(
                MAPPING_CONTROLLER_EMPRESA,
                id
            );

            setEmpresa({
                id: data.id,
                razaoSocial: data.razaoSocial ?? "",
                nomeFantasia: data.nomeFantasia ?? "",
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
                "Erro ao carregar empresa."
            );
        }
    }

    return (

        <div>

            <Menu />

            <Breadcrumbs
                items={[
                    { label: "Empresa" },
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
                            Empresas
                        </h1>

                        <NewButton
                            destino="/empresa-form"
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

                                {lista.map((empresa) => (

                                    <tr key={empresa.id}>

                                        <td>
                                            {empresa.razaoSocial}
                                        </td>

                                        <td>
                                            {empresa.nomeFantasia}
                                        </td>

                                        <td>
                                            {empresa.cnpj}
                                        </td>

                                        <td>
                                            {empresa.email}
                                        </td>

                                        <td>
                                            {empresa.telefone}
                                        </td>

                                        <td>
                                            {empresa.endereco}
                                        </td>

                                        <td
                                            style={{
                                                textAlign: "center"
                                            }}
                                        >

                                            <CrudActions

                                                onDetail={() =>
                                                    detalhar(
                                                        empresa.id
                                                    )
                                                }

                                                onEdit={() =>
                                                    editar(
                                                        empresa.id
                                                    )
                                                }

                                                onDelete={() =>
                                                    confirmarRemover(
                                                        empresa.id
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

            {/* MODAL DE DETALHES DA EMPRESA */}

            <dialog
                id="modal-detalhar"
                className="modal"
            >

                <div className="modal-box">

                    <h3 className="font-bold text-lg">
                        Dados da Empresa
                    </h3>

                    <div className="divider" />

                    <p className="py-2">
                        <strong>Razão Social:</strong>{" "}
                        {empresa.razaoSocial}
                    </p>

                    <p className="py-2">
                        <strong>Nome Fantasia:</strong>{" "}
                        {empresa.nomeFantasia}
                    </p>

                    <p className="py-2">
                        <strong>CNPJ:</strong>{" "}
                        {empresa.cnpj}
                    </p>

                    <p className="py-2">
                        <strong>E-mail:</strong>{" "}
                        {empresa.email}
                    </p>

                    <p className="py-2">
                        <strong>Telefone:</strong>{" "}
                        {empresa.telefone}
                    </p>

                    <p className="py-2">
                        <strong>Endereço:</strong>{" "}
                        {empresa.endereco}
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

