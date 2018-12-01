import express from 'express';
import redFlagRoute from './routes/redFlagRecord';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use('/', express.static('UI'));

app.get('/api/v1', (req, res) => {
    return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
})
app.use(redFlagRoute);

const server = app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

module.exports = server;