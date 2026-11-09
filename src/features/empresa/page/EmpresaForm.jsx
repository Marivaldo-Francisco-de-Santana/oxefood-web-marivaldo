import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";

import {
    atualizar,
    buscarPorId,
    cadastrar
} from "../../../shared/services/crudService";

import { MAPPING_CONTROLLER_EMPRESA_CADASTRO } from "../service/empresaService";

// ATENÇÃO: confirme no @RequestMapping do controller de empresa.
// Usada para buscar por id (GET /{id}) e atualizar (PUT).
const MAPPING_CONTROLLER_EMPRESA = "/api/empresa";

const EMPRESA_VAZIA = {
    id: null,
    razaoSocial: "",
    nomeFantasia: "",
    cnpj: "",
    email: "",
    telefone: "",
    endereco: ""
};

export default function EmpresaForm() {

    const { idEmpresa } = useParams();
    const navigate = useNavigate();

    const [empresa, setEmpresa] = useState(EMPRESA_VAZIA);

    // evita envio duplicado (onSubmit + clique no SaveButton)
    const salvando = useRef(false);

    useEffect(() => {
        if (idEmpresa) {
            carregarEmpresa();
        }
    }, [idEmpresa]);

    async function carregarEmpresa() {
        try {
            const data = await buscarPorId(
                MAPPING_CONTROLLER_EMPRESA,
                idEmpresa
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

        } catch (erro) {
            console.error("Erro ao carregar empresa:", erro);
            toast.error("Erro ao carregar empresa.");
        }
    }

    function atualizarCampo(event) {
        const { name, value } = event.target;

        setEmpresa((anterior) => ({
            ...anterior,
            [name]: value
        }));
    }

    async function salvar() {

        if (salvando.current) {
            return;
        }

        salvando.current = true;

        try {

            console.log("ENVIANDO EMPRESA:", empresa);

            if (idEmpresa) {

                await atualizar(
                    MAPPING_CONTROLLER_EMPRESA,
                    { ...empresa, id: idEmpresa }
                );

                toast.success("Empresa atualizada com sucesso!");

            } else {

                const resposta = await cadastrar(
                    MAPPING_CONTROLLER_EMPRESA_CADASTRO,
                    empresa
                );

                console.log("EMPRESA CADASTRADA:", resposta);

                toast.success("Empresa cadastrada com sucesso!");
            }

            navigate("/empresa");

        } catch (erro) {

            console.error("ERRO AO SALVAR EMPRESA:", erro);

            if (erro.response) {
                console.error("STATUS:", erro.response.status);
                console.error("RESPOSTA:", erro.response.data);
            }

            toast.error("Erro ao salvar empresa.");

        } finally {
            salvando.current = false;
        }
    }

    // Cada campo: [nome, rótulo, tipo, obrigatório, placeholder]
    const campos = [
        ["razaoSocial", "Razão Social", "text", true, ""],
        ["nomeFantasia", "Nome Fantasia", "text", true, ""],
        ["cnpj", "CNPJ", "text", true, "00.000.000/0000-00"],
        ["email", "E-mail", "email", true, "empresa@email.com"],
        ["telefone", "Telefone", "text", false, "(81) 3333-4444"],
        ["endereco", "Endereço", "text", true, ""]
    ];

    function renderCampo([nome, rotulo, tipo, obrigatorio, placeholder]) {
        return (
            <div
                key={nome}
                className="card rounded-box grid grow p-8"
                style={{ padding: "30px" }}
            >
                <fieldset className="fieldset w-full">

                    <label className="fieldset-legend" htmlFor={nome}>
                        {rotulo}
                    </label>

                    <input
                        type={tipo}
                        id={nome}
                        name={nome}
                        placeholder={placeholder}
                        className="input input-bordered w-full"
                        value={empresa[nome]}
                        required={obrigatorio}
                        onChange={atualizarCampo}
                    />

                </fieldset>
            </div>
        );
    }

    return (
        <div>

            <Menu />

            <Breadcrumbs
                items={[
                    { label: "Empresa" },
                    { label: idEmpresa ? "Alterar" : "Cadastrar" }
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
                            {idEmpresa ? "Alterar Empresa" : "Nova Empresa"}
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

                            {/* Razão Social */}
                            <div className="flex w-full">
                                {renderCampo(campos[0])}
                            </div>

                            {/* Nome Fantasia */}
                            <div className="flex w-full">
                                {renderCampo(campos[1])}
                            </div>

                            {/* CNPJ + E-mail */}
                            <div className="flex w-full">
                                {renderCampo(campos[2])}
                                {renderCampo(campos[3])}
                            </div>

                            {/* Telefone + Endereço */}
                            <div className="flex w-full">
                                {renderCampo(campos[4])}
                                {renderCampo(campos[5])}
                            </div>

                            {/* Botões */}
                            <div className="flex w-full">

                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{ padding: "30px" }}
                                >
                                    <div style={{ marginTop: "50px", textAlign: "left" }}>
                                        <BackButton destino="/empresa" />
                                    </div>
                                </div>

                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{ padding: "30px" }}
                                >
                                    <div style={{ marginTop: "50px", textAlign: "right" }}>
                                        <SaveButton save={salvar} />
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