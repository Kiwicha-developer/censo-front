import api from "../Config/Axios";
async function allUsers() {
    try {
    const response = await api.get("/user/all");

    return response.data;

  } catch (error) {
    console.error("Error:", error);
      throw new Error("No se pudo conectar con el servidor");
  }
}

async function saveUser(user) {
    try {
    const response = await api.post("/user/create", {
      dni: user.dni,
      nombre: user.nombre,
      pass: "123456"
    });

    return response.data;

  } catch (error) {
    if (error.response) {
      // El servidor respondió con un status fuera del rango 2xx
      const status = error.response.status;

      switch (status) {
        case 400:
          throw new Error("Solicitud inválida. Verifica los datos enviados.");
        case 401:
          throw new Error("No autorizado. Revisa tus credenciales.");
        case 403:
          throw new Error("Acceso denegado.");
        case 409:
          throw new Error("Usuario ya esta registrado");
        case 500:
          throw new Error("Error interno del servidor.");
        default:
          throw new Error(`Error inesperado (${status}).`);
      }
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      throw new Error("Error al configurar la solicitud.");
    }
  }
}

async function updateUser(user) {
    try {
    const response = await api.post("/user/update", {
      id: user.id,
      nombre: user.nombre,
      activo: user.activo
    });

    return response.data;

  } catch (error) {
    if (error.response) {
      // El servidor respondió con un status fuera del rango 2xx
      const status = error.response.status;

      switch (status) {
        case 400:
          throw new Error("Usuario no encontrado.");
        case 401:
          throw new Error("No autorizado. Revisa tus credenciales.");
        case 403:
          throw new Error("Acceso denegado.");
        case 500:
          throw new Error("Error interno del servidor.");
        default:
          throw new Error(`Error inesperado (${status}).`);
      }
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      throw new Error("Error al configurar la solicitud.");
    }
  }
}


async function updatePass(user) {
    try {
    const response = await api.post("/user/resetpass", {
      id: user.id,
      pass: user.pass
    });

    return response.data;

  } catch (error) {
    if (error.response) {
      // El servidor respondió con un status fuera del rango 2xx
      const status = error.response.status;

      switch (status) {
        case 400:
          throw new Error("Usuario no encontrado.");
        case 401:
          throw new Error("No autorizado. Revisa tus credenciales.");
        case 403:
          throw new Error("Acceso denegado.");
        case 500:
          throw new Error("Error interno del servidor.");
        default:
          throw new Error(`Error inesperado (${status}).`);
      }
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      throw new Error("Error al configurar la solicitud.");
    }
  }
}

export {allUsers,saveUser,updateUser,updatePass};