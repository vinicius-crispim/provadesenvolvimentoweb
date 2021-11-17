
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // version 5.2.0
import { Carro, Marca } from 'types/produto';
import { BASE_URL } from 'utils/request';
type TodosCarros = {
    todoscarros: Carro[];
    quantia: number[]
}
type PesquisaTodosCarros = {
    todoscarros: Carro[];
}

type TodasCategoria = {
    ids: number[],
    nomes: string[],
}

const Pesquisa = () => {
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
    let marcaid: number = 0;
    const [carrosFim, setCarrosFim] = useState<PesquisaTodosCarros>({ todoscarros: [] })
    const [carrosvalida1, setCarrosvalida1] = useState<PesquisaTodosCarros>({ todoscarros: [] })
    const [carrosvalida2, setCarrosvalida2] = useState<PesquisaTodosCarros>({ todoscarros: [] })
    const [carrosvalida3, setCarrosvalida3] = useState<PesquisaTodosCarros>({ todoscarros: [] })
    function acha() {
        axios.get(`${BASE_URL}/carros/buscapormarca/${marcaid}`)
            .then((response) => {
                const data = response.data as Carro[];
                console.log(data)
                carros.todoscarros = data;
                for (let index = 0; index < data.length; index++) {
                    carros.quantia.push(index);
                    carrosvalida1.todoscarros.push(data[index])
                    carrosFim.todoscarros.push(data[index])

                }
                console.log("marca")

                console.log(carrosvalida1.todoscarros)

            });
    }
    let status: number = 0;
    function achastatus(event: { preventDefault: () => void; target: { name: any; value: any; }; }) {
        event.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        status === event.target.value
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
                    carrosvalida2.todoscarros.push(data[index])
                    carrosFim.todoscarros.push(data[index])

                }
                console.log("ATIVO")
                console.log(carrosvalida2.todoscarros)

            })

    }
    function onChangeStatus(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        status = value;
        console.log(carros);
    }
    let nome: string = "";
    function onChangenome(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        nome = value;
        console.log(carros);
    }
    function onChangeMarcaid(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        marcaid = value;
        console.log(carros);
    }
    function VerificaPorNome() {
        axios.get(`${BASE_URL}/carros/buscapornome/${nome}`)
            .then(response => {

                const data = response.data as Carro[];
                console.log(data)
                carros.todoscarros = data;
                for (let index = 0; index < data.length; index++) {
                    carros.quantia.push(index);
                    carrosvalida3.todoscarros.push(data[index])
                    carrosFim.todoscarros.push(data[index])
                }
                console.log("NOME")
                console.log(carrosvalida3.todoscarros)
            })

    }
    const [fimteste,setFimteste]= useState<PesquisaTodosCarros>({todoscarros:[]})
    function pesquisafinal() {
        console.log(status)
        if (nome !== "") {
            VerificaPorNome()
        } if (status !== 2) {
            console.log("DEUUU")
            VerificaInativos()
        } if (marcaid !== 1) {
            acha()
        }
    
        console.log("PREFIM")
        console.log(carrosFim)
        let number: number;
        console.log(carrosFim.todoscarros.length)
        for (let index = 0; index < 5; index++) {
            for (let index2 = 0; index2 < 5; index2++) {
                if (carrosFim.todoscarros[index].nome === carrosFim.todoscarros[index2].nome) {
                    for (let index3 = 0; index3 < 5; index3++) {
                        if(carrosFim.todoscarros[index3].nome === carrosFim.todoscarros[index2].nome){
                            fimteste.todoscarros.push(carrosFim.todoscarros[index3])
                            console.log("FIM TESTE");
                            console.log(fimteste);
                        }

                    }
                }

            }
            console.log("FIM TESTE");
            console.log(fimteste);
        }
        /*localStorage.removeItem("carro");
        localStorage.setItem('carro', JSON.stringify(carrosFim.todoscarros));
        let bemvindo = JSON.parse(localStorage.getItem('carro') || '{}');
        console.log("Teste")
         console.log(bemvindo)*/
    }

    return (
        <><div className="container">
            <div className="jumbotron">
                <h1 className="display-4 text-center">TESTE PROVA</h1>
            </div>
            <li className="d-flex justify-content-between lh-sm  py-3 text-center">
                <div className="col">
                    <label className="mx-2" htmlFor="nome">Nome do Carro:</label>
                    <input className="form-control md-2 my-2" type="text" id="nome" name="nome" onChange={onChangenome} required />
                </div>

            </li>
            <div className="promotion-form__group">
                <label htmlFor="Marca" >Marca:</label>
                <select name="Marca" className="form-select" aria-label="Default select example" onChange={onChangeMarcaid}>
                    <option value="nd">Selecione</option>
                    {todasCategorias.ids.map(x => (
                        <option key={"Marca" + x} value={x}>{todasCategorias.nomes[x - 1]}</option>
                    ))}
                </select>
            </div>

            <li className="d-flex justify-content-between lh-sm  py-3 text-center">

                <div className="col">
                    <select name="Marca" className="form-select" aria-label="Default select example" onChange={achastatus}>
                        <option value="1">Ativo</option>
                        <option value="2">Inativo</option>
                    </select>
                </div>
            </li>
            <button type="submit" className="btn btn-success btn-lg" onClick={pesquisafinal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                Ver Inativo
            </button>
        </div>
        </>
    );
}
export default Pesquisa