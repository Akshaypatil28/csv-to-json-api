const dbConnectionObject = require("./db.service");


async function calculateAgeDistribution() {
  const dbClient = await dbConnectionObject.dbConnect();
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
