import { useState } from "react";
import logo from "../assets/logo-censo.jpg"
import { loginRequest } from "../Services/LoginService";

function Login() {
  const [doc, setDoc] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginRequest(doc, password); // 👈 uso del método separado
      console.log("Respuesta del servidor:", data);

      // Ejemplo: guardar token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data);
      
      alert("Login exitoso");
    } catch (error) {
      console.log('error : ' + error);
      alert("Credenciales inválidas");
    }
  };

  return (
    <div className="container" style={{height:"100vh"}}>
      <div className="row h-100">
        <div className="col-md-4"></div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <div className="bg-light p-4 rounded-3 text-center">
            <img src={logo} alt="Logo" style={{height:"8rem"}}/>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="text" className="form-label">Documento de identidad</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="XXXXXXXX"
                  value={doc}
                  onChange={(e) => setDoc(e.target.value)}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <br />
              <button type="submit" className="btn btn-purple" >
                Entrar
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
      
    </div>
  );
}

export default Login;
