import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";

export default function CompanyPage() {
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [content, setContent] = useState("");
  const router = useRouter();

  const companyId = router.query.companyId as string;

  const { data: company } = api.company.getOneCompany.useQuery({ companyId });

  const { data: notes } = api.companyNote.getAllNotes.useQuery({ companyId });
  console.log(notes);
  return (
    <div>
      <Navbar />
      {!openNoteModal ? (
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
              <div className="flex flex-row justify-between">
                <h2>Notes</h2>
                <button onClick={() => setOpenNoteModal(!openNoteModal)}>
                  add note
                </button>
              </div>
              {notes?.map((note) => {
                return (
                  <ul>
                    <li>{note?.content}</li>
                  </ul>
                );
              })}
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
      ) : (
        <div className="flex h-[calc(100vh-84px)]  flex-row items-center justify-center">
          <div className="flex h-[500px] w-[500px] flex-col items-center justify-center rounded-xl border-2 border-blue-300 px-8 py-8">
            <h2 className="pb-4 text-2xl">Create a Note</h2>
            <form className="w-full">
              <textarea
                className="textarea textarea-bordered h-[300px] w-full"
                placeholder="Add a note"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex flex-row justify-end gap-4">
                <button
                  onClick={() => setOpenNoteModal(!openNoteModal)}
                  className="btn btn-accent"
                >
                  Cancel
                </button>

                <button className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
