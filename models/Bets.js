const mongoose = require("mongoose");

const BetSchema = new mongoose.Schema({
  homeTeam: { type: String, required: [true, "Please provide home team"] },
  awayTeam: { type: String, required: [true, "Please provide away team"] },
  homeTeamScore: {
    type: Number,
    required: [true, "Please provide score for the home team"],
  },
  awayTeamScore: {
    type: Number,
    required: [true, "Please provide score for the away team"],
  },
  stake: { type: Number, required: [true, "Please provide a stake"] },
  selection: {
    type: String,
    required: [true, "Please provide your selection"],
  },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Bet", BetSchema);
