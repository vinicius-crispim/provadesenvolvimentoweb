import axios from "axios";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { ProdutoPage } from "types/produto";
import { BASE_URL } from "utils/request";
import { Produto } from '../../types/produto';
import { useNavigate } from 'react-router-dom'; // version 5.2.0



const EstoqueTable = () => {

    const navegador = useNavigate();

    const [activePage, setActivePage] = useState(0);

    const [page, setPage] = useState<ProdutoPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0,
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/produtos?page=${activePage}&size=5&sort=estoque,desc`)
            .then(response => {

                setPage(response.data);
            })
    }, [activePage]);

    const changePage = (index: number) => {
        setActivePage(index);
    }



    const [produtotemp, setProdutoTemp] = useState<Produto>({ descrição: "", estoque: 0, nome: "", categoria: { id: 0, nome: "" }, id: 0, quantidademin: 0 })

    function onSubmit(event: any) {
        event.preventDefault();
        const { name, value } = event.target
        axios.get(`${BASE_URL}/produtos/${value}`).then(response => {
            const data = response.data as Produto;
            console.log("FOI");
            console.log(data);
            setProdutoTemp(data);
            localStorage.removeItem("produtotemp");
            localStorage.setItem('produtotemp', JSON.stringify(data));
            navegador("/visualizaproduto")
            window.location.reload();
        })
    }

    function onSubmitAdd(event: any) {
        event.preventDefault();
        navegador("/cadastroproduto")
    }
    function onSubmitCate(event: any) {
        event.preventDefault();
        navegador("/cadastrocategoria")
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
                            <th className="text-center text-primary">Quantidade em Estoque</th>
                            <th className="text-center text-primary">Quantidade Mínimia</th>
                            <th className="text-center text-primary">Descrição</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {page.content?.map(x => (
                            <tr key={x.id}>
                                <td className="text-center">{x.nome}</td>
                                <td className="text-center">{x.categoria.nome}</td>
                                <td className="text-center">{x.estoque}</td>
                                <td className="text-center">{x.quantidademin}</td>
                                <td className="text-center">{x.descrição}</td>
                                <td className="text-center"><button type="submit" value={x.id} onClick={onSubmit} className="btn btn-outline-success btn-lg align-bottom"> Editar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination page={page} onPageChange={changePage} />
            </div>
            <li className="d-flex justify-content-between lh-sm py-3 text-center">
                <div className="col">
                    <button type="submit" className="btn btn-success btn-lg" onClick={onSubmitAdd}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        Adicionar Produto
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

export default EstoqueTable;