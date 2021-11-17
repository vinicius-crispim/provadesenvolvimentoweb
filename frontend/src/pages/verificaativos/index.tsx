import VerificaAtivos from 'components/VerificaAtivos';

const VerificaAtivosTela = () => {

    return (
        <>
            <div className="container">
            <h2 className="display-3 text-center">Essa é a lista dos carros ativos</h2>

                <VerificaAtivos />
            </div>
        </>
    );
}

export default VerificaAtivosTela;