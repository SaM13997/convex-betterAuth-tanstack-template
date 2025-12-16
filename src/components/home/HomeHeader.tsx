import type { Profile } from "@/lib/types";

interface HomeHeaderProps {
  userName: string;
  profilePicture?: string;
}

export function HomeHeader({ userName, profilePicture }: HomeHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {userName}!</h1>
        <p className="text-gray-400 text-sm">Ready to crush your workout?</p>
      </div>
      {profilePicture && (
        <img
          src={profilePicture}
          alt={userName}
          className="h-12 w-12 rounded-full object-cover"
        />
      )}
    </div>
  );
}

