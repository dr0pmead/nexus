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

router.post('/', (req, res) => {
  const { name, tags } = req.body;

  // Формирование SQL-запроса
  const query = `INSERT INTO objects (name, tags) VALUES (?, ?)`;
  const values = [name, tags.join(',')];

  // Выполнение запроса к базе данных
  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Ошибка при добавлении объекта в базу данных:', err);
      return res.status(500).json({ error: 'Ошибка при добавлении объекта в базу данных' });
    }

    // Успешное выполнение запроса
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
