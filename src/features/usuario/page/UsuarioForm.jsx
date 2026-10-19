import { useState } from "react";
import { toast } from "react-toastify";

import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";

import { cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_USUARIO_CADASTRO } from "../service/usuarioService";

export default function UsuarioForm() {

    const [usuario, setUsuario] = useState({
        username: "",
        password: "",
        roles: []
    });

    async function salvar() {
        try {
            const usuarioParaSalvar = {
                username: usuario.username,
                password: usuario.password,
                roles: usuario.roles
            };

            console.log("ENVIANDO USUARIO:", {
                ...usuarioParaSalvar,
                password: "[OCULTA]"
            });

            const resposta = await cadastrar(
                MAPPING_CONTROLLER_USUARIO_CADASTRO,
                usuarioParaSalvar
            );

            console.log("USUARIO CADASTRADO:", resposta);

            toast.success("Usuário cadastrado com sucesso!");

            setUsuario({
                username: "",
                password: "",
                roles: []
            });

        } catch (erro) {
            console.error("ERRO AO CADASTRAR USUARIO:", erro);

            if (erro.response) {
                console.error("STATUS:", erro.response.status);
                console.error("RESPOSTA DO SERVIDOR:", erro.response.data);
            }

            toast.error("Erro ao cadastrar usuário.");
        }
    }

    return (
        <div>
            <Menu />

            <Breadcrumbs
                items={[
                    { label: "Usuário" },
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
                            Novo Usuário
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
                            {/* USERNAME */}
                            <div className="flex w-full">
                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{ padding: "30px" }}
                                >
                                    <fieldset className="fieldset w-full">
                                        <label
                                            className="fieldset-legend"
                                            htmlFor="username"
                                        >
                                            Nome de usuário
                                        </label>

                                        <input
                                            type="text"
                                            id="username"
                                            className="input input-bordered w-full"
                                            value={usuario.username}
                                            required
                                            onChange={(e) =>
                                                setUsuario({
                                                    ...usuario,
                                                    username: e.target.value
                                                })
                                            }
                                        />
                                    </fieldset>
                                </div>
                            </div>

                            {/* PASSWORD */}
                            <div className="flex w-full">
                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{ padding: "30px" }}
                                >
                                    <fieldset className="fieldset w-full">
                                        <label
                                            className="fieldset-legend"
                                            htmlFor="password"
                                        >
                                            Senha
                                        </label>

                                        <input
                                            type="password"
                                            id="password"
                                            className="input input-bordered w-full"
                                            value={usuario.password}
                                            required
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setUsuario({
                                                    ...usuario,
                                                    password: e.target.value
                                                })
                                            }
                                        />
                                    </fieldset>
                                </div>
                            </div>

                            {/* ROLES */}
                            <div className="flex w-full">
                                <div
                                    className="card rounded-box grid grow p-8"
                                    style={{ padding: "30px" }}
                                >
                                    <fieldset className="fieldset w-full">
                                        <label
                                            className="fieldset-legend"
                                            htmlFor="roles"
                                        >
                                            Perfil do usuário
                                        </label>

                                        <select
                                            id="roles"
                                            className="select select-bordered w-full"
                                            value={usuario.roles[0] || ""}
                                            required
                                            onChange={(e) =>
                                                setUsuario({
                                                    ...usuario,
                                                    roles: e.target.value
                                                        ? [e.target.value]
                                                        : []
                                                })
                                            }
                                        >
                                            <option value="">
                                                Selecione um perfil
                                            </option>
                                            <option value="ROLE_USER">
                                                ROLE_USER
                                            </option>
                                            <option value="ROLE_ADMIN">
                                                ROLE_ADMIN
                                            </option>
                                        </select>
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
                                        <BackButton destino="/usuario" />
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