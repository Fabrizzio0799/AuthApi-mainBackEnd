import { GetAccountByID, GetAccountsByCompanies, deleteAccounts, getElements, inserAccounts, updateAccounts } from "../services/accounts.services.js"


export const getAccountsByCompanies = async (req, res) => {
    try {
        const result = await GetAccountsByCompanies();
        //console.log('Result from GetAccountsByCompanies: ', result); // Registro del resultado completo

        if (result.success && Array.isArray(result.recordset) && result.recordset.length > 0) {
            //console.log('Result.recordset: ', result.recordset); // Registro del recordset

            const accounts = result.recordset.map(item => {
               // console.log('Processing item: ', item); // Registro de cada ítem procesado
                const parsedProfile = item.perfil ? JSON.parse(item.perfil) : null;
                
                return {
                    UserID: item.id,
                    FirstName: item.nombre,
                    LastName: item.apellidos,
                    Email: item.correo,
                    Status: item.status,
                    CompanyID: item.CompanyID,
                    CompanyName: item.CompanyNombre,
                    UserPerfil: parsedProfile,
                    NombreComercial: item.nombre_comercial,
                    NombreBD: item.nombre_bd,
                    TipoBD: item.tipo_bd,
                    UbicacionServidorBD: item.ubicacion_servidor_bd,
                    UbicacionServidorPresentacion: item.ubicacion_servidor_presentacion,
                    LinkPortalAcceso: item.link_portal_acceso,
                    IDUsuarioTenant: item.id_usuario_tenant,
                    ClaveUsuarioTenant: item.clave_usuario_tenant,
                    TipoLicencia: item.tipo_licencia,
                    SL: item.SL
                };
            });

            // Registro de los datos procesados
            //console.log('Processed accounts: ', accounts);

            // Responde con los datos si se encontraron cuentas
            if (accounts.length > 0) {
                res.status(200).send(accounts);
            } else {
                res.status(404).send("No accounts found");
            }
        } else {
            res.status(500).send("Error retrieving accounts");
        }
    } catch (error) {
        //console.error('Error in getAccountsByCompanies: ', error);
        res.status(400).send(error.message);
    }
};



export const getAccountByID = async (req, res) => {
    try {
        const { key } = req.params;
        const result = await GetAccountByID(key);
        if (result.success) {
            const account = result.recordset[0];
            if (account) {
                res.status(200).send(account);
            } else {
                res.status(404).send("Account not found");
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getElement = async (req, res) => {
    try {
        const { key } = req.params;
        const result = await getElements(key);
        if (result.success) {
            const Elements = result.recordset;
            if (Elements.length > 0) {
                res.status(200).send(Elements);
            } else {
                res.status(404).send("Elements not found");
            }
        } else {
            res.status(500).send("Error retrieving elements");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};


export const InsertAccounts = async (req, res) => {
    try {
        const { account } = req.body;
        //console.log("Received Account: ", account); // Verifica los datos recibidos
        const result = await inserAccounts(account);
        //console.log("Result from inserAccounts: ", result); // Verifica el resultado

        if (result.success) {
            res.status(200).send("Account inserted successfully");
        } else {
            res.status(500).send("Error inserting account: " + result.error);
        }
    } catch (error) {
        //console.error("Error in InsertAccounts: ", error);
        res.status(400).send(error.message);
    }
};



export const UpdateAccounts = async (req, res) => {
    try {
        const { account } = req.body;
        const result = await updateAccounts(account);
        if (result.success) {
            res.status(200).send("Account updated successfully");
        } else {
            res.status(500).send("Error updating account");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const DeleteAccounts = async (req, res) => {
    try {
        const { key } = req.params;
        const result = await deleteAccounts(key);
        if (result.success) {
            res.status(200).send("Account deleted successfully");
        } else {
            res.status(500).send("Error deleting account");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}