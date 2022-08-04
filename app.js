require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const globalErr = require('./controllers/errorController')



const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());




const authRouter = require('./routes/authRoutes');
const betRouter = require('./routes/betRoutes');
const depositRouter = require('./routes/depositRoutes');


app.use('/api/v1/auth',authRouter);
app.use('/',betRouter);
app.use('/api/v1',depositRouter);


app.use(globalErr);

app.use((req,res) => {
    console.log(req.signedCookies);
    // console.log(req.cookies);
    res.send('live')
})

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://kal:translat@cluster0.dbqr9.mongodb.net/?retryWrites=true&w=majority');
        app.listen(port);
        console.log(`server is running on ${port}`);
        
    } catch (error) {
        console.log(error);
    }
}
start();