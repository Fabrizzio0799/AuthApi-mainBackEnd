

export const getUserByUserName = (userName)=>{
    return `SELECT * FROM Usuarios WHERE Usuario = '${userName}'`;
};

export const getUserByUserId = (userId)=>{
    return `SELECT * FROM Usuarios WHERE IdUsuario = '${userId}'`;
};

export const createUser =  (user, psw)=>{
    return `INSERT INTO Usuarios(Usuario, password)VALUES('${user}','${psw}')`
};

export const getCompaniesByIdUser = (id) => {
    return `SELECT C.ID_COMPANY, C.COMPANY_NAME, P.nombre AS Pais 
            FROM Usuarios_Companias UC 
            JOIN Companias C ON C.ID_COMPANY = UC.ID_COMPANY 
            JOIN Paises P ON C.pais_id = P.id 
            WHERE UC.IdUsuario = ${id}`;
}

export const getAccountsByCompanies = () => {
    return `SELECT * FROM dbo.accounts`;
}

export const getAccountByID = (id) => {
    return `SELECT * FROM dbo.VistaCompleta WHERE UserID = ${id}`;
}

export const InsertAccount = (account) => {
    const nombre = account.nombreUsuario || '';
    const apellidos = account.apellidos || '';
    const correo = account.correoElectronico || '';
    const contraseña = account.contrasena || '';
    const status = account.estado || 1; 
    const perfil = JSON.stringify(account.permisos || {});
    const nombre_comercial = account.nombreComercial || '';
    const nombre_bd = account.nombreEmpresaBD || '';
    const tipo_bd = account.tipoBD || '';
    const ubicacion_servidor_bd = account.ubicacionServidorBD || '';
    const ubicacion_servidor_presentacion = account.ubicacionServidorPresentacion || '';
    const link_portal_acceso = account.linkPortalAcceso || '';
    const id_usuario_tenant = account.idUsuarioTenant || '';
    const clave_usuario_tenant = account.claveUsuarioTenant || '';
    const tipo_licencia = account.tipoLicencia || '';
    const SL = account.SL || '';

    return `
        EXEC sp_InsertarAccount
        @nombre = '${nombre}',
        @apellidos = '${apellidos}',
        @correo = '${correo}',
        @contraseña = '${contraseña}',
        @status = ${status},
        @perfil = '${perfil}',
        @nombre_comercial = '${nombre_comercial}',
        @nombre_bd = '${nombre_bd}',
        @tipo_bd = '${tipo_bd}',
        @ubicacion_servidor_bd = '${ubicacion_servidor_bd}',
        @ubicacion_servidor_presentacion = '${ubicacion_servidor_presentacion}',
        @link_portal_acceso = '${link_portal_acceso}',
        @id_usuario_tenant = '${id_usuario_tenant}',
        @clave_usuario_tenant = '${clave_usuario_tenant}',
        @tipo_licencia = '${tipo_licencia}';
        @SL = '${SL}';
    `;
};

export const UpdateAccount = (account) => {
    const id = account.id || 0; // Valor predeterminado
    const nombre_comercial = account.nombreComercial || '';
    const nombre_bd = account.nombreEmpresaBD || '';
    const tipo_bd = account.tipoBD || '';
    const ubicacion_servidor_bd = account.ubicacionServidorBD || '';
    const ubicacion_servidor_presentacion = account.ubicacionServidorPresentacion || '';
    const link_portal_acceso = account.linkPortalAcceso || '';
    const id_usuario_tenant = account.idUsuarioTenant || '';
    const clave_usuario_tenant = account.claveUsuarioTenant || '';
    const tipo_licencia = account.tipoLicencia || '';
    const nombre = account.nombreUsuario || '';
    const apellidos = account.apellidos || '';
    const correo = account.correoElectronico || '';
    const status = account.estado || null;
    const SL = account.SL || '';
    const perfil = account.permisos ? JSON.stringify(account.permisos) : null;

    

    return `
        EXEC sp_ActualizarAccount
        @id = ${id},
        @nombre = ${nombre ? `'${nombre}'` : 'NULL'},
        @apellidos = ${apellidos ? `'${apellidos}'` : 'NULL'},
        @correo = ${correo ? `'${correo}'` : 'NULL'},
        @status = ${status || 'NULL'},
        @perfil = ${perfil ? `'${perfil}'` : 'NULL'},
        @nombre_comercial = ${nombre_comercial ? `'${nombre_comercial}'` : 'NULL'},
        @nombre_bd = ${nombre_bd ? `'${nombre_bd}'` : 'NULL'},
        @tipo_bd = ${tipo_bd ? `'${tipo_bd}'` : 'NULL'},
        @SL = ${SL ? `'${SL}'` : 'NULL'},
        @ubicacion_servidor_bd = ${ubicacion_servidor_bd ? `'${ubicacion_servidor_bd}'` : 'NULL'},
        @ubicacion_servidor_presentacion = ${ubicacion_servidor_presentacion ? `'${ubicacion_servidor_presentacion}'` : 'NULL'},
        @link_portal_acceso = ${link_portal_acceso ? `'${link_portal_acceso}'` : 'NULL'},
        @id_usuario_tenant = ${id_usuario_tenant ? `'${id_usuario_tenant}'` : 'NULL'},
        @clave_usuario_tenant = ${clave_usuario_tenant ? `'${clave_usuario_tenant}'` : 'NULL'},
        @tipo_licencia = ${tipo_licencia ? `'${tipo_licencia}'` : 'NULL'};
    `;
};


