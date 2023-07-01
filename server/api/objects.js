const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yenhbkjy123',
  database: 'nexussql',
  port: 7859,
});

router.get('/', (req, res) => {
  // Формирование SQL-запроса для получения всех записей из таблицы objects
  const query = `SELECT * FROM objects`;

  // Выполнение запроса к базе данных
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка при получении записей из базы данных:', err);
      return res.status(500).json({ error: 'Ошибка при получении записей из базы данных' });
    }

    // Успешное выполнение запроса, отправка полученных записей обратно клиенту
    return res.status(200).json(results);
  });
});

module.exports = router;
