import { useEffect, useState } from "react";
import { allUsers } from "../Services/UsuariosService";
import Loader from "../Components/Dynamic/Loader";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";

function Usuarios() {
  const [users, setUsers] = useState([]);
  const [dinamicUser,setDinamicUser] = useState({
    dni: null,
    nombre: null,
    rol: "usuario",
    activo: false
  });
  const [titleModal, setTitleModal] = useState("Usuario");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const viewNewUser =() => {
    setDinamicUser({
      dni: null,
      nombre: null,
      rol: "usuario",
      activo: true
    });
    setTitleModal('Nuevo Usuario');
    openUserModal();
  }

  const viewwUser =(user) => {
    setDinamicUser({
      dni: user.dni,
      nombre: user.nombre,
      rol: user.rol,
      activo: user.activo
    });
    setTitleModal('Editar Usuario');
    openUserModal();
  }

  const openUserModal = () => {
    // 👉 aquí haces tus validaciones, setState, etc.
    const modalElement = document.getElementById("userModal");
    const modalInstance = Modal.getOrCreateInstance(modalElement);
    modalInstance.show();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await allUsers();
        setUsers(data);
      } catch (err) {
        console.log(err)
        setError("Error al cargar usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <>
    <div className="d-flex flex-column h-100">

      <div className="pt-2 secondary-text">
        <div className="d-flex align-items-center justify-content-between">

          <h2 className="mb-0">
            <i className="bi bi-people-fill me-2"></i>
            Usuarios
          </h2>

          <button type="button" className="btn btn-purple rounded-pill" onClick={()=> viewNewUser()}>
            <i className="bi bi-person-fill-add"></i>
          </button>

        </div>

      </div>

      <div className="flex-grow-1 overflow-auto mt-3 align-self-stretch">
        <table className="table table-striped table-hover mb-0">
          <thead className="table-light sticky-top ">
            <tr>
              <th className="secondary-text">Nombre</th>
              <th className="secondary-text">Documento</th>
              <th className="secondary-text">Rol</th>
              <th className="secondary-text">Estado</th>
              <th className="secondary-text"><i className="bi bi-gear-fill"></i></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id ?? i}>
                <td className="text-secondary">{u.nombre}</td>
                <td className="text-secondary">{u.dni}</td>
                <td className="text-secondary">{u.rol}</td>
                <td className="text-secondary">{u.activo ? "Activo" : "Inactivo"}</td>
                <td className="text-secondary"><i className="bi bi-pencil-fill text-hover" onClick={() => viewwUser(u)}></i></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>


    <div className="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header border-bottom-0">
            <h5 className="modal-title" id="userModalLabel">{titleModal}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-12 mb-2">
                <label htmlFor="">Nombre</label>
                <input type="text" value={dinamicUser.nombre} className="form-control" />
              </div>
              <div className="col-12 mb-2">
                <label htmlFor="">Documento</label>
                <input type="text" value={dinamicUser.dni} className="form-control" />
              </div>
              <div className="col-6">
                <label htmlFor="">Rol</label>
                <input type="text" value={dinamicUser.rol} className="form-control" readOnly/>
              </div>
              <div className="col-6">
                <label htmlFor="">Estado</label>
                <select className="form-select" value={dinamicUser.activo ? "true" : "false"}>
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer border-top-0">
            <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" className="btn btn-purple rounded-pill">Guardar</button>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}

export default Usuarios;
