const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yenhbkjy123',
    database: 'nexussql',
    port: 7859, // Обновленный порт
  });
  
router.get('/user', (req, res) => {
    const username = req.user; // Здесь предполагается, что вы сохраняете имя пользователя в req.user при аутентификации
    
    const query = `SELECT * FROM users WHERE username = ?`;
    connection.query(query, [username], (err, results) => {
      if (err) {
        console.error('Ошибка при выполнении запроса к базе данных', err);
        res.status(500).json({ error: 'Произошла ошибка' });
        return;
      }
  
      if (results.length > 0) {
        const user = results[0];
        res.json({ user });
      } else {
        res.json({ user: null });
      }
    });
  });