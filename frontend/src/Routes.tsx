
import EstoqueTela from "pages/estoque";
import HomeTela from "pages/hometela";
import { Route, Routes } from "react-router";

const RoutesTelas = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeTela/>} />
            <Route path="/estoque" element={<EstoqueTela/>} />
        </Routes>
    );
}

export default RoutesTelas;