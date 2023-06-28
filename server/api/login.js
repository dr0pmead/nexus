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
  const { username, password } = req.body;

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
      // Пользователь найден
      const user = results[0];
      const storedPassword = user.password;

      // Сравниваем пароли
      if (password === storedPassword) {
        // Логин и пароль верные
        res.json({ success: true, user_id: user.user_id });
      } else {
        // Пароль неверный
        res.json({ success: false, passwordMatch: false });
      }
    } else {
      // Пользователь не найден
      res.json({ success: false, passwordMatch: true });
    }
  });
});

module.exports = router;