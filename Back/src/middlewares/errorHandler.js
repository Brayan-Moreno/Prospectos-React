const errorHandlerMiddleware = (error, req, res, next) => {
    console.log("🍺 ~ errorHandlerMiddleware ~ error:", error)
    
    const status = error.status || 500;
    const message = error.controlled ? error.message : "Ha ocurrido un error. Intente de nuevo más tarde";

    res.header("Content-Type", "application/json");
    res.status(status).send({ success: false, message });
}
module.exports = errorHandlerMiddleware;
