import CadastroCarro from 'components/CadastroCarro';

const CadastroCarroTela = () => {

    return (
        <>
            <div className="container">
                <h2 className="display-3 text-center">Cadastre um novo carro</h2>
                <div className="my-3"></div>
                <CadastroCarro />
            </div>
        </>
    );
}

export default CadastroCarroTela;