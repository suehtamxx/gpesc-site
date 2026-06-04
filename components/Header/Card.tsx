import Link from 'next/link';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  href: string;
}

export function Card({ icon, title, href }: CardProps) {
  return (
    <Link href={href} className="group">
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-all duration-300 p-10 flex flex-col items-center justify-center cursor-pointer min-h-52 group-hover:border-blue-200">
        <div className="text-[#1a2e5a] mb-5 flex items-center justify-center w-16 h-16 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-sm font-bold text-[#1a2e5a] text-center tracking-widest uppercase">
          {title}
        </h3>
      </div>
    </Link>
  );
}
