import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

async function loginRequest(doc, password) {
  try {
    const response = await axios.post(
       apiUrl + "/login",
      {
        dni: doc,
        pass: password
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      }
    );

    // En axios, la respuesta ya viene parseada en response.data
    return response.data;

  } catch (error) {
    console.error("Error:", error);

    // Manejo de error más claro
    if (error.response) {
      // El servidor respondió con un status != 2xx
      throw new Error(error.response.data?.message || "Error en la autenticación");
    } else {
      // Error de red u otro problema
      throw new Error("No se pudo conectar con el servidor");
    }
  }
}

export { loginRequest };
