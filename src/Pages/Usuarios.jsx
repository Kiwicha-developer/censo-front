import { useEffect, useState } from "react";
import { allUsers, saveUser, updatePass, updateUser } from "../Services/UsuariosService";
import Loader from "../Components/Dynamic/Loader";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";

function Usuarios() {
  const [users, setUsers] = useState([]);
  const [dinamicUser,setDinamicUser] = useState({
    id: null,
    dni: null,
    nombre: null,
    rol: "usuario",
    activo: false
  });
  const [createModal, setCreateModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const viewNewUser =() => {
    setDinamicUser({
      id:null,
      dni: "",
      nombre: "",
      rol: "usuario",
      activo: true
    });
    setCreateModal(true);
    openUserModal();
  }

  const viewwUser =(user) => {
    setDinamicUser({
      id: user.id,
      dni: user.dni,
      nombre: user.nombre,
      rol: user.rol,
      activo: user.activo
    });
    setCreateModal(false);
    openUserModal();
  }

  const viewRestorePass = (user) => {
    setDinamicUser({
      id: user.id,
      dni: user.dni,
      nombre: user.nombre,
      rol: "",
      activo: user.activo
    });

    openReestoreModal();
  }

  const openUserModal = () => {
    const modalElement = document.getElementById("userModal");
    const modalInstance = Modal.getOrCreateInstance(modalElement);
    modalInstance.show();
  };
  const closeUserModal = () => {
    const btnClose = document.getElementById("btn-user-modal-close");
    btnClose.click();
  }

  const openReestoreModal = () => {
    const modalElement = document.getElementById("reestoreModal");
    const modalInstance = Modal.getOrCreateInstance(modalElement);
    modalInstance.show();
  };
  const closeReestoreModal = () => {
    const btnClose = document.getElementById("btn-reestore-modal-close");
    btnClose.click();
  }

  const resstorePassword = async () => {
    try {
      const user = await updatePass(dinamicUser);

      if (!user) {
        alert("Error al actualizar contraseña");
        return;
      }

      closeReestoreModal();
      alert(`Contraseña de usuario ${user.nombre ?? ""} reestablecida exitosamente`);
      fetchUsers();
    } catch (error) {
      alert("No se pudo reestablecer contraseña: " + error.message);
      console.error("Error en updatePass:", error);
    }
  };

  const createUser = async () => {
    try {
      const user = await saveUser(dinamicUser);

      if (!user) {
        alert("Error al crear usuario");
        return;
      }

      closeUserModal();
      alert(`Usuario ${user.nombre ?? ""} creado exitosamente`);
      fetchUsers();
    } catch (error) {
      alert("No se pudo crear el usuario: " + error.message);
      console.error("Error en createUser:", error);
    }
  };

  const updateDinamicUser = async () => {
    try {
      const user = await updateUser(dinamicUser);

      if (!user) {
        alert("Error al actualizar usuario");
        return;
      }

      closeUserModal();
      alert(`Usuario ${user.nombre ?? ""} actualizado exitosamente`);
      fetchUsers();
    } catch (error) {
      alert("No se pudo actualizar el usuario: " + error.message);
      console.error("Error en updateUser:", error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    setDinamicUser((prev) => ({
      ...prev,
      [name]: name === "activo" ? value === "true" : value
    }));
  };

  const fetchUsers = async () => {
    try {
      const data = await allUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
                <td className="text-secondary">
                  <i className="bi bi-pencil-fill text-hover" onClick={() => viewwUser(u)} title="Editar"></i>
                  &nbsp;
                  <i className="bi bi-arrow-counterclockwise text-hover" onClick={() => viewRestorePass(u)} title="Reestabecer contraseña"></i>
                </td>
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
            <h5 className="modal-title" id="userModalLabel">{createModal ? "Nuevo Usuario" : "Editar Usuario"}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-12 mb-2">
                <label htmlFor="">Nombre</label>
                <input type="text" value={dinamicUser.nombre} name="nombre" className="form-control" onChange={handleChange}/>
              </div>
              <div className="col-12 mb-2">
                <label htmlFor="">Documento</label>
                <input type="text" value={dinamicUser.dni} name="dni" className="form-control" onChange={handleChange}/>
              </div>
              <div className="col-6">
                <label htmlFor="">Rol</label>
                <input type="text" value={dinamicUser.rol} className="form-control" readOnly/>
              </div>
              <div className="col-6">
                <label htmlFor="">Estado</label>
                <select className="form-select" value={dinamicUser.activo ? "true" : "false"} name="activo" onChange={handleChange}>
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer border-top-0">
            <button type="button" id="btn-user-modal-close" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal"><i className="bi bi-x-lg"></i> Cerrar</button>
            {createModal ? 
            <button type="button" className="btn btn-purple rounded-pill" onClick={() => createUser()}><i className="bi bi-floppy-fill"></i> Registrar</button> :
            <button type="button" className="btn btn-purple rounded-pill" onClick={() => updateDinamicUser()}><i className="bi bi-floppy-fill"></i> Guardar</button>
            }
          </div>
        </div>
      </div>
    </div>



    <div className="modal fade" id="reestoreModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header border-bottom-0">
            <h5 className="modal-title" id="exampleModalLabel">{dinamicUser.nombre}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-12">
                <label htmlFor="">Nueva contraseña</label>
                <input type="password" name="pass" onChange={handleChange} className="form-control"/>
              </div>
            </div>
          </div>
          <div className="modal-footer border-top-0">
            <button type="button" id="btn-reestore-modal-close" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal"><i className="bi bi-x-lg"></i> Cerrar</button>
            <button type="button" className="btn btn-purple rounded-pill" onClick={() => resstorePassword()}><i className="bi bi-arrow-counterclockwise" ></i> Reestablecer</button>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}

export default Usuarios;
