## CSV TO JSON Converter
  This is an Express.js API developed in TypeScript that allows users to upload a CSV file, convert it to JSON, and store the data in a PostgreSQL database.

## Getting Started

### Prerequisites
Node.js and npm installed on your machine <br>
PostgreSQL installed and running locally

### Installation
Clone the repository: <a href="git@github.com:Akshaypatil28/csv-to-json-api.git"> git@github.com:Akshaypatil28/csv-to-json-api.git </a> <br>
cd csv-to-json-api <br>
npm install

update a .env file in the root directory with the following configuration: <br>

PG_USER=your_postgres_user <br>
PG_PASSWORD=your_postgres_password <br> 
PG_HOST=localhost <br>
PG_PORT=postgress_service_port <br>
PG_DATABASE=your_postgres_database <br>

Set up your PostgreSQL database and create a table to store the CSV data. For example: <br>
execute this query: <br>
CREATE TABLE public.users ( <br>
  "name" varchar NOT NULL, <br>
  age int4 NOT NULL, <br>
  address jsonb NULL, <br>
  additional_info jsonb NULL, <br>
  id serial4 NOT NULL <br>
);


### Running the Server
Build the TypeScript files: npm run build <br>
Start the server: npm start <br>
The server will run on http://localhost:3000 <br>

## API Endpoints

### Upload CSV File
URL: /upload <br>
Method: POST <br>
Request Body: <br>
  csvFile: The CSV file to upload
Response: <br>
200 OK: Data added successfully <br>
500 Internal Server Error





