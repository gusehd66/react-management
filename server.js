const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/customers', (req, res) => {
  res.send([
    [
      {
        'id': 1,
        'image': 'https://placeimg.com/64/64/1',
        'name': "Dongit",
        'birthday': "970226",
        'gender': "남자",
        'job': "대학생"
      },
      {
        'id': 2,
        'image': 'https://placeimg.com/64/64/2',
        'name': "미스 리",
        'birthday': "960512",
        'gender': "여자",
        'job': "연구원"
      },
      {
        'id': 3,
        'image': 'https://placeimg.com/64/64/3',
        'name': "도라에몽",
        'birthday': "870123",
        'gender': "남자",
        'job': "로봇"
      },
    ]
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));