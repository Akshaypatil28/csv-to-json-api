const { Client } = require('pg');

const confDetails = {
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'csv_to_json',
  password: process.env.PG_PASSWORD || 'root1234',
  port: process.env.PG_PORT || 5432,
};


async function dbConnect() {
  const client = new Client(confDetails);
  try {
    await client.connect();
  } catch (error) {
    throw new Error("Error connecting to the database.");
  }
  return client;  
}

module.exports = {
  dbConnect
};