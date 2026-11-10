import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";
import { cadastrar } from "../../../shared/services/crudService";
// TODO: ajuste para a função de listagem que existir no seu crudService
// import { listar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_PRODUTO } from "../../produto/service/produtoService";
// TODO: ajuste para o mapping da sua controller de categoria
// import { MAPPING_CONTROLLER_CATEGORIA } from "../../categoria/service/categoriaService";

const PRODUTO_INICIAL = {
    id: "",
    codigo: "",
    titulo: "",
    descricao: "",
    idCategoria: "",
    valorUnitario: "",
    tempoEntregaMinimo: "",
    tempoEntregaMaximo: ""
};

export default function ProdutoForm() {
    const [listaCategoria, setListaCategoria] = useState([]);
    const [produto, setProduto] = useState(PRODUTO_INICIAL);

    useEffect(() => {
        async function carregarCategorias() {
            try {
                // Descomente e ajuste conforme o seu service:
                // const dados = await listar(MAPPING_CONTROLLER_CATEGORIA);
                // setListaCategoria(Array.isArray(dados) ? dados : []);
            } catch (erro) {
                toast.error("Erro ao carregar categorias.");
            }
        }
        carregarCategorias();
    }, []);

    function atualizarCampo(campo, valor) {
        setProduto((anterior) => ({ ...anterior, [campo]: valor }));
    }

    async function salvar() {
        try {
            await cadastrar(MAPPING_CONTROLLER_PRODUTO, produto);
            toast.success("Produto cadastrado com sucesso!");
        } catch (erro) {
            toast.error("Erro ao cadastrar Produto.");
        }
    }

    return (
        <div>
            <Menu />

            <Breadcrumbs items={[
                { label: "Produto" },
                { label: "Cadastrar" }
            ]} />

            <div style={{ marginTop: '40px', marginLeft: '10%', marginRight: '10%' }}>
                <div className="overflow-x-auto shadow-sm">

                    <div className="flex items-center justify-between mb-6" style={{ marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Novo Produto
                        </h1>
                    </div>

                    <div className="divider divider-info" />

                    <div className="overflow-x-auto" style={{ padding: '30px' }}>
                        <form onSubmit={(e) => e.preventDefault()}>

                            <div className="flex w-full">
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>
                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="id">Id</label>
                                        <input
                                            type="text"
                                            id="id"
                                            className="input input-bordered w-full"
                                            value={produto.id}
                                            onChange={(e) => atualizarCampo("id", e.target.value)}
                                        />
                                    </fieldset>
                                </div>

                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>
                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="codigo">Código</label>
                                        <input
                                            type="text"
                                            id="codigo"
                                            className="input input-bordered w-full"
                                            value={produto.codigo}
                                            onChange={(e) => atualizarCampo("codigo", e.target.value)}
                                        />
                                    </fieldset>
                                </div>
                            </div>

                            <div className="flex w-full">
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>
                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="titulo">Título</label>
                                        <input
                                            type="text"
                                            id="titulo"
                                            className="input input-bordered w-full"
                                            value={produto.titulo}
                                            onChange={(e) => atualizarCampo("titulo", e.target.value)}
                                        />
                                    </fieldset>
                                </div>

                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>
                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="idCategoria">Categoria</label>
                                        <select
                                            id="idCategoria"
                                            className="select w-full"
                                            value={produto.idCategoria}
                                            onChange={(e) => atualizarCampo("idCategoria", e.target.value)}
                                        >
                                            <option value="">Selecione ...</option>
                                            {(listaCategoria ?? []).map((categoria) => (
                                                <option key={categoria.id} value={categoria.id}>
                                                    {categoria.descricao}
                                                </option>
                                            ))}
                                        </select>
                                    </fieldset>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="descricao">Descrição</label>
                                        <input
                                            type="text"
                                            id="descricao"
                                            className="input input-bordered w-full"
                                            value={produto.descricao}
                                            onChange={(e) => atualizarCampo("descricao", e.target.value)}
                                        />
                                    </fieldset>
                                </div>

                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>
                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="valorUnitario">Valor unitário</label>
                                        <input
                                            type="number"
                                            id="valorUnitario"
                                            className="input input-bordered w-full"
                                            value={produto.valorUnitario}
                                            onChange={(e) => atualizarCampo("valorUnitario", e.target.value)}
                                        />
                                    </fieldset>
                                </div>

                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>
                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="tempoEntregaMaximo">Tempo entrega máximo</label>
                                        <input
                                            type="number"
                                            id="tempoEntregaMaximo"
                                            className="input input-bordered w-full"
                                            value={produto.tempoEntregaMaximo}
                                            onChange={(e) => atualizarCampo("tempoEntregaMaximo", e.target.value)}
                                        />
                                    </fieldset>
                                </div>

                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>
                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="tempoEntregaMinimo">Tempo entrega mínimo</label>
                                        <input
                                            type="number"
                                            id="tempoEntregaMinimo"
                                            className="input input-bordered w-full"
                                            value={produto.tempoEntregaMinimo}
                                            onChange={(e) => atualizarCampo("tempoEntregaMinimo", e.target.value)}
                                        />
                                    </fieldset>
                                </div>
                            </div>

                            <div className="flex w-full">
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>
                                    <div style={{ marginTop: '50px', textAlign: 'left' }}>
                                        <BackButton destino="/produto" />
                                    </div>
                                </div>

                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>
                                    <div style={{ marginTop: '50px', textAlign: 'right' }}>
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
