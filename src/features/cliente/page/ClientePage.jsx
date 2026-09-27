import { useEffect, useState } from "react";

import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import CrudActions from "../../../shared/components/CrudActions";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import NewButton from "../../../shared/components/NewButton";

import { listar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_CLIENTE } from "../service/clienteService";

export default function ClientePage() {

    const [lista, setLista] = useState([]);

    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {

        try {

            const data = await listar(
                MAPPING_CONTROLLER_CLIENTE
            );

            console.log("CLIENTES RECEBIDOS:", data);

            setLista(data);

        } catch (erro) {

            console.error(
                "ERRO AO CARREGAR CLIENTES:",
                erro
            );

        }
    }

    function editar(id) {
        console.log("Editar cliente:", id);
    }

    function confirmarRemover(id) {

        if (confirm("Deseja realmente excluir este cliente?")) {

            console.log(
                "Excluir cliente:",
                id
            );

        }
    }

    return (

        <div>

            <Menu />

            <Breadcrumbs
                items={[
                    { label: "Cliente" },
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
                            Clientes
                        </h1>

                        <NewButton destino="/cliente-form" />

                    </div>

                    <div className="divider divider-info" />

                    <div
                        className="overflow-x-auto"
                        style={{ marginTop: "30px" }}
                    >

                        <table className="table table-zebra">

                            <thead>

                                <tr style={{ textAlign: "center" }}>

                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>Data de Nascimento</th>
                                    <th>Telefone Celular</th>
                                    <th>Telefone Fixo</th>
                                    <th>Ações</th>

                                </tr>

                            </thead>

                            <tbody>

                                {lista.map((cliente) => (

                                    <tr key={cliente.id}>

                                        <td>
                                            {cliente.nome}
                                        </td>

                                        <td>
                                            {cliente.cpf}
                                        </td>

                                        <td>
                                            {cliente.dataNascimento}
                                        </td>

                                        <td>
                                            {cliente.foneCelular}
                                        </td>

                                        <td>
                                            {cliente.foneFixo}
                                        </td>

                                        <td
                                            style={{
                                                textAlign: "center"
                                            }}
                                        >

                                            <CrudActions
                                                onEdit={() =>
                                                    editar(cliente.id)
                                                }
                                                onDelete={() =>
                                                    confirmarRemover(
                                                        cliente.id
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

            <Footer />

        </div>
    );
}

