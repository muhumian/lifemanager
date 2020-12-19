const express = require('express');
const app = express();
const server = require("http").createServer(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
const Port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

//routes
const auth = require('./api/routes/user/auth');
const todo = require('./api/routes/todo/task');

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://muhumian:FanDual17@cluster0.txap6.mongodb.net/todo?retryWrites=true&w=majority",
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, retryWrites: false},
    () => {
        console.log('Connect to heroku DB')
    }
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/', auth);
app.use('/api/', todo);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

server.listen(Port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Server is listening at:' + Port);
    }
});
