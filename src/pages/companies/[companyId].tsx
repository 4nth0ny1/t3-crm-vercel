import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function CompanyPage() {
  const router = useRouter();

  const companyId = router.query.companyId as string;

  const { data: company } = api.company.getOneCompany.useQuery({ companyId });
  console.log(company);
  return <div>{company?.name}</div>;
}
