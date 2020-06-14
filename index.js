const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fabricClient = require('./fabricClient.js');
const utils = require('./utils.js');
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Behold The CFEVN Stack!'
    });
});

app.get('/queryResponse', (req, res) => {
    fabricClient.queryBatchList().then(response => utils.processBatchList(response)).then((response) => {
        res.json(response);
    });
});

app.get('/queryBatch', (req, res) => {
    console.log(req.body);
    fabricClient.queryBatch(req.body.id).then((response) => {
        res.json(response)
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});

app.post('/createBatch', (req, res) => {
    console.log(req.body);
    let str = JSON.stringify(req.body);
    fabricClient.createBatch(str).then((response) => {
        res.json(response);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});

app.post('/updateBatch', (req, res) => {
    console.log(req.body);
    let str = JSON.stringify(req.body);
    fabricClient.updateBatch(str).then((response) => {
        res.json(response);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
})

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});