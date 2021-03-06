const express = require('express');
const app = express();

const data = [
  {
    id: 1,
    title: 'Zaku',
    content: 'Zakuの説明',
    image:
      'data:image/jpeg;base64,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',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
  },
  {
    id: 2,
    title: 'text2',
    content: '本文',
    image: '',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
  },
  {
    id: 3,
    title: 'text3',
    content: '本文',
    image: '',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
  },
  {
    id: 4,
    title: 'text4',
    content: '本文',
    image: '',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
  },
  {
    id: 5,
    title: 'text5',
    content: '本文',
    image: '',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
  },
];
const path = '/api/gundam';

app.get(path, function (req, res, next) {
  console.log('===called getListAPI===', data);
  res.json({ status: 200, data });
});

app.get(`${path}/:id`, function (req, res, next) {
  const { id } = req.params;

  const detailData = data.find((v) => v.id === Number(id));
  console.log('===called getDetailListAPI=== :', id);
  res.json({ status: 200, detailData });
});

app.listen(3000);
