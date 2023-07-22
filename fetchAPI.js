
async function fetchAPIGet(URL) {
    const response = await fetch(URL);
    return await response.json();
}

async function fetchAPIPost(URL, Body) {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: Body
    });

    return await response.json();
}

async function fetchAPIPut(URL, Body) {
    const response = await fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: Body
    });

    return await response.json();
}

async function fetchAPIDelete(URL) {
    return await fetch(URL, {
        method: 'DELETE',
    });
}

module.exports = {
    fetchAPIGet,
    fetchAPIPost,
    fetchAPIDelete,
    fetchAPIPut
}