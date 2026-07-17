interface TeamMemberProps {
  name: string;
  role: string;
  institution: string;
  image?: string;
}

export function TeamMember({ name, role, institution, image }: TeamMemberProps) {
  return (
    <div className="text-center">
      <div className="bg-gray-200 rounded-lg overflow-hidden mb-4 h-64 w-48 mx-auto flex items-center justify-center">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-400 text-4xl">👤</div>
        )}
      </div>
      <h3 className="text-lg font-bold text-gray-900">{name}</h3>
      <p className="text-gray-600 font-semibold">{role}</p>
      <p className="text-sm text-gray-500">{institution}</p>
    </div>
  );
}
