import React, { useState } from "react";
import { api } from "~/utils/api";

type CreateContactFormProps = {
  companyId: string;
};

export default function CreateContactForm({
  companyId,
}: CreateContactFormProps) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const ctx = api.useContext();

  const { mutate } = api.contact.createContact.useMutation({
    onSettled: async () => {
      await ctx.contact.getAllContacts.invalidate();
      setName("");
      setTitle("");
      setPhone("");
      setEmail("");
    },
  });

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ name, title, phone, email, companyId });
      }}
    >
      <input
        type="text"
        placeholder="Enter Name ..."
        className="input input-bordered w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Title ..."
        className="input input-bordered w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Phone ..."
        className="input input-bordered w-full"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Email ..."
        className="input input-bordered w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex flex-row justify-end">
        <button className="btn btn-primary w-1/5">Add Contact</button>
      </div>
    </form>
  );
}
