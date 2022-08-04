const User = require('../models/User')
const Deposit = require('../models/Deposit')
const HttpError = require('../errors/error')


const createDeposit = async(req,res,next) => {
    const {deposit} = req.body
    const {id} = req.params
    if(!deposit){
        return next(new HttpError('Please provide an amount for the deposit',404))
    }

    const user = await User.findOne({_id:id});
    if(!user){
        return next(new HttpError('User is not found',404))
    }

    const newDeposit = await Deposit.create({deposit,user:id});

    res.status(201).json({newDeposit});
}
const getAllDeposits = async(req,res,next) => {
    const {id} = req.params
    const deposits = await Deposit.find({user:id});
    res.status(200).json({deposits,length:deposits.length});
}


module.exports = {
    createDeposit,getAllDeposits
}