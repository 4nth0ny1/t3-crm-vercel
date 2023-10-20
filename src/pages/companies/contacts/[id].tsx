import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CreateAttemptForm from "~/components/CreateAttemptForm";
import { AiFillDelete } from "react-icons/ai";
import CreateOpportunityForm from "~/components/CreateOpportunityForm";

dayjs.extend(relativeTime);

export default function ContactPage() {
  const router = useRouter();
  const [contactId, setContactId] = useState("");
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [content, setContent] = useState("");
  const ctx = api.useContext();

  useEffect(() => {
    if (!router.isReady) return;
    const contactId = router.query.id as string;
    setContactId(contactId);
  }, [router.isReady, router.query]);

  const { data: contact } = api.contact.getOneContact.useQuery({
    contactId,
  });

  const companyId = contact?.companyId as string;

  const { data: contactNotes } = api.contactNote.getAllContactNotes.useQuery({
    contactId,
  });

  const { mutate: createNote } = api.contactNote.createContactNote.useMutation({
    onSettled: async () => {
      await ctx.contactNote.getAllContactNotes.invalidate();
      setOpenNoteModal(!openNoteModal);
    },
  });

  const { mutate: deleteContactNoteMutation } =
    api.contactNote.deleteContactNote.useMutation({
      onSettled: async () => {
        await ctx.contactNote.getAllContactNotes.invalidate();
      },
    });

  const { data: attempts } = api.attempt.getAllAttempts.useQuery({ contactId });

  const { mutate: deleteMutation } = api.attempt.deleteAttempt.useMutation({
    onSettled: async () => {
      await ctx.attempt.getAllAttempts.invalidate();
    },
  });

  const { data: opportunities } = api.opportunity.getAllOpportunities.useQuery({
    contactId,
  });

  return (
    <>
      <Navbar />
      {!openNoteModal ? (
        <div className="flex w-full flex-row gap-4 px-12 py-4">
          <div className="flex w-2/3 flex-col">
            <div className="mb-4 flex justify-between bg-base-200 p-4">
              <div>
                <h2 className="text-4xl">{contact?.name}</h2>
                <p className="text-xl">{contact?.title}</p>
                <p className="text-xl">{contact?.phone}</p>
                <p className="text-xl">{contact?.email}</p>
              </div>
            </div>
            <div className="mb-4 flex flex-col gap-4 bg-base-200 p-4">
              <div className="flex flex-col justify-between">
                <h2 className="text-xl">Attempts</h2>
                <br></br>
                <CreateAttemptForm companyId={contact?.companyId as string} />
                <br></br>
                {attempts?.map((attempt) => {
                  return (
                    <div className="border-b border-black py-2">
                      <div className="flex flex-row justify-between pb-2">
                        <p>{attempt?.type}</p>
                        <div className="text-right">
                          <p>{`${dayjs(attempt?.createdAt).fromNow()}`}</p>
                          <div className="flex w-full flex-row justify-end">
                            <AiFillDelete
                              className="cursor-pointer text-red-500"
                              onClick={() => deleteMutation(`${attempt?.id}`)}
                            />
                          </div>
                        </div>
                      </div>
                      <p>{attempt?.content}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex w-1/3 flex-col gap-4">
            <div className="bg-base-200 p-4">
              <h2 className="text-xl">Opportunities</h2>
              <CreateOpportunityForm companyId={companyId} />
              {opportunities?.map((opp) => {
                return (
                  <div>
                    <h2>{opp?.name}</h2>
                    <p>{opp?.description}</p>
                  </div>
                );
              })}
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
              {contactNotes?.map((note) => {
                return (
                  <div className="mb-8 flex flex-row justify-between border-b border-gray-500 pb-4">
                    <p>{note?.content}</p>
                    <div className="flex flex-col">
                      <p>{`${dayjs(note?.createdAt).fromNow()}`}</p>
                      <div className="flex flex-row justify-end">
                        <AiFillDelete
                          onClick={() => deleteContactNoteMutation(note?.id)}
                          className=" text-right text-2xl text-red-600 hover:cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
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
                createNote({ content, contactId, companyId });
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
    </>
  );
}
