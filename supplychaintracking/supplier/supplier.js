const express = require('express');
const router = express.Router();
const SupplierModel = require('../../model/supplierchain.model')
const Blockchain = require('../../blockchain/index');
const mongoose = require('mongoose')
let blockchain;

router.post('/create/:supplierId', async (req, res, next) => {
    let reqBody = {timestamp: new Date(), ...req.body }
    console.log(reqBody)
    const supplier = new SupplierModel(reqBody);
    const supplierResponse = await supplier.save();

    res.send(supplierResponse)
})

router.get('/get_chain/:supplierId', async (req, res, next) => {
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

router.get('/delete_chain', async (req, res, next) => {
    redis.keys("SupplyChain:*", (error, response) => {
        response.map(async res => {
            await redis.delAsync(res)
        })
    })
    res.send("deleted")
})

router.post('/add', async (req, res, next) => {
    blockchain = new Blockchain();
    blockchain.addBlock(req.body)
    console.log("bloch chain ===>",blockchain)

    await redis.setAsync("SupplyChain:data", JSON.stringify(blockchain.chain))
    console.log(blockchain.chain)
    res.send("added")
})

module.exports = router;