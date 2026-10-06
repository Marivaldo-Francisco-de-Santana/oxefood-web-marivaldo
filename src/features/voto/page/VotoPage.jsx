import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import CrudActions from "../../../shared/components/CrudActions";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import NewButton from "../../../shared/components/NewButton";

import { buscarPorId, listar, remover } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_VOTO } from "../service/clienteService";

export default function VotoPage() {

    const [lista, setLista] = useState([]);

    const [cliente, setdataVotacaooto] = useState({
       nomeEleitor: "",
        numeroRegistroEleitoral: "",
        dataVotacao: ""
    });


    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {

        try {

            const data = await listar(
                MAPPING_CONTROLLER_VOTO
            );

            console.log("VOTO RECEBIDOS:", data);

            setLista(data);

        } catch (erro) {

            console.error(
                "ERRO AO CARREGAR VOTOS:",
                erro
            );

        }
    }

    function editar(id) {
        console.log("Editar voto:", id);
    }

    async function confirmarRemover(id) {

        if (!confirm("Deseja realmente excluir este cliente?")) {
            return;
        }

        try {

            await remover(MAPPING_CONTROLLER_VOTO, id);
            await carregar();
            toast.success("Cliente removido com sucesso!");

        } catch (erro) {

            console.error(erro);
            toast.error("Erro ao tentar remover o cliente.");
        }

    }
async function detalhar(id) {

    try {
    
        const data = await buscarPorId(
            MAPPING_CONTROLLER_VOTO,
            id
        );

        setVoto({
            nomeEleitor: "",
            numeroRegistroEleitoral: "",
            dataVotacao: ""
        });

        document.getElementById('modal-detalhar').showModal()

    } catch (erro) {
        toast.error("Erro ao carregar cliente.");
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
                            Votos
                        </h1>

                        <NewButton destino="/voto-form" />

                    </div>

                    <div className="divider divider-info" />

                    <div
                        className="overflow-x-auto"
                        style={{ marginTop: "30px" }}
                    >

                        <table className="table table-zebra">

                            <thead>

                                <tr style={{ textAlign: "center" }}>

                                    <th> Nome Eleitor </th>
                                    <th> Numero Registro Eleitoral </th>
                                    <th> Data Votacao </th>
                                    
                                </tr>

                            </thead>

                            <tbody>

                                {lista.map((voto) => (

                                    <tr key={voto.id}>

                                        <td>
                                            {voto.nomeEleitor}
                                        </td>

                                        <td>
                                            {voto.numeroRegistroEleitoral}
                                        </td>

                                        <td>
                                            {voto.dataVotacao}
                                        </td>


                                        <td
                                            style={{
                                                textAlign: "center"
                                            }}
                                        >

                                            <CrudActions

                                                onDetail={() =>
                                                    
                                                    detalhar(voto.id)}
                                                onEdit={() =>
                                                    editar(voto.id)
                                                }
                                                onDelete={() =>
                                                    confirmarRemover(
                                                        voto.id
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
 <dialog id="modal-detalhar" className="modal">
                <div className="modal-box">   
                    <h3 className="font-bold text-lg">Dados do Voto</h3>
                    <div className="divider" />
                    <p className="py-4"> 
                        <strong> Nome Eleitor :</strong> {voto.nomeEleitor}
                    </p>
                    <p className="py-4">
                        <strong> Número Registro Eleitoral :</strong> {voto.numeroRegistroEleitoral}
                    </p>
                    <p className="py-4">
                        <strong> Data Votacao :</strong> {voto.dataVotacao}
                    </p>
                    
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Fechar</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <Footer />

        </div>
    );

}