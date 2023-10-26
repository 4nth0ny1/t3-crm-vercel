import { useRouter } from "next/router";
import React, { useState } from "react";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AiFillDelete } from "react-icons/ai";
import ContactList from "~/components/ContactList";
import CreateContactForm from "~/components/CreateContactForm";
import Link from "next/link";

dayjs.extend(relativeTime);

export default function CompanyPage() {
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [showAddContactForm, setShowAddContactForm] = useState(false);
  const [content, setContent] = useState("");
  const router = useRouter();
  const ctx = api.useContext();

  const companyId = router.query.companyId as string;

  const { data: company } = api.company.getOneCompany.useQuery({ companyId });

  const { mutate: updateCompany } = api.company.updateCompany.useMutation({
    onSettled: async () => {
      await ctx.company.getAllCompanies.invalidate();
    },
  });

  const { data: notes } = api.companyNote.getAllNotes.useQuery({ companyId });

  const { mutate: createNote } = api.companyNote.createNote.useMutation({
    onSettled: async () => {
      await ctx.companyNote.getAllNotes.invalidate();
      setOpenNoteModal(!openNoteModal);
      updateCompany({
        companyId: companyId,
        name: company?.name as string,
        state: company?.state as string,
        city: company?.city as string,
        phone: company?.phone as string,
      });
    },
  });

  const { mutate: deleteMutation } = api.companyNote.deleteNote.useMutation({
    onSettled: async () => {
      await ctx.companyNote.getAllNotes.invalidate();
    },
  });

  // delete company with confirm logic
  const mutation = api.company.deleteCompany.useMutation({
    onSettled: async () => {
      await ctx.company.getAllCompanies.invalidate();
      await router.push("/companies");
    },
  });

  type CompanyProps = {
    companyId: string;
  };

  const onDeleteCompany = ({ companyId }: CompanyProps) => {
    if (
      confirm(
        "Are you sure you want to delete this company and all its records?",
      ) === false
    ) {
      return;
    } else {
      mutation.mutate({ companyId });
    }
  };

  const { data: contacts } = api.contact.getAllContacts.useQuery({ companyId });

  return (
    <div>
      <Navbar />
      {!openNoteModal ? (
        <div className="flex w-full flex-row gap-4 px-12 py-4">
          <div className="flex w-2/3 flex-col">
            <div className="mb-4 flex justify-between bg-base-200 p-4">
              <div>
                <h2 className="text-4xl">{company?.name}</h2>
                <p className="text-xl">{company?.phone}</p>
              </div>
              <p className="text-xl">
                {company?.city}, {company?.state}
              </p>
              <AiFillDelete
                className="cursor-pointer text-2xl text-red-600"
                onClick={() =>
                  onDeleteCompany({
                    companyId: companyId,
                  })
                }
              />
            </div>
            <div className="mb-4 flex flex-col justify-between bg-base-200 p-4">
              <h2 className="text-xl">Opportunities</h2>
              <div className="flex flex-row flex-wrap justify-center gap-10">
                {company?.opportunities.map((opp) => {
                  return (
                    <div className="rounded-xl border border-black p-4">
                      <h2>{opp.name}</h2>
                      <p>{opp.description}</p>
                      {contacts?.map((contact) => {
                        return (
                          <div>
                            {contact.id === opp.contactId && (
                              <Link
                                href={`/companies/contacts/${opp.contactId}`}
                              >
                                <p className="cursor-pointer underline">
                                  {contact.name}
                                </p>
                              </Link>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-base-200 p-4">
              <div className="mb-4 flex flex-row justify-between">
                <h2 className="text-xl">Notes</h2>
                <button
                  className="btn btn-primary"
                  onClick={() => setOpenNoteModal(!openNoteModal)}
                >
                  add note
                </button>
              </div>
              {notes?.map((note) => {
                return (
                  <div className="mb-8 flex flex-row justify-between gap-10 border-b border-gray-500 pb-4">
                    <p>{note?.content}</p>
                    <div className="flex flex-col">
                      <p>{`${dayjs(note?.createdAt).fromNow()}`}</p>
                      <div className="flex flex-row justify-end">
                        <AiFillDelete
                          onClick={() => deleteMutation(note?.id)}
                          className=" text-right text-2xl text-red-600 hover:cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex w-1/3 flex-col">
            <div className="mb-4 flex flex-col gap-4 bg-base-200 p-4">
              <div className="flex flex-row justify-between">
                <h2>Contacts</h2>
                {!showAddContactForm ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowAddContactForm(!showAddContactForm)}
                  >
                    add contact
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowAddContactForm(!showAddContactForm)}
                  >
                    cancel
                  </button>
                )}
              </div>
              {showAddContactForm && (
                <CreateContactForm companyId={companyId} />
              )}

              <ContactList />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[calc(100vh-84px)]  flex-row items-center justify-center">
          <div className="flex h-[500px] w-[500px] flex-col items-center justify-center rounded-xl border-2 border-blue-300 px-8 py-8">
            <h2 className="pb-4 text-2xl">Create a Note</h2>
            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                createNote({ content, companyId });
              }}
            >
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
