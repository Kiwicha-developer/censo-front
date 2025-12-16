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

export {allUsers};