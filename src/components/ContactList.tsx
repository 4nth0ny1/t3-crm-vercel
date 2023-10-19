import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

export default function ContactList() {
  const router = useRouter();

  const companyId = router.query.companyId as string;

  const { data: contacts } = api.contact.getAllContacts.useQuery({ companyId });
  console.log(contacts);

  return (
    <>
      {contacts?.map((contact) => {
        return (
          <ContactItem
            key={contact.id}
            id={contact.id}
            name={contact.name}
            title={contact.title}
            phone={contact.phone}
            email={contact.email}
            companyId={contact.companyId}
          />
        );
      })}
    </>
  );
}

type ContactProps = {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  companyId: string;
};
const ContactItem = ({
  id,
  name,
  title,
  phone,
  email,
  companyId,
}: ContactProps) => {
  console.log(companyId);
  return (
    <div className="flex flex-row justify-between border-b border-black">
      {/* <Link href={`${companyId}/contacts/${id}`}> */}
      <Link href={`/companies/contacts/${id}`}>
        <h2>{name}</h2>
      </Link>
      <p>{title}</p>
      <div className="flex flex-col gap-2">
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};
