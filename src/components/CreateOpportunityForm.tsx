import { useRouter } from "next/router";
import React, { useState } from "react";
import { api } from "~/utils/api";

type CreateOpportunityFormProps = {
  companyId: string;
};

export default function CreateOpportunityForm({
  companyId,
}: CreateOpportunityFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const contactId = router.query.id as string;
  const ctx = api.useContext();

  const { mutate } = api.opportunity.createOpportunity.useMutation({
    onSettled: async () => {
      await ctx.opportunity.getAllOpportunities.invalidate();
      setName("");
      setDescription("");
    },
  });

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ name, description, contactId, companyId });
      }}
    >
      <input
        type="text"
        placeholder="Enter Name of Opportunity ..."
        className="input input-bordered w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Description ..."
        className="input input-bordered w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex flex-row justify-end">
        <button className="btn btn-primary w-2/5">Add an Opportunity</button>
      </div>
    </form>
  );
}
