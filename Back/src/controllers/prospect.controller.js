const {
  getProspect,
  getDocumentsProspect,
  prospectCreate,
  updateStatus,
} = require("../services/prospect.service");
const responseTemplate = require("../utils/responseTemplate");
const customError = require("../utils/customError");

const getProspectsHandler = async (req, res, next) => {
  let response = new responseTemplate();
  try {
    const data = await getProspect();
    if (data.length === 0) {
      customError(200, "No se encontraron registros de Prospectos");
    }
    res
      .status(200)
      .send(response.success(data, "Información recuperada con éxito"));
  } catch (error) {
    next(error);
  }
};

const getDocumentsProspectHandler = async (req, res, next) => {
  let response = new responseTemplate();
  try {
    const { idProspect } = req.query;

    const data = await getDocumentsProspect(idProspect);

    if (data.length === 0) {
      customError(
        200,
        "No se encontraron registros de documentos de este prospecto"
      );
    }

    res
      .status(200)
      .send(response.success(data, "Información recuperada con éxito"));
  } catch (error) {
    next(error);
  }
};

const postProspectHandler = async (req, res, next) => {
  let response = new responseTemplate();
  try {
    const body = req.body;
    const { error, message } = await prospectCreate(body);

    if (error) {
      customError(200, message);
    }
    res.status(200).send(response.success(message));
  } catch (error) {
    next(error);
  }
};

const updateStatusHandler = async (req,res,next) =>{
    let response = new responseTemplate()
    try {
        
        const body = req.body
        const {error, message} = await updateStatus(body)

        if (error) {
            customError(200, message);
          }
          res.status(200).send(response.success(message));
    } catch (error) {
        next(error)
    }
}

module.exports = {
  getProspectsHandler,
  getDocumentsProspectHandler,
  postProspectHandler,
  updateStatusHandler,
};
