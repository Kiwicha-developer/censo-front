import { useEffect, useState } from "react";
import { deleteCenso, getCensosByDateAndUser } from "../Services/CensoService";
import moment from "moment";
import Loader from "../Components/Dynamic/Loader";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function Censos() {
  const [censos,setCensos] = useState([]);
  // const [dynamicCenso,setDynamicCenso] = useState({

  // });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const [startDate,setStartDate] = useState(moment().startOf('month').format('YYYY-MM-DD'));
  const [endDate,setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [docUser,setDocUser] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
    }
    if (name === "endDate") {
      setEndDate(value);
    }
    
    fetchCensos();
  };

  const findWhitUser = () => {
    fetchCensos();
  }

  const trashCenso = async (id) => {
    try {
      const data = await deleteCenso(id);
      
      alert(data.message);
    } catch (error) {
      console.error(error);
      setError("Error al eliminar censo");
    } finally {
      fetchCensos();
    }
  }


  const fetchCensos = async () => {
    try {
      const data = await getCensosByDateAndUser(moment(startDate).format('DD-MM-YYYY'),moment(endDate).format('DD-MM-YYYY'), docUser);
      setCensos(data);
    } catch (error) {
      console.error(error);
      setError("Error al cargar censos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchCensos(); // pásalos como parámetros
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
            Censos
          </h2>
          <div className="d-block">
            <div className="row">
              <div className="col-12 col-md-4">
                <label htmlFor="">Usuario</label>
                <input type="text" className="form-control" style={{width:"9rem"}} value={docUser} name="docUser" onChange={(e) => setDocUser(e.target.value)} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      findWhitUser();
                    }
                  }}/>
              </div>
              <div className="col-12 col-md-4">
                <label htmlFor="">Desde</label>
                <input type="date" className="form-control" style={{width:"9rem"}} value={startDate} max={endDate} name="startDate" onChange={handleChange} />
              </div>
              <div className="col-12 col-md-4">
                <label htmlFor="">Hasta</label>
                <input type="date" className="form-control" style={{width:"9rem"}} value={endDate} min={startDate} name="endDate" onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="flex-grow-1 overflow-auto mt-3 align-self-stretch">
        <table className="table table-striped table-hover mb-0">
          <thead className="table-light sticky-top ">
            <tr>
              <th className="secondary-text">Nombre</th>
              <th className="secondary-text">Documento</th>
              <th className="secondary-text">Estudios</th>
              <th className="secondary-text">Estado Civil</th>
              <th className="secondary-text">Sexo</th>
              <th className="secondary-text">Ocupacion</th>
              <th className="secondary-text">Ingresos</th>
              <th className="secondary-text">Fecha Nacimiento</th>
              <th className="secondary-text">Idioma</th>
              <th className="secondary-text">Origen</th>
              <th className="secondary-text">Creacion</th>
              <th className="secondary-text"><i className="bi bi-gear-fill"></i></th>
            </tr>
          </thead>
          <tbody>
            {censos.map((c, i) => (
              <tr key={c.id ?? i}>
                <td className="text-secondary">{c.nombres}</td>
                <td className="text-secondary">{c.doc}</td>
                <td className="text-secondary">{c.estudios}</td>
                <td className="text-secondary">{c.estadoCivil}</td>
                <td className="text-secondary">{c.sexo}</td>
                <td className="text-secondary">{c.ocupacion}</td>
                <td className="text-secondary">{c.ingresos}</td>
                <td className="text-secondary">{c.fechaNam}</td>
                <td className="text-secondary">{c.idioma}</td>
                <td className="text-secondary">{c.origen}</td>
                <td className="text-secondary">{c.fechaCreacion}</td>
                <td className="text-secondary"><i className="bi bi-trash-fill text-hover" onClick={() => trashCenso(c.id)}></i></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
    </>
  );
}

export default Censos;