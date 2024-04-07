export const generateJSONObject = function (
  headers: Array<string>,
  data: Array<string>
) {
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
};
