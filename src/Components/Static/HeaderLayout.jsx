import { Outlet } from "react-router-dom";
import logo from "../../assets/logo-censo.jpg";
import { useNavigate } from "react-router-dom";

export default function HeaderLayout() {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    } 

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };


  return (
    <div className="container-fluid" style={{height:"100vh"}}>
        <div className="row h-100">
            <div className="col-5 col-md-3 p-3">
                <div className="bg-white rounded-2 h-100 p-2">
                    <div className="row h-100">
                        <div className="col-12 d-flex flex-column h-100">

                            <div>
                            <img className="w-100" src={logo} alt="Logo" />

                            <ul className="list-group list-group-flush mt-3">
                                <li
                                className="list-group-item purple-hover primary-text"
                                onClick={() => navigateTo('/usuarios')}
                                >
                                <i className="bi bi-people-fill me-2"></i> Usuarios
                                </li>

                                <li
                                className="list-group-item purple-hover primary-text"
                                onClick={() => navigateTo('/censos')}
                                >
                                <i className="bi bi-clipboard-data-fill me-2"></i> Censos
                                </li>

                                <li
                                className="list-group-item purple-hover primary-text"
                                onClick={() => navigateTo('/datos')}
                                >
                                <i className="bi bi-graph-up-arrow me-2"></i> Datos
                                </li>
                            </ul>
                            </div>

                            <div
                            className="mt-auto primary-text fw-bold purple-hover p-3"
                            style={{ cursor: "pointer" }}
                            onClick={handleLogout}
                            >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Cerrar sesión
                            </div>

                        </div>
                    </div>
                </div>  
            </div>
            <div className="col-7 col-md-9 p-3">
                <div className="bg-white rounded-2 h-100 p-2">
                    <Outlet />
                </div>
            </div>
            
        </div>
    </div>
  );
}
