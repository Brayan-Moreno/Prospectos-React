const crypto = require("crypto");

const EncryptText_SHA256 = async (text) => {
    const sha = crypto.createHash("sha256");
    const textoEncriptar = Buffer.from(text, "utf8");
  
    sha.update(textoEncriptar);
    const hashBytes = sha.digest();
  
    return hashBytes;
  };

const paginator = (total, limit, page) => {
    const pages = Math.ceil(total / limit);
    const start = page === 1 ? 0 : (page - 1) * limit;

    return {
        pages,
        start,
    };
};

module.exports = {
    EncryptText_SHA256,
    paginator,
}
