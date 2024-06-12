class ResponseTemplate {
    success(data, message = "Los datos se han obtenido con éxito") {
        return {
            success: true,
            message,
            data,
        };
    }
}
module.exports = ResponseTemplate;