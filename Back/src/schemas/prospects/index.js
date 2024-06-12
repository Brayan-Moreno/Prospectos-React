const Yup = require("Yup");


const PROSPECT_APPLICATION = Yup.object({
    name: Yup.string().required("nombre requerido"),
})


module.exports = {
 PROSPECT_APPLICATION,
}