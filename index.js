const express = require('express');
const app = express();

app.use(express.static('public'));
app.use('/css', express.static(`${__dirname}/public/css`));
app.use('/images', express.static(`${__dirname}/public/images`));
app.use('/scripts', express.static(`${__dirname}/public/scripts`));

app.listen(8000, function () {
  console.log("Server started.");
});