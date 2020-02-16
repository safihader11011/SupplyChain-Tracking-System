var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum : ['SUPPLIER', 'MANUFACTURAR', 'TRANSPORTATION', 'RETAILER', 'CONSUMER'],
        default: 'SUPPLIER'
    },
    contact: String
});

const UserModel = mongoose.model('User',userSchema);
module.exports = UserModel;