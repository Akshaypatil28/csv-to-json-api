export const getPersonDetails = function(obj: any) {
  const { firstName, lastName } = obj.name;
  const name = `${firstName} ${lastName}`;
  const age = parseInt(obj.age, 10);
  const address = obj.address ? JSON.stringify(obj.address) : null;
  const additionalInfo = JSON.stringify(obj.additional_info || {});
  const values = [name, age, address, additionalInfo];
  return values;
}