
function getNotFoundResponse(res) {
    return res.status(404).json({ message: 'User(s) Not found' });
}

function getInternalServerError(res,err) {
    return res.status(500).json({ message: 'Internal Server Error', error: err});
}

function getBadRequestError(res) {
    return res.status(400).json({ message: 'Bad Request'});
}

module.exports = {
    getNotFoundResponse,
    getInternalServerError,
    getBadRequestError
}