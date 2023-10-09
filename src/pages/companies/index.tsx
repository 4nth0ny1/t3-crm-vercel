import Navbar from "~/components/Navbar";
import Companies from "../../components/Companies";
import CreateCompany from "~/components/CreateCompany";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useState } from "react";

export default function CompaniesPage() {
  const [openForm, setOpenForm] = useState(false);
  return (
    <>
      <Navbar />
      {!openForm && (
        <AiOutlinePlusSquare
          className="text-4xl"
          onClick={() => setOpenForm(!openForm)}
        />
      )}
      {openForm && (
        <CreateCompany openForm={openForm} setOpenForm={setOpenForm} />
      )}
      <Companies />
    </>
  );
}
