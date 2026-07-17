interface ContentSectionProps {
  title: string;
  children: React.ReactNode;
}

export function ContentSection({ title, children }: ContentSectionProps) {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">{title}</h2>
      <div className="prose prose-lg max-w-none text-gray-700">
        {children}
      </div>
    </section>
  );
}
