import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
	res.send({
		...req.body,
	});
});

app.listen(3333);
