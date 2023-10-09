import Navbar from "~/components/Navbar";
import Companies from "../../components/Companies";
import CreateCompany from "~/components/CreateCompany";

export default function CompaniesPage() {
  return (
    <>
      <Navbar />
      <CreateCompany />
      <Companies />
    </>
  );
}
