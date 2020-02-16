var mongoose = require('mongoose');

const supplyChainSchema = new mongoose.Schema({
    name: { type: String, required:true },
    timestamp: { type: Date, required:true },
    supplierId: String,
    blocks: [Object]
});

const SupplyChainModel = mongoose.model('SupplyChain',supplyChainSchema);
module.exports = SupplyChainModel;