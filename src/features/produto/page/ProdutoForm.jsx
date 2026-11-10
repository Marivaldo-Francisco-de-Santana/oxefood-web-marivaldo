import { useState } from "react";
import { toast } from 'react-toastify';
import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";
import { cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_PRODUTO } from "../../produto/service/produtoService";

export default function ProdutoForm() {
    const { idProduto } = useParams();
    const [listaCategoria, setListaCategoria] = useState([]);


    const [produto, setProduto] = useState({
        id: "",
        codigo: "",
        titulo: "",
        descricao: "",
        valorUnitario: "",
        tempoEntregaMinimo: "",
        tempoEntregaMaximo: ""
    });

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
                        <form>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="id">id</label>
                                        <input
                                            type="text"
                                            id="id"
                                            className="input input-bordered w-full"
                                            value={produto.id}
                                            onChange={(e) =>
                                                setProduto({ ...produto, id: e.target.value })
                                            }
                                        />
                                    </fieldset>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="codigo">Codigo</label>
                                        <input
                                            type="text"
                                            value={produto.codigo}
                                            onAccept={(value) =>
                                                setProduto({ ...produto, codigo: value })
                                            }
                                            className="input input-bordered w-full"
                                            id="codigo"
                                        />
                                    </fieldset>

                                </div>
                            </div>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="foneCelular">Titulo</label>
                                        <input
                                            type="text"
                                            value={produto.titulo}
                                            onAccept={(value) =>
                                                setProduto({ ...produto, titulo: value })
                                            }
                                            className="input input-bordered w-full"
                                            id="titulo"
                                        />
                                    </fieldset>

                                </div>


                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">Categoria</legend>
                                        <select
                                            className="select  w-full"
                                            value={produto.idCategoria}
                                            onChange={(e) =>
                                                setProduto({ ...produto, idCategoria: e.target.value })
                                            }
                                        >
                                            <option value="">Selecione ...</option>
                                            {listaCategoria.map((categoria, index) => (
                                                <option key={index} value={categoria.id}>
                                                    {categoria.descricao}
                                                </option>
                                            ))}
                                        </select>
                                    </fieldset>


                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="descricao">Descricao</label>
                                        <input
                                            type="text"
                                            value={produto.descricao}
                                            onAccept={(value) =>
                                                setProduto({ ...produto, descricao: value })
                                            }
                                            className="input input-bordered w-full"
                                            id="descricao"
                                        />
                                    </fieldset>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <legend className="fieldset-legend" htmlFor="valorUnitario">Valor unitario</legend>
                                        <input
                                            type="number"
                                            id="valorUnitario"
                                            className="input input-bordered w-full"
                                            value={produto.valorUnitario}
                                            onChange={(e) =>
                                                setProduto({ ...produto, valorUnitario: e.target.value })
                                            }
                                        />
                                    </fieldset>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <legend className="fieldset-legend" htmlFor="valorUnitario">Tempo entrega maximo</legend>
                                        <input
                                            type="number"
                                            id="Tempo entrega maximo"
                                            className="input input-bordered w-full"
                                            value={produto.tempoEntregaMaximo}
                                            onChange={(e) =>
                                                setProduto({ ...produto, tempoEntregaMaximo: e.target.value })
                                            }
                                        />
                                    </fieldset>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <legend className="fieldset-legend" htmlFor="valorUnitario">Tempo Entrega Minimo</legend>
                                        <input
                                            type="number"
                                            id="tempoEntregaMinimo"
                                            className="input input-bordered w-full"
                                            value={produto.tempoEntregaMinimo}
                                            onChange={(e) =>
                                                setProduto({ ...produto, tempoEntregaMinimo: e.target.value })
                                            }
                                        />
                                    </fieldset>

                                </div>
                            </div>
                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <div style={{ marginTop: '50px', textAlign: 'left' }}>
                                        <BackButton destino="/cliente" />
                                    </div>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <div style={{ marginTop: '50px', textAlign: 'right' }}>
                                        <SaveButton save={() => salvar()} />
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



