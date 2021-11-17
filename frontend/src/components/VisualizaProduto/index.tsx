import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Marca } from "types/produto";
import { BASE_URL } from "utils/request";
import { Carro } from '../../types/produto';

let carrostorage = JSON.parse(localStorage.getItem('carrostorage') || '{}');


const VisualizarProduto = () => {
    const [carro, setCarro] = useState<Carro>(carrostorage)


    useEffect(() => {
        console.log("AA")
        setCarro(carro);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const history = useNavigate();

    function onSubmit(event: any) {
        event.preventDefault();
        history("/")
    }
    type TodasCategoria = {
        ids: number[],
        nomes: string[],
    }

    const [categoria, setCategoria] = useState<Marca>({
        id: 0,
        nome: "",
    });


    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        console.log({ name, value });
        setCarro({ ...carro, [name]: value });
    }
    function deletar(event: any) {
        carro.status = "Inativo";
        axios.post(`${BASE_URL}/carros`, carro).then((response) => {
            history("/");
            alert("CARRO INATIVADO COM SUCESSO");
            window.location.reload();
        })
    }


    function onSubmitAltera(event: { preventDefault: () => void; }) {
        event.preventDefault();

        axios.post(`${BASE_URL}/carros`, carro)
            .then((response) => {
                alert("CARRO ALTERADO COM SUCESSO");
                history("/");
                window.location.reload();
            });


    }

    const [todasCategorias, setTodasCategorias] = useState<TodasCategoria>({ ids: [], nomes: [] });

    useEffect(() => {
        axios.get(`${BASE_URL}/marcas`)
            .then(response => {

                const data = response.data as Marca[];
                const meusnomes = data.map(x => x.nome);
                const meusids = data.map(x => x.id);
                setTodasCategorias({ ids: meusids, nomes: meusnomes });

                console.log(response.data);
                console.log(todasCategorias);
                console.log("rodouu");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function acha(event: { preventDefault: () => void; target: { name: any; value: any; }; }) {
        event.preventDefault();
        const { name, value } = event.target;
        console.log({ name, value });
        console.log("adsasdsds");
        setCategoria({ ...categoria, [name]: value });
        axios.get(`${BASE_URL}/marcas/${value}`)
            .then((response) => {
                const data = response.data as Marca;
                console.log({ data });
                setCarro({ ...carro, [name]: data });
            });
    }



    return (
        <>
            <div className="my-5">
                <h3 className="text-center">Edite este Carro</h3>
                <div className="card">
                    <li className="d-flex justify-content-between lh-sm list-group-item py-3">
                        <div className="col text-center ">
                            <h5>ID: {carro.id}</h5>
                        </div>
                    </li>
                    <li className="d-flex justify-content-between lh-sm list-group-item py-3">
                        <div className="col">
                            <h5>Nome:</h5>
                            <input placeholder={carro.nome} className="form-control" type="text" id="nome" name="nome" onChange={onChange}></input>
                        </div>
                        <div className="col">
                            <h5>Marca:</h5>
                            <select name="marca" className="form-select mx-2" aria-label="Default select example" onChange={acha}>
                                <option >Selecione</option>
                                {todasCategorias.ids.map(x => (
                                    <option key={"marca" + x} value={x}>{todasCategorias.nomes[x - 1]}</option>
                                ))}
                            </select>
                        </div>
                    </li>
                    <li className="d-flex justify-content-between lh-sm list-group-item py-3">
                        <div className="col">
                            <h5>Preço </h5>
                            <input placeholder={carro.preço.toString()} className="form-control" type="number" id="quantidademin" name="quantidademin" onChange={onChange} />
                        </div>
                        <div className="col">
                            <h5>Status:</h5>
                            <input placeholder={carro.status} className="form-control mx-2" type="text" id="status" name="status" onChange={onChange} />
                        </div>

                    </li>
                    <li className="d-flex justify-content-between lh-sm list-group-item py-3 text-center">
                        <div className="col">
                            <button type="button" className="btn btn-warning" onClick={onSubmitAltera}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-exclamation" viewBox="0 0 16 16">
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z" />
                                </svg>
                                Alterar
                            </button>
                        </div>
                        <div className="col">
                            <button type="submit" value={2} onClick={onSubmit} className="btn btn-success btn-lg">Voltar</button>

                        </div>
                        <div className="col">
                            <button type="submit" onClick={deletar} className="btn btn-danger btn-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                                Excluir
                            </button>
                        </div>
                    </li>
                    <li className="d-flex justify-content-between lh-sm list-group-item py-3 text-center">

                    </li>


                </div>
            </div>
        </>
    );
}

export default VisualizarProduto;