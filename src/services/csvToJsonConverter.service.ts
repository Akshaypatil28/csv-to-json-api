import { getLinesAndHeaders } from "../helper/header-and-record-excractions.helper";
import { generateJSONObject } from "../helper/json-object-generator.helper";
import { getPersonDetails } from "../helper/person-details.helper";

require("dotenv").config();
const dbConnectionObject = require("./db.service");
const personDetails = require("../models/person-details.model");

async function processData(filePath: string) {
  let dbClient;
  
  try {
    dbClient = dbConnectionObject.dbConnect();
    await dbClient.connect();
  } catch (error) {
    throw new Error("Error connecting to the database.");
  }

  if (!filePath) {
    throw new Error("CSV file path is missing in the .env file");
  }

  const [lines, headers] = getLinesAndHeaders(filePath);
  for (let record = 1; record < lines.length; record++) {
    const data = lines[record].trim().split(",");
    if (data.length === headers.length) {
      const [finalJSONObject, missingMandatoryFields] = generateJSONObject(headers, data); 
      // Insert into PostgreSQL only if all mandatory fields are present
      if (missingMandatoryFields.length === 0) {
        const values = getPersonDetails(finalJSONObject);
        await personDetails.insertIntoDB(values, dbClient);
      } else {
        console.error(
          `Record at line ${
            record + 1
          } is missing mandatory fields: ${missingMandatoryFields.join(", ")}`
        );
      }
    }
  }    
  dbClient.end();
}

module.exports = { processData };
