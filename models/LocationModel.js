const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  ip: String,
  continent: String,
  continent_code: String,
  country: String,
  country_code: String,
  country_flag: String,
  country_capital: String,
  country_phone: String,
  country_neighbours: String,
  region: String,
  city: String,
  latitude: Number,
  longitude: Number,
  asn: String,
  org: String,
  isp: String,
  timezone: String,
  timezone_name: String,
  timezone_dstOffset: Number,
  timezone_gmtOffset: Number,
  timezone_gmt: String,
  currency: String,
  currency_code: String,
  currency_symbol: String,
  currency_rates: Number,
  currency_plural: String,
  browser: String,
  os: String,
  device: String,
  timestamp: Date
});

module.exports = mongoose.model('Location', locationSchema);
