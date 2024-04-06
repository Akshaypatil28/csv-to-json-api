import { Router } from "express";

const multer = require("multer");
const processDataController = require("../../controllers/csvToJsonConverter.controller");

const upload = multer({ dest: "uploads/" });

function csvToJsonAPI(router: Router) {
  router.post("/upload", upload.single("csvFile"), processDataController);
}

module.exports = csvToJsonAPI;
