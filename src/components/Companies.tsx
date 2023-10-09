import Link from "next/link";
import { api } from "../utils/api";

export default function Companies() {
  const { data: companies } = api.company.getAllCompanies.useQuery();
  console.log(companies);

  return (
    <div className="overflow-x-auto px-20">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Phone</th>
            <th>City</th>
            <th>State</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {companies?.map((company) => {
            return (
              <tr key={company.name}>
                <td>{company.name}</td>
                <td>{company.phone}</td>
                <td>{company.city}</td>
                <td>{company.state}</td>
                <td>placeholder</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
