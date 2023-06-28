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
  const user_id = req.body.user_id;

  const query = `SELECT name FROM users WHERE user_id = ?`;
  connection.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных', err);
      res.status(500).json({ error: 'Произошла ошибка' });
      return;
    }

    if (results.length > 0) {
      const { name } = results[0];
      res.json({ name });
    } else {
      res.json({ name: null });
    }
  });
});

module.exports = router;
