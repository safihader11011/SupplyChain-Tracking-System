const express = require('express');
const router = express.Router();

const SupplyChainModel = require('../supplierchain.model')
const { GENESIS_DATA } = require('../../config');

const errorHandler = require('../../common/handler/error.handler');
const mongoose = require('mongoose')
var hash = require('object-hash');

let blockchain;

router.post('/add/supplier/:supplierId', async (req, res, next) => {
    try {
        const genesisBlock = { ...GENESIS_DATA };
        const getHash = hash(req.body.blocks);
        const lastHash = genesisBlock.hash;
        const blockData = { ...req.body.blocks, hash: getHash, lastHash: lastHash, timestamp: new Date() };
        const blockArray = [genesisBlock, blockData];
        const reqBody = { ...req.body, supplierId: req.params.supplierId, blocks: blockArray };

        const supplyChain = new SupplyChainModel(reqBody);
        const supplierResponse = await supplyChain.save();

        return res.status(200).send({
            data: supplierResponse,
            message: "Supplier block added successfully"
        })
    } catch (error) {
        let errorDoc = errorHandler(error);
        return res.status(errorDoc.status).send(errorDoc);
    }


})

router.post('/add/:supplierId', async (req, res, next) => {
    try {
        const getData = await SupplyChainModel.findOne({ _id: req.params.supplierId });

        if (!getData) {
            throw {
                status: 400,
                message: "No supplier found"
            }

        }
        const length = getData.blocks.length;
        const lastBlock = getData.blocks[length - 1];

        const getHash = hash(req.body);
        const lastHash = lastBlock.hash;
        const newBlock = { ...req.body, hash: getHash, lastHash: lastHash, timestamp: new Date() };
        const blockArray = [...getData.blocks, newBlock];

        const updateChain = await SupplyChainModel.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(getData._id) },
            { $set: { blocks: blockArray } },
            { new: true }
        )
        return res.status(200).send({
            data: updateChain,
            message: "Block added successfully"
        })
    } catch (error) {
        let errorDoc = errorHandler(error);
        return res.status(errorDoc.status).send(errorDoc);
    }


})

router.get('/delete_chain', async (req, res, next) => {
    redis.keys("SupplyChain:*", (error, response) => {
        response.map(async res => {
            await redis.delAsync(res)
        })
    })
    res.send("deleted")
})

router.post('/add/:blockId', async (req, res, next) => {
    //const block = 
})


module.exports = router;