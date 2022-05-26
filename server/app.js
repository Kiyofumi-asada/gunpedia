const express = require('express');

const app = express();

const resData = [
  {
    id: 1,
    title: 'text1',
  },
  {
    id: 2,
    title: 'text2',
  },
  {
    id: 3,
    title: 'text3',
  },
  {
    id: 4,
    title: 'text4',
  },
  {
    id: 5,
    title: 'text5',
  },
];

app.get('/api/index', function (req, res, next) {
  res.json({ status: 200, resData });
});

app.listen(3001);
