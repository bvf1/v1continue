import dotenv from 'dotenv';

import express from 'express';
import { readdir } from 'fs/promises';
dotenv.config();g
const app = express();

const { HOST: hostname = '127.0.0.1', PORT: port = 8080 } = process.env;

const DATA_DIR = './data';

app.get('/', async (req, res) => {
  const files = await readdir(DATA_DIR);

  console.info('request to /');
  res.send(`Hello World!
  Files available are ${files.join(
    ','
    )}`);
});

app.listen(port, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
