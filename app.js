const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/users', async (req, res) => {
    try {
        const pageNumber = req.query.page;
        const response = await fetch(`https://reqres.in/api/users?page=${pageNumber}`);
        const users = await response.json();

        if (!users) {
            res.status(404).json({ message: 'Users Not found' });
        }

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server Side Error' });
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const url = `https://reqres.in/api/users/${id}`;
        const response = await fetch(url);
        const user = await response.json();

        if (!user) {
            res.status(404).json({ message: 'User Not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server Side Error' });
    }
});

app.post('/users', async (req, res) => {
    try {
        const User = {
            name: req.body.name,
            job: req.body.job
        }

        const url = 'https://reqres.in/api/users';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(User)
        });

        const newUser = await response.json();


        if (!newUser) {
            res.status(400).json({ message: 'Bad Request' });
        }

        res.status(201).json(newUser);


    } catch (err) {
        res.status(500).json({ message: 'Server Side Error' });
    }

});

app.put('/users/:id', async (req, res) => {
    try {
        const User = {
            name: req.body.name,
            job: req.body.job
        }
        const id = req.params.id;

        const url = `https://reqres.in/api/users/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(User)
        });

        const updatedUser = await response.json();
        res.status(200).json(updatedUser);

    } catch (err) {
        res.status(500).json({ message: 'Server Side Error' });
    }

});

app.delete('/users/:id', async (Req, res) => {
    try {
        const id = req.params.id;

        const url = `https://reqres.in/api/users/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            res.status(response.statuscode).json({ message: 'Bad Request, Check User ID' });
        }

        res.status(204).json('User Deleted Succesfully');


    } catch (err) {
        res.status(500).json({ message: 'Server Side Error' });
    }
});

app.listen(3000, () => {
    console.log('Server running on localhost:3000');
});