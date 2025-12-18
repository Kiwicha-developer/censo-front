import api from "../Config/Axios";

async function getCensosByDateAndUser(startDate,endDate,docUser) {
    try {
        
        const response =  await api.get("/persona/bydate",{
            params : {
                startdate: startDate,
                enddate: endDate,
                docuser: docUser == null ? "" : docUser,
            }
        });

        return response.data;
    } catch (error) {
        console.log("Error : " , error)
        throw new Error("No se pudo conectar con el servidor");
    }
}

async function deleteCenso(id) {
    try {
        
        const response =  await api.delete("/persona/delete",{
            params : {
                id,
            }
        });

        return response.data;
    } catch (error) {
        console.log("Error : " , error)
        throw new Error("No se pudo conectar con el servidor");
    }
}

export {getCensosByDateAndUser,deleteCenso}