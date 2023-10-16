import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

export default function ContactList() {
  const router = useRouter();
  const ctx = api.useContext();

  const companyId = router.query.companyId as string;

  const { data: contacts } = api.contact.getAllContacts.useQuery({ companyId });

  return (
    <>
      {contacts?.map((contact) => {
        return (
          <ContactItem
            key={contact.id}
            name={contact.name}
            title={contact.title}
            phone={contact.phone}
            email={contact.email}
          />
        );
      })}
    </>
  );
}

type ContactProps = {
  name: string;
  title: string;
  phone: string;
  email: string;
};
const ContactItem = ({ name, title, phone, email }: ContactProps) => {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
};
