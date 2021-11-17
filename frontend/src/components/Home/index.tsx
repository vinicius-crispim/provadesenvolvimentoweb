import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // version 5.2.0
import { Carro, Marca } from 'types/produto';
import { BASE_URL } from 'utils/request';
type TodosCarros = {
    todoscarros: Carro[];
    quantia: number[]
}


type TodasCategoria = {
    ids: number[],
    nomes: string[],
}

const Home = () => {
    const [carros, setCarros] = useState<TodosCarros>({ todoscarros: [], quantia: [] })
    const [carro, setCarro] = useState<Carro>({ id: 0, marca: { id: 0, nome: "" }, nome: "", preço: 0, status: "" })
    const navegador = useNavigate();
    const [todasCategorias, setTodasCategorias] = useState<TodasCategoria>({ ids: [], nomes: [] });
    const [marca, setMarca] = useState<Marca>({
        id: 0,
        nome: "",
    });
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
        setMarca({ ...marca, [name]: value });
        axios.get(`${BASE_URL}/carros/buscapormarca/${value}`)
            .then((response) => {
                const data = response.data as Carro[];
                console.log(data)
                carros.todoscarros = data;
                for (let index = 0; index < data.length; index++) {
                    carros.quantia.push(index);
                }
                localStorage.removeItem("carropormarca");
                localStorage.setItem('carropormarca', JSON.stringify(carros));

                let bemvindo = JSON.parse(localStorage.getItem('carropormarca') || '{}');
                console.log(bemvindo)
            });
    }

    function onSubmitAdd() {
        axios.get(`${BASE_URL}/carros`)
            .then(response => {

                const data = response.data as Carro[];
                console.log(data)
                carros.todoscarros = data;
                for (let index = 0; index < data.length; index++) {
                    carros.quantia.push(index);
                }
                localStorage.removeItem("carro");
                localStorage.setItem('carro', JSON.stringify(carros));

                let bemvindo = JSON.parse(localStorage.getItem('carro') || '{}');
                console.log(bemvindo)
                navegador("/estoque")
                window.location.reload();
            })

    }
    function VerificaInativos() {
        axios.get(`${BASE_URL}/carros/ativo`)
            .then(response => {

                const data = response.data as Carro[];
                console.log(data)
                carros.todoscarros = data;
                for (let index = 0; index < data.length; index++) {
                    carros.quantia.push(index);
                }
                localStorage.removeItem("carro");
                localStorage.setItem('carro', JSON.stringify(carros));

                let bemvindo = JSON.parse(localStorage.getItem('carro') || '{}');
                console.log(bemvindo)
                navegador("/verificaativos")
                window.location.reload();
            })

    }
    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        carro.nome = value;
        console.log(carros);
    }
    function VerificaPorNome() {
        axios.get(`${BASE_URL}/carros/buscapornome/${carro.nome}`)
            .then(response => {

                const data = response.data as Carro[];
                console.log(data)
                carros.todoscarros = data;
                for (let index = 0; index < data.length; index++) {
                    carros.quantia.push(index);
                }
                localStorage.removeItem("carro");
                localStorage.setItem('carro', JSON.stringify(carros));

                let bemvindo = JSON.parse(localStorage.getItem('carro') || '{}');
                console.log(bemvindo)
                navegador("/verificanome")
                window.location.reload();
            })

    }
    function VerificaMarca() {
        axios.get(`${BASE_URL}/carros/buscapormarca/${marca.id}`)
            .then(response => {

                let bemvindo = JSON.parse(localStorage.getItem('carropormarca') || '{}');
                console.log(bemvindo)
                navegador("/verificamarca")
                window.location.reload();
            })

    }

    return (
        <>
            <div className="jumbotron">
                <h1 className="display-4 text-center">PROVA CARROS</h1>
                <p className="lead text-center">Projeto desenvolvido para prova de densenvolvimento web</p>
            </div>
            <li className="d-flex justify-content-between lh-sm  py-3 text-center">
                <div className="col my-3">
                    <button type="submit" className="btn btn-success btn-lg" onClick={onSubmitAdd}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        Ver estoque
                    </button>
                </div>
                <div className="col my-3">
                    <button type="submit" className="btn btn-success btn-lg" onClick={VerificaInativos}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        Ver Inativo
                    </button>
                </div>
                <div className="col">
                    <label className="" htmlFor="nome">Nome do Carro:</label>
                    <input className="form-control mx-5 md-2 my-1" type="text" id="nome" name="nome" onChange={onChange} required />

                    <button type="submit" className="btn btn-success btn-lg my-2" onClick={VerificaPorNome}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        Buscar por Nome
                    </button>
                </div>

            </li>
                <label htmlFor="Marca" >Marca:</label>
                <select name="Marca" className="form-select" aria-label="Default select example" onChange={acha}>
                    <option>Selecione</option>
                    {todasCategorias.ids.map(x => (
                        <option key={"Marca" + x} value={x}>{todasCategorias.nomes[x - 1]}</option>
                    ))}
                </select>
                <button type="submit" className="btn btn-success btn-lg my-2" onClick={VerificaMarca}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    Buscar por Marca
                </button>


        </>
    );
}

export default Home;