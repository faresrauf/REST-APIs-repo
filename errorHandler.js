
function getNotFoundResponse(res,message) {
    return res.status(404).json({ Message: message});
}

function getInternalServerErrorResponse(res,err) {
    return res.status(500).json({ message: 'Internal Server Error', error: err});
}

function getBadRequestErrorResponse(res,message) {
    return res.status(400).json({ Message: message});
}

module.exports = {
    getNotFoundResponse,
    getInternalServerErrorResponse,
    getBadRequestErrorResponse
}