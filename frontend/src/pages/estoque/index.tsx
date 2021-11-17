import EstoqueTable from '../../components/EstoqueTable/index';

const EstoqueTela = () => {

    return (
        <>
            <div className="container">
                <h2 className="display-3 text-center">Essa é a lista de todos os carros</h2>

                <EstoqueTable />
            </div>
        </>
    );
}

export default EstoqueTela;