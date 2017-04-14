'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.use(express.static(`${__dirname}/build`));

app.listen(PORT, () => {
  console.log('Quiver initialized');
});
