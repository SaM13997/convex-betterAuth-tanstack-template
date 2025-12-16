import { Link } from "@tanstack/react-router";
import { Dumbbell } from "lucide-react";
import type { Workout } from "@/lib/types";

interface RecentWorkoutsListProps {
  workouts: Workout[];
  isLoading: boolean;
}

export function RecentWorkoutsList({
  workouts,
  isLoading,
}: RecentWorkoutsListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Recent Workouts</h2>
        <Link to="/workouts" className="text-purple-400 text-sm">
          View All
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white/5 rounded-2xl p-4 animate-pulse"
            >
              <div className="h-4 bg-white/10 rounded mb-2"></div>
              <div className="h-3 bg-white/10 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : workouts.length === 0 ? (
        <div className="bg-white/5 rounded-2xl p-6 text-center">
          <p className="text-gray-400 mb-2">No workouts yet</p>
          <p className="text-gray-500 text-sm">
            Start your first workout above!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {workouts.map((workout) => (
            <Link
              key={workout.id}
              to={`/workout/${workout.id}`}
              className="block bg-white/5 hover:bg-white/10 rounded-2xl p-4 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">
                    {new Date(workout.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {workout.duration} min • {workout.exercises.length}{" "}
                    exercises
                  </p>
                </div>
                <div className="text-gray-400">
                  <Dumbbell className="h-5 w-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

