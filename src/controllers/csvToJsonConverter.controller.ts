const csvParser = require('../services/csvToJsonConverter.service');
const calculator = require('../services/age-distribution-calculator.service');
const printer = require('../services/print-age-distribution.service');

async function processDataAndInsert(req: any, res:any) {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  try {
    await csvParser.processData(req.file.path);
    const distributionData = await calculator.calculateAgeDistribution();  
    printer.printAgeDistribution(distributionData);
    res.end("Data added successfully");
  } catch (error) {
    console.error('Error processing data and inserting into database:', error);
    res.send(500);
  }
}

module.exports = processDataAndInsert;