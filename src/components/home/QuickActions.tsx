import { Link } from "@tanstack/react-router";
import { TrendingUp, Weight } from "lucide-react";

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Link
        to="/stats"
        className="bg-white/10 rounded-2xl p-4 flex flex-col items-center text-center hover:bg-white/15 transition-colors"
      >
        <div className="bg-blue-500/20 rounded-full h-12 w-12 flex items-center justify-center mb-3">
          <TrendingUp className="h-6 w-6 text-blue-400" />
        </div>
        <span className="font-medium">Stats</span>
        <span className="text-gray-400 text-sm">View progress</span>
      </Link>
      <Link
        to="/weight"
        className="bg-white/10 rounded-2xl p-4 flex flex-col items-center text-center hover:bg-white/15 transition-colors"
      >
        <div className="bg-orange-500/20 rounded-full h-12 w-12 flex items-center justify-center mb-3">
          <Weight className="h-6 w-6 text-orange-400" />
        </div>
        <span className="font-medium">Weight</span>
        <span className="text-gray-400 text-sm">Track weight</span>
      </Link>
    </div>
  );
}

