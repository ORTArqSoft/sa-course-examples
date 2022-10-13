const mongoose = require("mongoose");
const Bill = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  amount: { type: Number, default: 0 },
  category: { type: mongoose.Schema.Types.Mixed },
  familyId: { type: mongoose.Schema.Types.Mixed },
  description: { type: String, default: null },
});

module.exports = mongoose.model("Bills", Bill);
