function printAgeDistribution(rows: any) {
  const totalUsers = rows.reduce(
    (total: any, row: any) => total + parseInt(row.count),
    0
  );

  const formattedData = rows.map((row: any) => {
    const percentage = (parseInt(row.count) * 100.0) / totalUsers;
    return `${row.age_group.padEnd(12)} ${percentage.toFixed(2).padStart(5)}%`;
  });

  console.log("Age_Group   Distribution");
  console.log("----------------------------");
  formattedData.forEach((row: any) => console.log(row));
}

module.exports = {
  printAgeDistribution,
};
