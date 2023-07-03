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

router.post('/', (req, res) => {
  const objectId = req.body.objectId;

  // Формирование SQL-запроса для получения данных объекта с заданным objectId
  const query = `SELECT * FROM objects WHERE id = ?`;
  const params = [objectId];

  // Выполнение запроса к базе данных
  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Ошибка при получении данных объекта:', err);
      return res.status(500).json({ error: 'Ошибка при получении данных объекта' });
    }

    // Проверка наличия данных объекта
    if (results.length === 0) {
      return res.status(404).json({ error: 'Объект не найден' });
    }

    // Получение тегов из базы данных и разделение их на отдельные элементы
    const tagsFromDatabase = results[0].tags;
    const tags = tagsFromDatabase.split(' | ');

    // Добавление тегов к объекту
    const objectWithTags = {
      ...results[0],
      tags,
    };
    console.log(objectWithTags)
    // Успешное выполнение запроса, отправка данных объекта с тегами обратно клиенту
    return res.status(200).json(objectWithTags);
  });
});

module.exports = router;
