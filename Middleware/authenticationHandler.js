const JWTService = require('../Services/JWTService');
const { getUserRole } = require('../Services/loginService');
const errorHandler = require('../errorHandler');

function verifyRequestToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return errorHandler.getUnauthenticatedErrorResponse(res, 'Provide a Token!');
    }

    try {
        const verificationResult = JWTService.verifyToken(token);
        if (verificationResult.success) {
            req.user = verificationResult.payload;
            req.user.role = getUserRole(req.user.username);
            next();
        } else {
            return errorHandler.getUnauthenticatedErrorResponse(res, 'Invalid token, access denied');
        }
    } catch (err) {
        return errorHandler.getUnauthenticatedErrorResponse(res, 'Invalid token, access denied');
    }
}

module.exports = {
    verifyRequestToken
}