const Bet = require("../models/Bets");
const User = require("../models/User");
const HttpError = require("../errors/error");
const { getAll, deleteOne } = require("./handleFactory");

const createBet = async(req,res,next) => {
    console.log(Bet);
    const {id} = req.params;
    const {homeTeam,awayTeam,homeTeamScore,awayTeamScore,stake,selection} = req.body;
    const userById = await User.findOne({_id:id});
    if(!userById){
        return next(new HttpError('There is no such user',404));
    }
    const bet = await Bet.create({homeTeam,awayTeam,homeTeamScore,awayTeamScore,stake,selection,user:id});

    res.status(201).json({bet});
}

const getAllBets = getAll(Bet);
const deleteBet = deleteOne(Bet);

module.exports = {
  getAllBets,
  deleteBet,
  createBet,
};
