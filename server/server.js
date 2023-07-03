const express = require('express');
const app = express();
const loginRouter = require('./api/login');
const userRouter = require('./api/user')
const bodyParser = require('body-parser');
const addObjectRouter = require('./api/addObject');
const objects = require('./api/objects');
const object = require('./api/object');
const delObjectRouter = require('./api/deleteObject');
const morgan = require('morgan');

app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); // Замените на вашу фронтенд-страницу, если она на другом домене или порту
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });


// Маршрут для аутентификации
app.use(morgan('dev'));
app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);
app.use('/api/addObject', addObjectRouter);
app.use('/api/objects', objects);
app.use('/api/object', object);
app.use('/api/deleteObject', delObjectRouter);

// Запуск сервера
app.listen(3000, () => {

        console.log('   Сервер запущен на порту     3000.     ');
        console.log('   http://localhost:3000/                ');

});
