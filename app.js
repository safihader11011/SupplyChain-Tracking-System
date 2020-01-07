const express = require('express');

const Blockchain = require('./blockchain/index');
var bodyParser = require('body-parser');

const redis = require('./redis');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let blockchain;

app.post('/add/supplier', async (req, res, next) => {
    blockchain = new Blockchain();
    blockchain.addBlock(req.body)
    await redis.setAsync("Supplier:data", req.body.data)
    let temp = await redis.getAsync("Supplier:data")
    console.log(temp)
    console.log(blockchain.chain)
})

app.post('/add', (req, res, next) => {
    blockchain.addBlock(req.body)
    console.log(blockchain.chain)
})

app.listen(3001, () => { console.log("Server Started!") });