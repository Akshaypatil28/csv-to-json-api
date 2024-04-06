const fs = require("fs");
require("dotenv").config();
const dbC = require("./db.service");
const databaseConnection = dbC.dbConnect;

async function processData(filePath: string) {
  let dbClient;
  try {
    dbClient = databaseConnection();
    await dbClient.connect();
  } catch (error) {
    throw new Error("Error connecting to the database.");
  }

  if (!filePath) {
    return {
      error: "CSV file path is missing in the .env file",
    };
  }

  const [lines, headers] = getLinesAndHeaders(filePath);

  for (let record = 1; record < lines.length; record++) {
    const data = lines[record].trim().split(",");
    if (data.length === headers.length) {
      const [finalJSONObject, missingMandatoryFields] = generateJSONObject(headers, data);
      
      // Insert into PostgreSQL only if all mandatory fields are present
      if (missingMandatoryFields.length === 0) {
        await insertIntoDatabase(finalJSONObject, dbClient);
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

function getLinesAndHeaders(filePath: string) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");
  const headers = lines[0].trim().split(",");
  return [lines, headers];
}

function generateJSONObject(headers: Array<string>, data: Array<string>) {
  const missingMandatoryFields = [];
  const mandatoryFields = ["name.firstName", "name.lastName", "age"];
  const finalJSONObject: any = {};
  for (let field = 0; field < headers.length; field++) {
    const keys = headers[field].split(".");
    let tempJSONObject = finalJSONObject;

    for (let nestedKey = 0; nestedKey < keys.length - 1; nestedKey++) {
      if (!tempJSONObject[keys[nestedKey]]) {
        tempJSONObject[keys[nestedKey]] = {};
      }
      tempJSONObject = tempJSONObject[keys[nestedKey]];
    }

    const key = keys[keys.length - 1];
    const value = data[field].trim();
    tempJSONObject[key] = value;

    if (mandatoryFields.includes(keys.join(".")) && !value) {
      missingMandatoryFields.push(keys.join("."));
    }
  }
  return [finalJSONObject, missingMandatoryFields];
}

async function insertIntoDatabase(obj: any, dbClient: any) {
  const { firstName, lastName } = obj.name;
  const name = `${firstName} ${lastName}`;
  console.log(firstName);
  console.log(lastName);
  
  const age = parseInt(obj.age, 10);
  const address = obj.address ? JSON.stringify(obj.address) : null;
  const additionalInfo = JSON.stringify(obj.additional_info || {});
  console.log('working insied insertion');
  
  const query = {
    text: `INSERT INTO public.users (name, age, address, additional_info) VALUES ($1, $2, $3, $4) RETURNING id`,
    values: [name, age, address, additionalInfo],
  };

  try {
    const result = await dbClient.query(query);
    console.log(`Inserted record with ID: ${result.rows[0].id}`);
  } catch (error) {
    console.error("Error inserting record:", error);
  }
}
module.exports = { processData };
