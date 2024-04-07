async function insertIntoDB(values: Array<any>, dbClient: any) {
  const query = {
    text:  `INSERT INTO public.users (name, age, address, additional_info) VALUES ($1, $2, $3, $4) RETURNING id`,
    values
  }
  let result;
  try {
    result = await dbClient.query(query);
    console.log(`Inserted record with ID: ${result.rows[0].id}`);
  } catch (error) {
    console.error("Error inserting record:", error);
  }
}

module.exports = {
  insertIntoDB
}