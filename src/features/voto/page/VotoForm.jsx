import { useState } from "react";
import { toast } from "react-toastify";

import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";

import { cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_VOTO } from "../service/votoService";

const VOTO_VAZIO = {
    nomeEleitor: "",
    numeroRegistroEleitoral: "",
    numeroCandidatoDepFederal: "",
    numeroCandidatoDepEstadual: "",
    numeroCandidatoSenador: "",
    numeroCandidatoGovernador: "",
    numeroCandidatoPresidente: ""
};

const paraNumero = (valor) => (valor === "" ? null : Number(valor));

export default function VotoForm() {

    const [voto, setVoto] = useState(VOTO_VAZIO);

    function alterar(campo, valor) {
        setVoto({ ...voto, [campo]: valor });
    }

    async function salvar() {

        const votoRequest = {
            nomeEleitor: voto.nomeEleitor,
            numeroRegistroEleitoral: voto.numeroRegistroEleitoral,
            numeroCandidatoDepFederal: paraNumero(voto.numeroCandidatoDepFederal),
            numeroCandidatoDepEstadual: paraNumero(voto.numeroCandidatoDepEstadual),
            numeroCandidatoSenador: paraNumero(voto.numeroCandidatoSenador),
            numeroCandidatoGovernador: paraNumero(voto.numeroCandidatoGovernador),
            numeroCandidatoPresidente: paraNumero(voto.numeroCandidatoPresidente)
        };

        try {
            await cadastrar(MAPPING_CONTROLLER_VOTO, votoRequest);
            toast.success("Voto cadastrado com sucesso!");
            setVoto(VOTO_VAZIO);

        } catch (erro) {
            console.error("ERRO AO CADASTRAR VOTO:", erro);
            toast.error("Erro ao cadastrar voto.");
        }
    }

    return (
        <div>

            <Menu />

            <Breadcrumbs items={[
                { label: "Voto" },
                { label: "Cadastrar" }
            ]} />

            <div style={{ marginTop: "40px", marginLeft: "10%", marginRight: "10%" }}>

                <div className="overflow-x-auto shadow-sm">

                    <div
                        className="flex items-center justify-between mb-6"
                        style={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}
                    >
                        <h1 className="text-3xl font-bold text-gray-800">
                            Votação 2026
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
                                        value={voto.nomeEleitor}
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
                                        value={voto.numeroRegistroEleitoral}
                                        required
                                        onChange={(e) => alterar("numeroRegistroEleitoral", e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="fieldset w-full">
                                    <label className="fieldset-legend" htmlFor="numeroCandidatoDepFederal">
                                        Número Candidato Dep. Federal
                                    </label>
                                    <input
                                        type="number"
                                        id="numeroCandidatoDepFederal"
                                        className="input input-bordered w-full"
                                        value={voto.numeroCandidatoDepFederal}
                                        onChange={(e) => alterar("numeroCandidatoDepFederal", e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="fieldset w-full">
                                    <label className="fieldset-legend" htmlFor="numeroCandidatoDepEstadual">
                                        Número Candidato Dep. Estadual
                                    </label>
                                    <input
                                        type="number"
                                        id="numeroCandidatoDepEstadual"
                                        className="input input-bordered w-full"
                                        value={voto.numeroCandidatoDepEstadual}
                                        onChange={(e) => alterar("numeroCandidatoDepEstadual", e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="fieldset w-full">
                                    <label className="fieldset-legend" htmlFor="numeroCandidatoSenador">
                                        Número Candidato Senador
                                    </label>
                                    <input
                                        type="number"
                                        id="numeroCandidatoSenador"
                                        className="input input-bordered w-full"
                                        value={voto.numeroCandidatoSenador}
                                        onChange={(e) => alterar("numeroCandidatoSenador", e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="fieldset w-full">
                                    <label className="fieldset-legend" htmlFor="numeroCandidatoGovernador">
                                        Número Candidato Governador
                                    </label>
                                    <input
                                        type="number"
                                        id="numeroCandidatoGovernador"
                                        className="input input-bordered w-full"
                                        value={voto.numeroCandidatoGovernador}
                                        onChange={(e) => alterar("numeroCandidatoGovernador", e.target.value)}
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
                                        value={voto.numeroCandidatoPresidente}
                                        onChange={(e) => alterar("numeroCandidatoPresidente", e.target.value)}
                                    />
                                </fieldset>

                            </div>

                            <div className="flex w-full justify-between p-8" style={{ marginTop: "40px" }}>
                                <BackButton destino="/voto" />
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