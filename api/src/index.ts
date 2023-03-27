import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import type { Locale } from './types';
import { getWord } from './service';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', (req, res) => {
  const locale: Locale = req.body.locale;
  res.send(getWord(locale));
});

app.listen(port, () => {
  console.log(`HangmanAPI up and running on port ${port}`);
});
