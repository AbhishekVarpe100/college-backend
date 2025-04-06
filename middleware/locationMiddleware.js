const requestIp = require('request-ip');
const LocationModel = require('../models/LocationModel');

const locationMiddleware = async (req, res, next) => {
  let clientIp = requestIp.getClientIp(req) || req.ip;

  // Clean IPv6 local or mapped IPs
  if (clientIp.includes('::ffff:')) clientIp = clientIp.split('::ffff:')[1];
  if (clientIp === '::1' || clientIp === '127.0.0.1') clientIp = '8.8.8.8'; // test IP for local dev

  try {
    const existing = await LocationModel.findOne({ ip: clientIp });

    if (!existing) {
      const geoRes = await fetch(`https://ipapi.co/${clientIp}/json/`);
      const data = await geoRes.json(); // ✅ await here

      console.log(`✅ New user location saved: ${data.city}, ${data.country_name} (${clientIp})`);

      // Optional: Save to DB
      const newLocation = new LocationModel({
        ip: clientIp,
        city: data.city,
        region: data.region,
        country: data.country_name,
      });
      await newLocation.save();
    } else {
      console.log(`ℹ️ Existing user IP detected: ${clientIp}, skipping save`);
    }
  } catch (err) {
    console.error('❌ Location lookup error:', err.message);
  }

  next();
};

module.exports = locationMiddleware;
