import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "utils/request";
import { useNavigate } from 'react-router-dom'; // version 5.2.0
import { Carro } from "types/produto";

type TodosCarros = {
    todoscarros: Carro[];
    quantia: number[]
}
let carrostorage = JSON.parse(localStorage.getItem('carro') || '{}');
const VerificaAtivos = () => {

    const navegador = useNavigate();
    const [carros, setCarros] = useState<TodosCarros>(carrostorage)

    const [carro, setcarro] = useState<Carro>({ id: 0, marca: { id: 0, nome: "" }, nome: "", preço: 0, status: "" })

    function onSubmit(event: any) {
        event.preventDefault();
        const { name, value } = event.target
        axios.get(`${BASE_URL}/carros/${value}`).then(response => {
            const data = response.data as Carro;
            console.log("FOI");
            console.log(data);
            setcarro(data);
            localStorage.removeItem("carro");
            localStorage.setItem('carro', JSON.stringify(data));
            navegador("/visualizaproduto")
            window.location.reload();
        })
    }
    console.log("TESTE")
    console.log(carros)
    function onSubmitAdd(event: any) {
        event.preventDefault();
        navegador("/cadastrocarro")
    }
    function onSubmitCate(event: any) {
        event.preventDefault();
        navegador("/cadastromarca")
    }

    return (
        <>

            <div className="table-responsive">
                <table className="table table-light table-md table-hover align-middle caption-top">
                    <caption>Lista de Produtos</caption>
                    <thead>
                        <tr>
                            <th className="text-center text-primary">Nome</th>
                            <th className="text-center text-primary">Categoria</th>
                            <th className="text-center text-primary">Preço</th>
                            <th className="text-center text-primary">Status:</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {carros.quantia.map(x => (
                        <tr key={carros.todoscarros[x].id}>
                            <td className="text-center">{carros.todoscarros[x].nome}</td>
                            <td className="text-center">{carros.todoscarros[x].marca.nome}</td>
                            <td className="text-center">{carros.todoscarros[x].preço}</td>
                            <td className="text-center">{carros.todoscarros[x].status}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <li className="d-flex justify-content-between lh-sm py-3 text-center">
                <div className="col">
                    <button type="submit" className="btn btn-success btn-lg" onClick={onSubmitAdd}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        Adicionar Carro
                    </button>
                </div>
                <div className="col">
                    <button type="submit" className="btn btn-success btn-lg" onClick={onSubmitCate}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        Adicionar Categoria
                    </button>
                </div>
            </li>

        </>
    );
}

export default VerificaAtivos;