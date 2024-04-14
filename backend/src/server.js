const express = require('express');
const cors = require('cors');
const db = require('./models/index.js');
const router = require('./routes.js');
const bodyParser = require('body-parser'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

db.sequelize.sync();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});