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

    await redis.setAsync("SupplyChain:data", JSON.stringify(blockchain.chain))
    console.log(blockchain.chain)
    res.send("added")
})

app.get('/get_chain', async (req, res, next) => {
    // let temp = [];
    // redis.keys("Supplier:*", (error, response) => {
    //     console.log(response)

    //     response.map(async res => {
    //         temp.push()
    //         console.log(temp)
    //     })
    // })
    let temp = JSON.parse(await redis.getAsync("SupplyChain:data"))
    res.send(temp)
})

app.get('/delete_chain', async (req, res, next) => {
    redis.keys("SupplyChain:*", (error, response) => {
        response.map(async res => {
            await redis.delAsync(res)
        })
    })
    res.send("deleted")
})

app.post('/add', async (req, res, next) => {
    blockchain.addBlock(req.body)

    await redis.setAsync("SupplyChain:data", JSON.stringify(blockchain.chain))
    console.log(blockchain.chain)
    res.send("added")
})

app.listen(3001, () => { console.log("Server Started!") });