export const InsertCompany = (company) => {
    const COMPANY_NAME = company.COMPANY_NAME || '';
    const DB_NAME = company.DB_NAME || '';
    const DB_USER = company.DB_USER || '';
    const DB_PSW = company.DB_PSW || '';
    const SL_USER = company.SL_USER || '';
    const SL_PSW = company.SL_PSW || '';
    const SL_URI = company.SL_URI || '';
    const DB_HOST = company.DB_HOST || '';
    const ConfigJSON = JSON.stringify(company.ConfigJSON || {}); // Convertir a JSON
    const pais_id = company.pais_id || 0; // Valor predeterminado

    return `
        EXEC sp_InsertarCompany
        @COMPANY_NAME = '${COMPANY_NAME}',
        @DB_NAME = '${DB_NAME}',
        @DB_USER = '${DB_USER}',
        @DB_PSW = '${DB_PSW}',
        @SL_USER = '${SL_USER}',
        @SL_PSW = '${SL_PSW}',
        @SL_URI = '${SL_URI}',
        @DB_HOST = '${DB_HOST}',
        @ConfigJSON = '${ConfigJSON}',
        @pais_id = ${pais_id};
    `;
};


export const InsertAccountCompany = (accountCompany) => {
    const idUser = accountCompany.idUser || 0; // Valor predeterminado
    const idCompany = accountCompany.idCompany || 0; // Valor predeterminado
    const perfil = accountCompany.perfil || '';

    return `
        EXEC sp_InsertarAccountCompany
        @idUser = ${idUser},
        @idCompany = ${idCompany},
        @perfil = '${perfil}';
    `;
};


export const UpdateCompany = (company) => {
    const ID_COMPANY = company.ID_COMPANY || 0; // Valor predeterminado
    const COMPANY_NAME = company.COMPANY_NAME || '';
    const DB_NAME = company.DB_NAME || '';
    const DB_USER = company.DB_USER || '';
    const DB_PSW = company.DB_PSW || '';
    const SL_USER = company.SL_USER || '';
    const SL_PSW = company.SL_PSW || '';
    const SL_URI = company.SL_URI || '';
    const DB_HOST = company.DB_HOST || '';
    const ConfigJSON = company.ConfigJSON ? JSON.stringify(company.ConfigJSON) : null;
    const pais_id = company.pais_id || null;

    return `
        EXEC sp_ActualizarCompany
        @ID_COMPANY = ${ID_COMPANY},
        @COMPANY_NAME = ${COMPANY_NAME ? `'${COMPANY_NAME}'` : 'NULL'},
        @DB_NAME = ${DB_NAME ? `'${DB_NAME}'` : 'NULL'},
        @DB_USER = ${DB_USER ? `'${DB_USER}'` : 'NULL'},
        @DB_PSW = ${DB_PSW ? `'${DB_PSW}'` : 'NULL'},
        @SL_USER = ${SL_USER ? `'${SL_USER}'` : 'NULL'},
        @SL_PSW = ${SL_PSW ? `'${SL_PSW}'` : 'NULL'},
        @SL_URI = ${SL_URI ? `'${SL_URI}'` : 'NULL'},
        @DB_HOST = ${DB_HOST ? `'${DB_HOST}'` : 'NULL'},
        @ConfigJSON = ${ConfigJSON ? `'${ConfigJSON}'` : 'NULL'},
        @pais_id = ${pais_id || 'NULL'};
    `;
};
export const UpdateAccountCompany = (accountCompany) => {
    const idUser = accountCompany.idUser || 0; // Valor predeterminado
    const idCompany = accountCompany.idCompany || 0; // Valor predeterminado
    const perfil = accountCompany.perfil || null;

    return `
        EXEC sp_ActualizarAccountCompany
        @idUser = ${idUser},
        @idCompany = ${idCompany},
        @perfil = ${perfil ? `'${perfil}'` : 'NULL'};
    `;
};
export const DeleteAccount = (id) => {
    return `
        EXEC sp_EliminarAccount
        @id = ${id};
    `;
};
export const DeleteCompany = (ID_COMPANY) => {
    return `
        EXEC sp_EliminarCompany
        @ID_COMPANY = ${ID_COMPANY};
    `;
};
export const DeleteAccountCompany = (idUser, idCompany) => {
    return `
        EXEC sp_EliminarAccountCompany
        @idUser = ${idUser},
        @idCompany = ${idCompany};
    `;
};
