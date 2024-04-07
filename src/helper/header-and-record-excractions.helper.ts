const fs = require("fs");

export const getLinesAndHeaders = function (filePath: string) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");
  const headers = lines[0].trim().split(",");
  return [lines, headers];
}