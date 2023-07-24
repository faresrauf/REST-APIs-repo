const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const errorHandler = require('../errorHandler');
const loginSchema = require('../Validations/loginValidation');
const { validateCredentials } = require('../Services/loginService');
const JWTService = require('../Services/JWTService');


router.post('/', (req, res) => {
    const UserCredentials = {
        username: req.body.username,
        password: req.body.password
    }

    const { error } = loginSchema.validate(UserCredentials);

    if (error) {
        return errorHandler.getBadRequestErrorResponse(res, error.message);
    }

    try {
        if (validateCredentials(UserCredentials)) {
            const token = JWTService.generateToken(UserCredentials);
            res.status(200).json({ success: true, token: token });
        }
        else {
            return errorHandler.
                getUnauthenticatedErrorResponse(res, 'Authentication Failed, invalid username/password');
        }
    } catch (err) {
        return errorHandler.getInternalServerErrorResponse(res, err.message);
    }
});
module.exports = router;