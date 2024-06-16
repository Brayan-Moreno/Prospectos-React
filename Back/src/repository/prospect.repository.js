const customError = require("../utils/customError")

const {sqlconnect, sqldb, sql} = require("../db/index")
const {listMapper} = require("../mappers/index")
const { MAX } = require("mssql")


const PROSPECTS_INFO_MAPPER = {
    FROM_DB: Object.freeze({
        Id: "id",
        Nombre: "name",
        ApellidoPaterno: "firstLastName",
        ApellidoMaterno: "secondLastName",
        Calle: "street",
        NumeroExterior: "streetNumber",
        NumeroInterior: "internalNumber",
        Colonia: "colony",
        CodigoPostal: "zipCode",
        Telefono: "phone",
        Rfc: "rfc",
        IdEstatusProspecto: "idPipeline",
        EstatusProspecto: "pipeline",
        Observaciones: "observations"
    })
}

const DOCUMENTS_PROSPECT_MAPPER = {
    FROM_DB: Object.freeze({
        Id: "id",
        ProspectoId: "idProspect",
        IdTipoArchivo: "idFileType",
        NombreArchivo: "name",
        TipoArchivo: "fileType",
        Datos: "data",
    })
}

const DOCUMENTS_CATALOG_MAPPER = {
    FROM_DB: Object.freeze({
        Id: "id",
        Descripcion: "description",
        Extension: "extension",
    })
}

const STATUS_CATALOG_MAPPER = {
    FROM_DB: Object.freeze({
        Id: "id",
        Descripcion: "description",
    })
}


const getProspects = async (payload) =>{
    let response = null
    await sqlconnect
    const psql = sqldb.request()
    psql.input("prtIdSolicitud", sql.Int, payload)
    const { recordset: result} = await psql.execute(
        "sProspectos.SP_Solicitudes_Get"
    )
    response = listMapper(result, PROSPECTS_INFO_MAPPER.FROM_DB)
    return response;
}

const createProspect = async (payload) =>{
    const response = { data: [], error: true, message: "" };
    await sqlconnect
    const psql = sqldb.request()
    psql.input("prtNombre", sql.VarChar(50), payload.name)
    psql.input("prtApellidoPaterno", sql.VarChar(50), payload.firstLastName)
    psql.input("prtApellidoMaterno", sql.VarChar(50), payload.secondLastName)
    psql.input("prtCalle", sql.VarChar(100), payload.street)
    psql.input("prtNumeroInterior", sql.NVarChar(10), payload.internalNumber)
    psql.input("prtNumeroExterior", sql.Char(5), payload.streetNumber)
    psql.input("prtColonia", sql.VarChar(50), payload.colony)
    psql.input("prtCodigoPostal", sql.VarChar(50), payload.zipCode)
    psql.input("prtTelefono", sql.NChar(10), payload.phone)
    psql.input("prtRFC", sql.VarChar(13), payload.rfc)
    psql.output("prtErrNumber", sql.Int)
    psql.output("prtErrDescrip", sql.VarChar(255))

    const {output: result} = await psql.execute(
        "sProspectos.SP_Solicitudes_Set"
    )

    if(result.prtErrNumber === -1){
        customError(200, result.prtErrDescrip)
    }

    response.error = false
    response.message = result.prtErrDescrip
    response.data = result.prtErrNumber
    return response;
}

const addDocumentsProspect = async (prosepctId, documents) =>{
    const response = { data: [], error: true, message: "" };
    await sqlconnect
    const psql = sqldb.request()
    const tvp = new sql.Table()

    tvp.columns.add("idSolicitud", sql.Int)
    tvp.columns.add("idArchivo", sql.Int)
    tvp.columns.add("nombreArchivo", sql.VarChar(100))
    tvp.columns.add("datos", sql.VarChar(MAX))

    for(const i of documents){
        tvp.rows.add(prosepctId, i.id, i.name, i.data)
    }
    
    psql.input("prtIdProspecto", sql.Int, prosepctId)
    psql.input("type_Documentos_Solicitud", tvp)
    psql.output("prtErrNumber", sql.int);
    psql.output("prtErrDescrip", sql.VarChar(255));

    const {output: result} = await psql.execute(
        "sProspectos.SP_ArchivosProspecto_Set"
    )

    if(result.prtErrNumber === -1){
        customError(200, result.prtErrDescrip)
    }

    response.error = false
    response.message = result.prtErrDescrip
    response.data = []
    return response;
}

const getDocumentsProspect = async (prospectId) =>{
    let response = null
    await sqlconnect
    const psql = sqldb.request()
    psql.input("prtIdProspecto", sql.Int, prospectId)
    const { recordset: result} = await psql.execute(
        "sProspectos.SP_ArchivosProspecto_Get"
    )
    response = listMapper(result, DOCUMENTS_PROSPECT_MAPPER.FROM_DB)
    return response;
}


const updateStatus = async (payload) =>{
    const response = { data: [], error: true, message: "" };
    await sqlconnect
    const psql = sqldb.request()
    psql.input("prtIdProspecto", sql.Int, payload.prospectId)
    psql.input("prtIdStatus", sql.Int, payload.statusId)
    psql.input("prtObservaciones", sql.VarChar(MAX), payload.observations)
    psql.output("prtErrNumber", sql.Int)
    psql.output("prtErrDescrip", sql.VarChar(255))

    const {output: result} = await psql.execute(
        "sProspectos.SP_EstatusProspecto_Set"
    )

    if(result.prtErrNumber === -1){
        customError(200, result.prtErrDescrip)
    }

    response.error = false
    response.message = result.prtErrDescrip
    response.data = result.prtErrNumber
    return response;
}

const getCtlDocuments = async () =>{
    await sqlconnect
    const psql = sqldb.request()
    const {recordset: data} = await psql.execute ("sProspectos.SP_CtlDocumentos_Get")
    return listMapper(data, DOCUMENTS_CATALOG_MAPPER.FROM_DB)
}

const getCtlStatus = async () =>{
    await sqlconnect
    const psql = sqldb.request()
    const {recordset: data} = await psql.execute("sProspectos.SP_CtlEstatus_Get")
    return listMapper(data, STATUS_CATALOG_MAPPER.FROM_DB);
}


module.exports = {
    getProspects,
    createProspect,
    addDocumentsProspect,
    getDocumentsProspect,
    updateStatus,
    getCtlDocuments,
    getCtlStatus,
}