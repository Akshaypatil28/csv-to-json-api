const {Router} = require("express");
const csvToJsonAPIEndpoints = require("./v1/csvToJsonConverter");

function routing()  {
  const router = Router();
  csvToJsonAPIEndpoints(router);
  return router
}
module.exports = { routing };
