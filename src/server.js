import express from 'express';
import redFlagRoute from './routes/redFlagRecord';

const app = express();

app.use(express.json());
app.use('/', express.static(__dirname + '/UI'));

app.use(redFlagRoute);
app.get('/api/v1', (req, res) => {
    return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
})

app.listen(3000)
console.log('app running on port ', 3000);