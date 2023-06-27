const express = require('express');
const app = express();
const loginRouter = require('./api/login');
const usersRouter = require('./api/user');

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); // Замените на вашу фронтенд-страницу, если она на другом домене или порту
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
// Маршрут для аутентификации
app.use('/api/login', loginRouter, console.log);
app.use('/api/user', usersRouter, console.log);


// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
