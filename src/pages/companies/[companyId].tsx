import { useRouter } from "next/router";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";

export default function CompanyPage() {
  const router = useRouter();

  const companyId = router.query.companyId as string;

  const { data: company } = api.company.getOneCompany.useQuery({ companyId });

  return (
    <div>
      <Navbar />
      <div className="flex w-full flex-row gap-4 px-12 py-4">
        <div className="flex w-2/3 flex-col">
          <div className="mb-4 bg-gray-200 p-4">
            <h2>{company?.name}</h2>
            <p>{company?.phone}</p>
            <p>
              {company?.city}, {company?.state}
            </p>
          </div>
          <div className="bg-gray-200 p-4">
            <h2>Notes</h2>
          </div>
        </div>
        <div className="flex w-1/3 flex-col">
          <div className="mb-4 bg-gray-200 p-4">
            <h2>Contacts</h2>
          </div>
          <div className="bg-gray-200 p-4">
            <h2>Opportunities</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
