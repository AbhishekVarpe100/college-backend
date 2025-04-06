const requestIp = require('request-ip');
const useragent = require('useragent');
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
      const data = await geoRes.json();

      const agent = useragent.parse(req.headers['user-agent']);

      const newLocation = new LocationModel({
        ip: data.ip,
        network: data.network,
        version: data.version,
        city: data.city,
        region: data.region,
        region_code: data.region_code,
        country: data.country,
        country_name: data.country_name,
        country_code: data.country_code,
        country_code_iso3: data.country_code_iso3,
        country_capital: data.country_capital,
        country_tld: data.country_tld,
        continent_code: data.continent_code,
        in_eu: data.in_eu,
        postal: data.postal,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
        utc_offset: data.utc_offset,
        country_calling_code: data.country_calling_code,
        currency: data.currency,
        currency_name: data.currency_name,
        languages: data.languages,
        country_area: data.country_area,
        country_population: data.country_population,
        asn: data.asn,
        org: data.org,
        browser: `${agent.family} ${agent.major}.${agent.minor}.${agent.patch}`,
        os: `${agent.os.family} ${agent.os.major}`,
        device: `${agent.device.family} ${agent.device.major || '0'}.${agent.device.minor || '0'}.${agent.device.patch || '0'}`,
        timestamp: new Date(),
      });

      await newLocation.save();
      console.log(`✅ Saved: ${data.city}, ${data.country_name} | ${agent.family} (${clientIp})`);
    } else {
      console.log(`ℹ️ Existing IP: ${clientIp}, skipping save`);
    }
  } catch (err) {
    console.error('❌ Location lookup error:', err.message);
  }

  next();
};

module.exports = locationMiddleware;
