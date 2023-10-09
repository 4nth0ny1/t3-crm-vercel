import Navbar from "~/components/Navbar";
import Companies from "../../components/Companies";
import CreateCompany from "~/components/CreateCompany";
import { useState } from "react";

export default function CompaniesPage() {
  const [openForm, setOpenForm] = useState(false);
  return (
    <>
      <Navbar />
      <div className="flex flex-row justify-end px-20">
        {!openForm && (
          <div
            className="mb-4 flex flex-row items-center gap-4 rounded-xl border-2 border-primary bg-primary p-2 text-white"
            onClick={() => setOpenForm(!openForm)}
          >
            <h2>Create Company</h2>
          </div>
        )}
      </div>
      {openForm && (
        <CreateCompany openForm={openForm} setOpenForm={setOpenForm} />
      )}
      <Companies />
    </>
  );
}
