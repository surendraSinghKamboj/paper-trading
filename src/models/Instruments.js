// instrument.js
const mongoose = require("mongoose");

const instrumentSchema = new mongoose.Schema({
  instrument_key: String,
  exchange_token: String,
  tradingsymbol: String,
  name: String,
  last_price: Number,
  expiry: String,
  strike: String,
  tick_size: String,
  lot_size: String,
  instrument_type: String,
  option_type: String,
  exchange: String,
});

mongoose.models = {};

const Instrument = mongoose.model("Instrument", instrumentSchema);

module.exports = Instrument;
