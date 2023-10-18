import { useParams } from "next/navigation";
import { api } from "~/utils/api";

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
