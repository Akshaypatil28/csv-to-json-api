// const localRouter = require("express").Router();
const multer = require("multer");
const processDataController = require("../../controllers/csvToJsonConverter.controller");

const upload = multer({ dest: "uploads/" });

function csvToJsonAPI(router: any) {
  router.post("/upload", upload.single("csvFile"), processDataController);
}

module.exports = csvToJsonAPI;
