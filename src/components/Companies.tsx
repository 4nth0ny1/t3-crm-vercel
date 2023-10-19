import Link from "next/link";
import { api } from "../utils/api";

export default function Companies() {
  const { data: companies } = api.company.getAllCompanies.useQuery();
  console.log(companies);

  return (
    <div className="overflow-x-auto px-20">
      <table className="table table-xs">
        <thead>
          <tr className="text-lg">
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
                <Link
                  href={`/companies/${company.id}`}
                  className="cursor-pointer text-base"
                >
                  <td>{company.name}</td>
                </Link>
                <td className="text-base">{company.phone}</td>
                <td className="text-base">{company.city}</td>
                <td className="text-base">{company.state}</td>
                <td className="text-base">placeholder</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
