const HttpError = require("../errors/error");

// const createOne = (Model, UserModel) => async (req, res, next) => {
//   let doc;
//   const { deposit } = req.body;
//   const { homeTeam, awayTeam, homeTeamScore, awayTeamScore, stake, selection } =
//     req.body;

//   if (!deposit) {
//     doc = {
//       homeTeam,
//       awayTeam,
//       homeTeamScore,
//       awayTeamScore,
//       stake,
//       selection,
//     };
//     // return next(new HttpError("Please provide an amount for the deposit", 404));
//   }
//   if (
//     !homeTeam ||
//     !awayTeam ||
//     !homeTeamScore ||
//     !awayTeamScore ||
//     !stake ||
//     !selection
//   ) {
//     doc = deposit;
//   }
//   console.log(doc);

//   const { id } = req.params;

//   const user = await User.findOne({ _id: id });
//   if (!user) {
//     return next(new HttpError("User is not found", 404));
//   }
//   if (doc === deposit) {
//     const newDoc = await Model.create({ deposit: doc, user: id });
//     res.status(201).json({ newDoc });
//   } else {
//     const newDoc = await Model.create({
//       homeTeam: doc.homeTeam,
//       awayTeam: doc.awayTeam,
//       homeTeamScore: doc.homeTeamScore,
//       awayTeamScore: doc.awayTeamScore,
//       stake: doc.stake,
//       selection: doc.selection,
//       user: id,
//     });
//     res.status(201).json({ newDoc });
//   }
// };

const getAll = (Model) => async (req, res) => {
  const { id } = req.params;
  const docs = await Model.find({ user: id });
  res.status(200).json({ docs, length: docs.length });
};

const deleteOne = (Model) => async (req, res, next) => {
  const { id } = req.params;
  const doc = await Model.findOne({ _id: id });

  if (!doc) {
    return next(new HttpError("Not found such doc", 404));
  }
  await doc.remove();
  res.status(200).json({ msg: "success ,doc removed" });
};

module.exports = {
  getAll,
  deleteOne,
};
