const HttpError = require("../errors/error");

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
