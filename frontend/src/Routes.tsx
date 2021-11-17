
import Pesquisa from "components/Pesquisa";
import CadastroCarroTela from "pages/cadastrocarro";
import CadastroMarcatela from "pages/cadastromarca";
import EstoqueTela from "pages/estoque";
import HomeTela from "pages/hometela";
import VerificaAtivosTela from "pages/verificaativos";
import VerificaPorMarcaTela from "pages/verificapormarca";
import VerificaCarroTela from "pages/visualizacarro";
import { Route, Routes } from "react-router";
import VerificaPorNomeTela from './pages/verificapornome/index';

const RoutesTelas = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeTela/>} />
            <Route path="/estoque" element={<EstoqueTela/>} />
            <Route path="/cadastromarca" element={<CadastroMarcatela/>} />
            <Route path="/cadastrocarro" element={<CadastroCarroTela/>} />
            <Route path="/verificaativos" element={<VerificaAtivosTela/>} />
            <Route path="/verificanome" element={<VerificaPorNomeTela/>} />
            <Route path="/verificamarca" element={<VerificaPorMarcaTela/>} />
            <Route path="/verificacarro" element={<VerificaCarroTela/>} />
            <Route path="/pesquisa" element={<Pesquisa/>} />
        </Routes>
    );
}

export default RoutesTelas;