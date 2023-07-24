const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter')
const { verifyRequestToken } = require('./Middleware/authenticationHandler');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/login',loginRouter);
app.use(verifyRequestToken);
app.use('/users',userRouter);


app.listen(3000, () => {
    console.log('Server running on localhost:3000');
});