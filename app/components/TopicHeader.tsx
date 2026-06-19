export default function TopicHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-2 h-2 rounded bg-section-topic" />
      <h2 className="text-section-topic text-2xl">{label}</h2>
    </div>
  );
}
