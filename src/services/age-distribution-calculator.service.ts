const dbCObject = require("./db.service");
const dbConnection = dbCObject.dbConnect;

async function calculateAgeDistribution() {
  let dbClient;
  try {
    dbClient = dbConnection();
    await dbClient.connect();
  } catch (error) {
    throw new Error("Error connecting to the database.");
  }

  const query = `
    SELECT
        CASE
          WHEN age < 20 THEN '<20'
          WHEN age BETWEEN 20 AND 40 THEN '20-40'
          WHEN age BETWEEN 41 AND 60 THEN '41-60'
          ELSE '>60'
        END AS age_group,
        COUNT(*) AS count,
        (SELECT COUNT(*) FROM public.users) AS total_count
      FROM
        public.users
      GROUP BY
        age_group
      ORDER BY
        age_group;
    `;

  const { rows } = await dbClient.query(query);
  dbClient.end();
  return rows;
}

module.exports = { calculateAgeDistribution };
