interface HeroSectionProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export function HeroSection({ title, subtitle, children }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 mb-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-xl text-gray-600 mb-8">{subtitle}</p>
        {children}
      </div>
    </section>
  );
}
