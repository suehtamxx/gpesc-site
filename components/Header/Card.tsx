import Link from 'next/link';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  href: string;
}

export function Card({ icon, title, href }: CardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-8 flex flex-col items-center justify-center cursor-pointer min-h-64 hover:bg-gray-50">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900 text-center">{title}</h3>
      </div>
    </Link>
  );
}
