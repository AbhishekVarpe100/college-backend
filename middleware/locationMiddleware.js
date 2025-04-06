const requestIp = require('request-ip');
const useragent = require('express-useragent');
const LocationModel = require('../models/LocationModel');

const locationMiddleware = async (req, res, next) => {
  let clientIp = requestIp.getClientIp(req) || req.ip;

  // Normalize IP
  if (clientIp.includes('::ffff:')) clientIp = clientIp.split('::ffff:')[1];
  if (clientIp === '::1' || clientIp === '127.0.0.1') clientIp = '8.8.8.8'; // fallback for local

  try {
    const existing = await LocationModel.findOne({ ip: clientIp });
    if (!existing) {
      const geoRes = await fetch(`https://ipwhois.app/json/${clientIp}`);
      const data = await geoRes.json();

      const agent = useragent.parse(req.headers['user-agent']);

      const newLocation = new LocationModel({
        ip: data.ip,
        network: data.network || '',
        version: data.type || '',
        city: data.city || '',
        region: data.region || '',
        region_code: data.region_code || '',
        country: data.country || '',
        country_name: data.country_name || '',
        country_code: data.country_code || '',
        country_code_iso3: data.country_code_iso3 || '',
        country_capital: data.country_capital || '',
        country_tld: data.country_tld || '',
        continent_code: data.continent_code || '',
        in_eu: data.in_eu || false,
        postal: data.postal || '',
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
        utc_offset: data.utc_offset || '',
        country_calling_code: data.country_calling_code || '',
        currency: data.currency || '',
        currency_name: data.currency_name || '',
        languages: data.languages || '',
        country_area: data.country_area || 0,
        country_population: data.country_population || 0,
        asn: data.asn || '',
        org: data.org || '',
        browser: `${agent.browser} ${agent.version}`,
        os: agent.os,
        device: `${agent.platform} ${agent.source}`,
        timestamp: new Date()
      });

      await newLocation.save();

      console.log(`✅ Saved location: ${data.city}, ${data.country_name} (${clientIp})`);
    } else {
      console.log(`ℹ️ Existing IP detected: ${clientIp}`);
    }
  } catch (err) {
    console.error('❌ Error in location middleware:', err.message);
  }

  next();
};

module.exports = locationMiddleware;
