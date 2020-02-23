var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum : ['SUPPLIER', 'MANUFACTURER', 'TRANSPORTER', 'RETAILER', 'CONSUMER'],
        default: 'SUPPLIER'
    },
    contact: String,
    blockchains: { type: Array, required: true }
});

const UserModel = mongoose.model('User',userSchema);
module.exports = UserModel;