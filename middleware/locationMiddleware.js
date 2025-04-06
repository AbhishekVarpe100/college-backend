// middleware/locationMiddleware.js
const requestIp = require('request-ip');
const fetch = require('node-fetch');
const LocationModel = require('../models/LocationModel');

const locationMiddleware = async (req, res, next) => {
  const clientIp = requestIp.getClientIp(req);

  try {
    // Check if this IP already exists in the database
    const existing = await LocationModel.findOne({ ip: clientIp });

    if (!existing) {
      // Fetch geolocation data
      const geoRes = await fetch(`https://ipapi.co/${clientIp}/json/`);
      const data = await geoRes.json();

      // Save to MongoDB
      const newLocation = new LocationModel({
        ip: clientIp,
        city: data.city,
        region: data.region,
        country: data.country_name,
      });

      await newLocation.save();
      console.log(`✅ New user location saved: ${data.city}, ${data.country_name} (${clientIp})`);
    } else {
      console.log(`ℹ️ Existing user IP detected: ${clientIp}, skipping save`);
    }
  } catch (err) {
    console.error('❌ Location lookup error:', err.message);
  }

  next();
};

module.exports = locationMiddleware;

