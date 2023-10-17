import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

type ContactProps = {
  name: string;
  title: string;
  phone: string;
  email: string;
};

export default function ContactPage() {
  const params = useParams();

  const contactId = params.id as string;
  const { data: contact } = api.contact.getOneContact.useQuery({
    contactId,
  });

  return (
    <div>
      <h2>{contact?.name}</h2>
      <p>{contact?.title}</p>
    </div>
  );
}
