import { AgeGroupData } from "../Interfaces/age-group-data.interface";

function printAgeDistribution(rows: AgeGroupData[]) {
  const totalUsers = rows.reduce(
    (total: number, row: AgeGroupData) => total + parseInt(row.count),
    0
  );

  const formattedData = rows.map((row: AgeGroupData) => {
    const percentage = (parseInt(row.count) * 100.0) / totalUsers;
    return `${row.age_group.padEnd(12)} ${percentage.toFixed(2).padStart(5)}%`;
  });

  console.log("Age_Group   Distribution");
  console.log("----------------------------");
  formattedData.forEach((row: string) => console.log(row));
}

module.exports = {
  printAgeDistribution,
};
