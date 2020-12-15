const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 8000;
const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes'));
app.use(express.static(path.join(__dirname, "./public")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});


app.listen(port, () => {
  console.log(`Server running on ${port}!`);
})