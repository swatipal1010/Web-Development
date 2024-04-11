const mongoose = require("mongoose");

const historySellerSchema = new mongoose.Schema({
  auctionPlacedDate: {
    type: Date,
    //required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["sold", "unsold"],
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  numberOfBidders: {
    type: Number,
    required: true,
    default: 0,
  },
  finalDealPrice: {
    type: Number,
    required: true,
  },
});

// Define and export the HistorySeller model based on historySellerSchema
const HistorySeller = mongoose.model("HistorySeller", historySellerSchema);
module.exports = HistorySeller;
