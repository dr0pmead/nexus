const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Создайте подключение к базе данных MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yenhbkjy123',
  database: 'nexussql',
  port: 7859, // Обновленный порт
});

// Обработка запроса на аутентификацию
router.post('/', (req, res) => {
  const { username, password} = req.body;

  // Выполните логику аутентификации
  // Пример: Проверка пользователя в базе данных
  const query = `SELECT * FROM users WHERE username = ?`;
  connection.query(query, [username], (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных', err);
      res.status(500).json({ error: 'Произошла ошибка' });
      return;
    }

    if (results.length > 0) {
      // Пользователь найден, проверяем пароль
      const user = results[0];
      if (password === user.password) {
        // Логин и пароль верные
        res.json({ success: true, name: user.name });
      } else {
        // Пароль неверный
        res.json({ success: false });
      }
    } else {
      // Пользователь не найден
      res.json({ success: false });
    }
  });

  
});

module.exports = router;
