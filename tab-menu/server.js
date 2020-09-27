import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(express.static('src/.'));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3333);
