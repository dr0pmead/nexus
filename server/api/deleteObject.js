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

router.delete('/', (req, res) => {
  const objectId = req.body.objectId;

  // Формирование SQL-запроса для удаления объекта с заданным objectId
  const query = `DELETE FROM objects WHERE id = ?`;
  const params = [objectId];

  // Выполнение запроса к базе данных
  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Ошибка при удалении объекта:', err);
      return res.status(500).json({ error: 'Ошибка при удалении объекта' });
    }

    // Проверка количества удаленных строк
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Объект не найден' });
    }

    // Успешное удаление объекта
    return res.status(200).json({ message: 'Объект успешно удален' });
  });
});

module.exports = router;