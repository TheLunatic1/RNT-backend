const dns = require('dns');
const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoDnsServers = process.env.MONGO_DNS_SERVERS
    ?.split(',')
    .map((server) => server.trim())
    .filter(Boolean);

  if (mongoDnsServers?.length) {
    dns.setServers(mongoDnsServers);
  }

  if (!process.env.MONGO_URI) {
    console.error('MongoDB connection error: MONGO_URI is not set');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
