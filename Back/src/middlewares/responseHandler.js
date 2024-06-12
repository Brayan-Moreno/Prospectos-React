const responseHandlerMiddleware = (data, req, res, next) => {        
    const status = data.status || 200;
    const message = data.message ? data.message : "Exito";
    const success = data.success ? data.success : true;

    res.header("Content-Type", "application/json");
    res.status(status).send({ data:data.data, success, message });
}

module.exports = responseHandlerMiddleware;