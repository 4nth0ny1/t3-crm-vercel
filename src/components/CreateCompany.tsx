import { api } from "../utils/api";
import { useState } from "react";

type CreateCompanyProps = {
  openForm: boolean;
  setOpenForm: (arg0: boolean) => void;
};

export default function CreateCompany({
  openForm,
  setOpenForm,
}: CreateCompanyProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const ctx = api.useContext();

  const { mutate } = api.company.createCompany.useMutation({
    onSettled: async () => {
      await ctx.company.getAllCompanies.invalidate();
      setName("");
      setPhone("");
      setCity("");
      setState("");
      setOpenForm(!openForm);
    },
  });

  return (
    <form
      className="flex flex-col items-center gap-4 py-20"
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ name, phone, city, state });
      }}
    >
      <input
        type="text"
        placeholder="Company Name"
        className="input input-bordered w-full max-w-xs"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        required
        className="input input-bordered w-full max-w-xs"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        placeholder="City"
        className="input input-bordered w-full max-w-xs"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="State"
        className="input input-bordered w-full max-w-xs"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <div className="flex flex-row gap-4">
        <button
          onClick={() => setOpenForm(!openForm)}
          className="btn btn-accent"
        >
          Cancel
        </button>

        <button className="btn btn-primary">Create</button>
      </div>
    </form>
  );
}
