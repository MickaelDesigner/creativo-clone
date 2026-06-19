import { LangProvider } from "../lib/LangContext";
import ContactContent from "../components/ContactContent";

export default function ContactPage() {
  return (
    <LangProvider locale="en">
      <ContactContent />
    </LangProvider>
  );
}
