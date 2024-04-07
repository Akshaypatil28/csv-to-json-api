export const getPersonDetails = function(personDetails: any) {
  const { firstName, lastName } = personDetails.name;
  const name = `${firstName} ${lastName}`;
  const age = parseInt(personDetails.age, 10);
  const address = personDetails.address ? JSON.stringify(personDetails.address) : null;
  const additionalInfo = JSON.stringify(personDetails.additional_info || {});
  const values = [name, age, address, additionalInfo];
  return values;
}