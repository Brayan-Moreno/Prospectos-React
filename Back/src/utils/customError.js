const customError = (statusCode, message = "Ha ocurrido un error") => {
    const error = new Error(message);
    error.status = typeof statusCode === "number" ? statusCode : 500;
    error.controlled = true;
    console.log("👉 ~ customError ~ error", error);
    throw error;
  }

module.exports = customError;