const mongoose = require('mongoose');



const DepositSchema = new mongoose.Schema({
    deposit: {type:Number,required:true},
    user:{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }
})

module.exports = mongoose.model('Deposit',DepositSchema)