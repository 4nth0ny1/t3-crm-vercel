import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CreateAttemptForm from "~/components/CreateAttemptForm";

dayjs.extend(relativeTime);

export default function ContactPage() {
  const router = useRouter();
  const [contactId, setContactId] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    const contactId = router.query.id as string;
    setContactId(contactId);
  }, [router.isReady, router.query]);

  const { data: contact } = api.contact.getOneContact.useQuery({
    contactId,
  });

  const { data: attempts } = api.attempt.getAllAttempts.useQuery({ contactId });

  return (
    <>
      <Navbar />
      <div className="flex w-full flex-row gap-4 px-12 py-4">
        <div className="flex w-2/3 flex-col">
          <div className="mb-4 flex justify-between bg-base-200 p-4">
            <div>
              <h2 className="text-4xl">{contact?.name}</h2>
              <p className="text-xl">{contact?.title}</p>
            </div>
          </div>
          <div className="bg-base-200 p-4">
            <div className="mb-4 flex flex-row justify-between">
              <h2 className="text-xl">Notes</h2>
            </div>
            {/* {notes?.map((note) => {
              return (
                <div className="mb-8 flex flex-row justify-between border-b border-gray-500 pb-4">
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
            })} */}
          </div>
        </div>
        <div className="flex w-1/3 flex-col">
          <div className="mb-4 flex flex-col gap-4 bg-base-200 p-4">
            <div className="flex flex-col justify-between">
              <h2 className="text-xl">Attempts</h2>
              <br></br>
              <CreateAttemptForm companyId={contact?.companyId as string} />
              <br></br>
              {attempts?.map((attempt) => {
                return (
                  <div className="border-b border-black py-2">
                    <div className="flex flex-row justify-between">
                      <p>{attempt?.type}</p>
                      <p>{`${dayjs(attempt?.createdAt).fromNow()}`}</p>
                    </div>
                    <p>{attempt?.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-base-200 p-4">
            <h2>Opportunities</h2>
          </div>
        </div>
      </div>
    </>
  );
}
