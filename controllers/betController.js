const HttpError = require("../errors/error");
const Bet = require('../models/Bets');
const User = require("../models/User");


const createBet = async(req,res,next) => {
    const {id} = req.params;
    const {homeTeam,awayTeam,homeTeamScore,awayTeamScore,stake,selection} = req.body;
    const userById = await User.findOne({_id:id});
    if(!userById){
        return next(new HttpError('There is no such user',404));
    }
    const bet = await Bet.create({homeTeam,awayTeam,homeTeamScore,awayTeamScore,stake,selection,user:id});

    res.status(201).json({bet});
}

const getAllBets = async (req,res) => {
    const {id} = req.params
    const bets = await Bet.find({user:id});
    res.status(200).json({bets,length:bets.length});
}
const deleteBet = async (req,res,next) => {
    const {id} = req.params
    const bet = await Bet.findOne({_id:id});

    if (!bet) {
        return next(new HttpError("Not found such bet",404));
      }
      await bet.remove();
      res.status(200).json({msg:'success ,bet removed'});
}

module.exports = {
    getAllBets,
    deleteBet,createBet
}