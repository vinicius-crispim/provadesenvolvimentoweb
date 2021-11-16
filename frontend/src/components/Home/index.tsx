import { useNavigate } from 'react-router-dom'; // version 5.2.0

const Home = () => {
    const navegador = useNavigate();
    function onSubmitAdd() {
        navegador("/estoque")
        window.location.reload();
    }
    return (
        <>
            <div className="jumbotron">
                <h1 className="display-4 text-center">TESTE PROVA</h1>
                <p className="lead">deixando um pouco pronto para proba</p>
            </div>
            <li className="d-flex justify-content-between lh-sm  py-3 text-center">
                <div className="col">
                    <button type="submit" className="btn btn-success btn-lg" onClick={onSubmitAdd}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        Ver estoque
                    </button>
                </div>

            </li>
        </>
    );
}

export default Home;