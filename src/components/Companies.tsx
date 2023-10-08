import { api } from "../utils/api";

export default function Companies() {
  const { data: companies } = api.company.getAllCompanies.useQuery();
  console.log(companies);

  return (
    <div className="overflow-x-auto px-20">
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Company Name</th>
            <th>Phone</th>
            <th>City</th>
            <th>State</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        {companies?.map((company) => {
          return (
            <tbody>
              <tr>
                <th>{company.id}</th>
                <td>{company.name}</td>
                <td>{company.phone}</td>
                <td>{company.city}</td>
                <td>{company.state}</td>
                {/* <td>{company.updatedAt}</td> */}
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
