const express = require('express');
const router = express.Router();
const { API_BASE_URL } = require('../links');
const errorHandler = require('../errorHandler');
const { fetchAPIGet, fetchAPIPost, fetchAPIDelete, fetchAPIPut } = require('../fetchAPI');
const { paginationSchema, idSchema, userSchema, updateSchema } = require('../Validations/usersValidation.js')
const isAdmin = require('../Middleware/authorizationHandler');

router.get('/', async (req, res) => {
    const pageNumber = req.query.page;
    const itemsPerPage = req.query.per_page;

    const { error } = paginationSchema.validate({
        page: pageNumber,
        per_page: itemsPerPage
    });

    if (error) {
        return errorHandler.getBadRequestErrorResponse(res, error.message);
    }

    try {
        const GET_URL = `${API_BASE_URL}?page=${pageNumber}&per_page=${itemsPerPage}`;
        const users = await fetchAPIGet(GET_URL);

        if (users.data.length === 0) {
            return errorHandler.
                getNotFoundResponse(res, 'Users Not Found in the API, check the request and try again');
        }

        res.status(200).json(users);
    } catch (err) {
        return errorHandler.getInternalServerErrorResponse(res, err);
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const { error } = idSchema.validate({ id: id });

    if (error) {
        return errorHandler.getBadRequestErrorResponse(res, error.message);
    }

    try {
        const GET_URL = `${API_BASE_URL}/${id}`;
        const user = await fetchAPIGet(GET_URL);

        if (!user.data) {
            return errorHandler.getNotFoundResponse(res, 'User not found for the provided ID');
        }

        res.status(200).json(user);
    } catch (err) {
        return errorHandler.getInternalServerErrorResponse(res, err);
    }
});

router.post('/', isAdmin, async (req, res) => {
    const User = {
        name: req.body.name,
        job: req.body.job,
        password: req.body.password,
        email: req.body.email
    }

    const { error } = userSchema.validate(User);

    if (error) {
        return errorHandler.getBadRequestErrorResponse(res, error.message);
    }

    try {
        const newUser = await fetchAPIPost(API_BASE_URL, JSON.stringify(User));

        if (!newUser) {
            return errorHandler.getInternalServerErrorResponse(res, 'Unknown server error, try again');
        }

        res.status(201).json(newUser);

    } catch (err) {
        return errorHandler.getInternalServerErrorResponse(res, err);
    }
});

router.put('/:id', isAdmin, async (req, res) => {
    const User = {
        name: req.body.name,
        job: req.body.job,
        email: req.body.email,
        password: req.body.password
    }

    const id = req.params.id;

    const userValidation = updateSchema.validate(User);
    const idValidation = idSchema.validate({ id: id });

    if (userValidation.error) {
        return errorHandler.getBadRequestErrorResponse(res, userValidation.error.message);
    }

    if (idValidation.error) {
        return errorHandler.getBadRequestErrorResponse(res, idValidation.error.message);
    }

    try {
        const PUT_URL = `${API_BASE_URL}/${id}`;
        const updatedUser = await fetchAPIPut(PUT_URL, JSON.stringify(User));

        res.status(200).json(updatedUser);

    } catch (err) {
        return errorHandler.getInternalServerErrorResponse(res, err);
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const { error } = idSchema.validate({ id: id });

    if (error) {
        return errorHandler.getBadRequestErrorResponse(res, error.message);
    }
    try {
        const DELETE_URL = `${API_BASE_URL}/${id}`;
        const response = await fetchAPIDelete(DELETE_URL);

        if (!response.ok) {
            errorHandler.getNotFoundResponse(res, 'User not found for the provided ID');
        }

        res.status(204).json('User Deleted Succesfully');

    } catch (err) {
        errorHandler.getInternalServerErrorResponse(res, err);
    }
});

module.exports = router;