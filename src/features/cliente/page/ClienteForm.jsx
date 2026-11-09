import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Menu from "../../../shared/components/Menu";
import Footer from "../../../shared/components/Footer";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import BackButton from "../../../shared/components/BackButton";
import SaveButton from "../../../shared/components/SaveButton";

import {
    buscarPorId,
    cadastrar,
    atualizar
} from "../../../shared/services/crudService";

// Definida aqui para não depender do arquivo Mappings
const MAPPING_CONTROLLER_CLIENTE = "/api/cliente";

export default function ClienteForm() {

    const { idCliente } = useParams();
    const navigate = useNavigate();

    const [cliente, setCliente] = useState({
        id: null,
        nome: "",
        cpf: "",
        foneCelular: "",
        foneFixo: "",
        dataNascimento: ""
    });

    useEffect(() => {
        if (idCliente) {
            carregarCliente();
        }
    }, [idCliente]);

    async function carregarCliente() {
        try {
            const data = await buscarPorId(
                MAPPING_CONTROLLER_CLIENTE,
                idCliente
            );

            setCliente({
                id: data.id,
                nome: data.nome ?? "",
                cpf: data.cpf ?? "",
                foneCelular: data.foneCelular ?? "",
                foneFixo: data.foneFixo ?? "",
                dataNascimento: data.dataNascimento ?? ""
            });

        } catch (erro) {
            console.error("Erro ao carregar cliente:", erro);
            toast.error("Erro ao carregar cliente.");
        }
    }

    function atualizarCampo(event) {
        const { name, value } = event.target;

        setCliente({
            ...cliente,
            [name]: value
        });
    }

    async function salvar() {
        try {
            const dados = {
                ...cliente,
                dataNascimento: cliente.dataNascimento || null
            };

            if (idCliente) {
                // atualizar recebe apenas (mapping, objeto); o id vai dentro do objeto
                await atualizar(
                    MAPPING_CONTROLLER_CLIENTE,
                    { ...dados, id: idCliente }
                );

                toast.success("Cliente atualizado com sucesso!");

            } else {
                await cadastrar(
                    MAPPING_CONTROLLER_CLIENTE,
                    dados
                );

                toast.success("Cliente cadastrado com sucesso!");
            }

            navigate("/cliente");

        } catch (erro) {
            console.error("Erro ao salvar cliente:", erro);
            toast.error("Erro ao salvar cliente.");
        }
    }

    return (
        <>
            <Menu />

            <div className="container mx-auto mt-4 px-4">

                {idCliente ? (
                    <Breadcrumbs items={[
                        { label: "Cliente" },
                        { label: "Alterar" }
                    ]} />
                ) : (
                    <Breadcrumbs items={[
                        { label: "Cliente" },
                        { label: "Cadastrar" }
                    ]} />
                )}

                <h1 className="text-3xl font-bold text-gray-800">
                    {idCliente ? "Alterar Cliente" : "Novo Cliente"}
                </h1>

                <div className="mt-4 rounded-lg bg-white p-6 shadow">

                    <div className="mb-4">
                        <label className="mb-2 block font-medium">
                            Nome
                        </label>

                        <input
                            type="text"
                            name="nome"
                            value={cliente.nome}
                            onChange={atualizarCampo}
                            className="w-full rounded border p-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block font-medium">
                            CPF
                        </label>

                        <input
                            type="text"
                            name="cpf"
                            value={cliente.cpf}
                            onChange={atualizarCampo}
                            className="w-full rounded border p-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block font-medium">
                            Telefone celular
                        </label>

                        <input
                            type="text"
                            name="foneCelular"
                            value={cliente.foneCelular}
                            onChange={atualizarCampo}
                            className="w-full rounded border p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block font-medium">
                            Telefone fixo
                        </label>

                        <input
                            type="text"
                            name="foneFixo"
                            value={cliente.foneFixo}
                            onChange={atualizarCampo}
                            className="w-full rounded border p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block font-medium">
                            Data de nascimento
                        </label>

                        <input
                            type="date"
                            name="dataNascimento"
                            value={cliente.dataNascimento}
                            onChange={atualizarCampo}
                            className="w-full rounded border p-2"
                        />
                    </div>

                    <div className="flex gap-2">
                        <BackButton destino="/cliente" />

                        <SaveButton save={salvar} />
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
}