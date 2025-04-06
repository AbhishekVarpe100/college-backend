const requestIp = require('request-ip');
const useragent = require('express-useragent');
const LocationModel = require('../models/LocationModel');

const locationMiddleware = async (req, res, next) => {
  let clientIp = requestIp.getClientIp(req) || req.ip;

  if (clientIp.includes('::ffff:')) clientIp = clientIp.split('::ffff:')[1];
  if (clientIp === '::1' || clientIp === '127.0.0.1') clientIp = '8.8.8.8';

  try {
    const existing = await LocationModel.findOne({ ip: clientIp });
    if (!existing) {
      const geoRes = await fetch(`https://ipwhois.app/json/${clientIp}`);
      const data = await geoRes.json();

      const agent = useragent.parse(req.headers['user-agent']);

      const newLocation = new LocationModel({
        ip: data.ip,
        type: data.type,
        continent: data.continent,
        continent_code: data.continent_code,
        country: data.country,
        country_code: data.country_code,
        country_flag: data.country_flag,
        country_capital: data.country_capital,
        country_phone: data.country_phone,
        country_neighbours: data.country_neighbours,
        region: data.region,
        city: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
        asn: data.asn,
        org: data.org,
        isp: data.isp,
        timezone: data.timezone,
        timezone_name: data.timezone_name,
        timezone_dstOffset: data.timezone_dstOffset,
        timezone_gmtOffset: data.timezone_gmtOffset,
        timezone_gmt: data.timezone_gmt,
        currency: data.currency,
        currency_code: data.currency_code,
        currency_symbol: data.currency_symbol,
        currency_rates: data.currency_rates,
        currency_plural: data.currency_plural,
        browser: `${agent.browser} ${agent.version}`,
        os: agent.os,
        device: `${agent.platform} ${agent.source}`,
        timestamp: new Date()
      });

      await newLocation.save();

      console.log(`✅ New location saved for ${clientIp}`);
    } else {
      console.log(`ℹ️ Existing IP: ${clientIp}`);
    }
  } catch (err) {
    console.error('❌ Location Middleware Error:', err.message);
  }

  next();
};

module.exports = locationMiddleware;
