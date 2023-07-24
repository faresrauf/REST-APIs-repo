const errorHandler = require('../errorHandler');

function isAdmin(req, res, next) {
    if (req.user.role === "admin") {
        next();
    }
    else {
        return errorHandler.getUnauthorizedErrorResponse(res, 'Access Denied, permission for admin only.');
    }
}

module.exports = isAdmin;