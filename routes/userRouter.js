const express = require('express');
const router = express.Router();
const links = require('../links');
const errorHandler = require('../errorHandler');
const fetchAPI = require('../fetchAPI');

router.get('/', async (req, res) => {
    try {
        const pageNumber = req.query.page;
        const GET_URL = `${links.API_BASE_URL}?page=${pageNumber}`;
        const users = await fetchAPI.fetchAPIGet(GET_URL);

        if (!users) {
            errorHandler.getNotFoundResponse(res);
        }

        res.status(200).json(users);
    } catch (err) {
        errorHandler.getInternalServerError(res, err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const GET_URL = `${links.API_BASE_URL}/${id}`;
        const user = await fetchAPI.fetchAPIGet(GET_URL);

        if (!user) {
            errorHandler.getNotFoundResponse(res);
        }

        res.status(200).json(user);
    } catch (err) {
        errorHandler.getInternalServerError(res, err);
    }
});

router.post('/', async (req, res) => {
    try {
        const User = {
            name: req.body.name,
            job: req.body.job
        }

        const newUser = await fetchAPI.fetchAPIPost(URL, JSON.stringify(User));

        if (!newUser) {
            errorHandler.getBadRequestError(res);
        }

        res.status(201).json(newUser);


    } catch (err) {
        errorHandler.getInternalServerError(res, err);
    }
});

router.put('/', async (req, res) => {
    try {
        const User = {
            name: req.body.name,
            job: req.body.job
        }
        const id = req.params.id;

        const PUT_URL = `${links.API_BASE_URL}/${id}`;
        const updatedUser = await fetchAPI.fetchAPIPut(PUT_URL, User);

        res.status(200).json(updatedUser);

    } catch (err) {
        errorHandler.getInternalServerError(res, err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const DELETE_URL = `${links.API_BASE_URL}/${id}`;
        const response = await fetchAPI.fetchAPIDelete(DELETE_URL);

        if (!response.ok) {
            errorHandler.getBadRequestError(res);
        }

        res.status(204).json('User Deleted Succesfully');

    } catch (err) {
        errorHandler.getInternalServerError(res, err);
    }
});

module.exports = router;