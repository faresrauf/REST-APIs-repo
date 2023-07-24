const jwt = require('jsonwebtoken');

const secretKey = 'my-secret-key';


function generateToken(payload) {
    const expiresIn = '1h';
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
}


function verifyToken(token) {
    try {
        const payload = jwt.verify(token, secretKey);
        return { payload: payload, success: true };
    }
    catch (err) {
        return { payload: null, success: false };
    }
}

module.exports = {
    generateToken,
    verifyToken
}