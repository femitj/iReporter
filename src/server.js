import express from 'express';
import redFlagRoute from './routes/redFlagRecord';

const app = express();
const PORT = 3000;


app.use(express.json());
app.use('/', express.static('UI'));

app.use(redFlagRoute);
app.get('/api/v1', (req, res) => {
    return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
})

module.exports = app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

//export default server;