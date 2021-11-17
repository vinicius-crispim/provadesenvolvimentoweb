/* eslint-disable jsx-a11y/anchor-is-valid */
// <span className="fs-4"><img src={logoNAVBAR} alt="Facebuy" width="120" /></span>
const NavBar = () => {
    /* <a href="/home" className="d-flex align-items-center text-dark text-decoration-none">
     <span className="fs-4"><img src={logoNAVBAR} alt="Facebuy" width="120" /></span>
 </a>*/

    return (
        <div className="container py-3">
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">


                    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <a className="me-3 py-2 text-dark text-decoration-none" href="/">Home</a>
                    </nav>
                </div>

            </header>
        </div>
    );
}
export default NavBar;
