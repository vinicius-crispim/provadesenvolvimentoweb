import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Marca } from "types/produto";
import { BASE_URL } from "utils/request";


const CadastroMarca = () => {

    const [marca, setMarca] = useState<Marca>({
        id: 0,
        nome: "",
    });

    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        console.log({ name, value });
        setMarca({ ...marca, [name]: value });
    }
    const navegador = useNavigate();

    function onSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        axios.post(`${BASE_URL}/marcas`, marca)
            .then((response) => {
                alert("Marca cadastrada com sucesso")
                navegador("/")
            });
    }

    return (
        <>
            <div className="container" >

                <form onSubmit={onSubmit} >

                    <div className="mx-5">
                        <div className="row py-1 mx-5 px-5 h-100">

                            <div className="">
                            <div className="mx-4 px-5 col">
                                <div className="promotion-form__group">
                                    <label className="mx-5" htmlFor="nome">Nome da Marca:</label>
                                    <input className="form-control mx-5 md-2" type="text" id="nome" name="nome" onChange={onChange} required />
                                </div>
                            </div>
                            </div>
                            <div className="cols">

                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-3 col-2 mx-auto">
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

export default CadastroMarca;