import { useRouter } from "next/router";
import React, { useState } from "react";
import { api } from "~/utils/api";

type CreateAttemptFormProps = {
  companyId: string;
};

export default function CreateAttemptForm({
  companyId,
}: CreateAttemptFormProps) {
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();
  const contactId = router.query.id as string;
  const ctx = api.useContext();

  const { mutate } = api.attempt.createAttempt.useMutation({
    onSettled: async () => {
      await ctx.attempt.getAllAttempts.invalidate();
      setType("");
      setContent("");
    },
  });

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ type, content, contactId, companyId });
      }}
    >
      <select
        className="select input-bordered w-full max-w-xs"
        onChange={(e) => setType(e.target.value)}
      >
        <option disabled selected>
          What type of attempt did you make?
        </option>
        <option>Call</option>
        <option>Email</option>
      </select>
      <input
        type="text"
        placeholder="Enter Content ..."
        className="input input-bordered w-full"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex flex-row justify-end">
        <button className="btn btn-primary w-1/5">Add an Attempt</button>
      </div>
    </form>
  );
}
