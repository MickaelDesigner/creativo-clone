import { LangProvider } from "../lib/LangContext";
import BlogContent from "../components/BlogContent";

export default function BlogPage() {
  return (
    <LangProvider locale="en">
      <BlogContent />
    </LangProvider>
  );
}
