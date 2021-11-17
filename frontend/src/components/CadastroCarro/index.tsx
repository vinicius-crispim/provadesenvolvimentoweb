import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Marca, Carro } from "types/produto";
import { BASE_URL } from "utils/request";
import "bootstrap-icons/font/bootstrap-icons.css";

type TodasCategoria = {
    ids: number[],
    nomes: string[],
}

const CadastroCarro = () => {


    const [values, setValues] = useState<Carro>({
        id: 0,
        nome: "",
        preço:0,
        status:"",
        marca: {
            id: 0,
            nome: "",
        }
    });

    const [marca, setMarca] = useState<Marca>({
        id: 0,
        nome: "",
    });

    console.log(values);

    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        console.log({ name, value });
        setValues({ ...values, [name]: value });
    }
    const navegador = useNavigate();

    function onSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        values.status="Ativo"
        axios.post(`${BASE_URL}/carros`, values)
            .then((response) => {
                alert("carro cadastrado com sucesso")
                navegador("/")
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
        setMarca({ ...marca, [name]: value });
        axios.get(`${BASE_URL}/marcas/${value}`)
            .then((response) => {
                const data = response.data as Marca;
                console.log({ data });
                values.marca = data
            });
    }

    return (
        <>
            <div className="container" >

                <form onSubmit={onSubmit} >
                    <div className="row py-1">
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="nome">Nome:</label>
                                <input className="form-control" type="text" id="nome" name="nome" onChange={onChange} required />
                            </div>
                        </div>

                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="Marca" >Marca:</label>
                                <select name="Marca" className="form-select" aria-label="Default select example" onChange={acha}>
                                    <option>Selecione</option>
                                    {todasCategorias.ids.map(x => (
                                        <option key={"Marca" + x} value={x}>{todasCategorias.nomes[x - 1]}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row py-3">
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="preço">Preço:</label>
                                <input className="form-control" type="number" id="preço" name="preço" onChange={onChange} required />
                            </div>
                        </div>
                    </div>
                    <div className=" col-2 mx-auto">
                        <button type="submit" className="btn btn-success btn-lg my-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                            </svg>
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CadastroCarro;