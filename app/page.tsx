import HomeContent from "./components/HomeContent";
import { LangProvider } from "./lib/LangContext";

export default function Home() {
  return (
    <LangProvider locale="en">
      <HomeContent />
    </LangProvider>
  );
}
