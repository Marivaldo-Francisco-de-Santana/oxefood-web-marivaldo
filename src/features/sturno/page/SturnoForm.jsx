import { useState } from "react";
import { toast } from "react-toastify";

import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";

import { cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_STURNO } from "../service/sturnoService";

const STURNO_VAZIO = {
    nomeEleitor: "",
    numeroRegistroEleitoral: "",
    numeroCandidatoPresidente: ""
};

const paraNumero = (valor) => (valor === "" ? null : Number(valor));

export default function SturnoForm() {

    const [sturno, setSturno] = useState(STURNO_VAZIO);

    function alterar(campo, valor) {
        setSturno({ ...sturno, [campo]: valor });
    }

    async function salvar() {

        const sturnoRequest = {
            nomeEleitor: sturno.nomeEleitor,
            numeroRegistroEleitoral: sturno.numeroRegistroEleitoral,
            numeroCandidatoPresidente: paraNumero(sturno.numeroCandidatoPresidente)
        };

        try {
            await cadastrar(MAPPING_CONTROLLER_STURNO, sturnoRequest);
            toast.success("Sturno cadastrado com sucesso!");
            setSturno(STURNO_VAZIO);

        } catch (erro) {
            console.error("ERRO AO CADASTRAR STURNO:", erro);
            toast.error("Erro ao cadastrar sturno.");
        }
    }

    return (
        <div>

            <Menu />

            <Breadcrumbs items={[
                { label: "Sturno" },
                { label: "Cadastrar" }
            ]} />

            <div style={{ marginTop: "40px", marginLeft: "10%", marginRight: "10%" }}>

                <div className="overflow-x-auto shadow-sm">

                    <div
                        className="flex items-center justify-between mb-6"
                        style={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}
                    >
                        <h1 className="text-3xl font-bold text-gray-800">
                            Votação 2026 Segundo Turno
                        </h1>
                    </div>

                    <div className="divider divider-info" />

                    <div style={{ padding: "30px" }}>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                salvar();
                            }}
                        >

                            <div className="grid grid-cols-2 gap-x-16 gap-y-10 p-8">

                                <fieldset className="fieldset w-full">
                                    <label className="fieldset-legend" htmlFor="nomeEleitor">
                                        Eleitor
                                    </label>
                                    <input
                                        type="text"
                                        id="nomeEleitor"
                                        className="input input-bordered w-full"
                                        value={sturno.nomeEleitor}
                                        required
                                        onChange={(e) => alterar("nomeEleitor", e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="fieldset w-full">
                                    <label className="fieldset-legend" htmlFor="numeroRegistroEleitoral">
                                        Registro
                                    </label>
                                    <input
                                        type="text"
                                        id="numeroRegistroEleitoral"
                                        className="input input-bordered w-full"
                                        value={sturno.numeroRegistroEleitoral}
                                        required
                                        onChange={(e) => alterar("numeroRegistroEleitoral", e.target.value)}
                                    />
                            
                                </fieldset>

                                <fieldset className="fieldset" style={{ maxWidth: "270px" }}>
                                    <label className="fieldset-legend" htmlFor="numeroCandidatoPresidente">
                                        Número Candidato Presidente
                                    </label>
                                    <input
                                        type="number"
                                        id="numeroCandidatoPresidente"
                                        className="input input-bordered w-full"
                                        value={sturno.numeroCandidatoPresidente}
                                        onChange={(e) => alterar("numeroCandidatoPresidente", e.target.value)}
                                    />
                                </fieldset>

                            </div>

                            <div className="flex w-full justify-between p-8" style={{ marginTop: "40px" }}>
                                <BackButton destino="/sturno" />
                                <SaveButton save={salvar} />
                            </div>

                        </form>

                    </div>

                </div>

            </div>

            <Footer />

        </div>
    );
}