const { Client } = require('pg');

const confDetails = {
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'csv_to_json',
  password: process.env.PG_PASSWORD || 'root1234',
  port: process.env.PG_PORT || 5432,
};


function dbConnect() {
  const client = new Client(confDetails);
  
  return client;  
}

module.exports = {
  dbConnect
};