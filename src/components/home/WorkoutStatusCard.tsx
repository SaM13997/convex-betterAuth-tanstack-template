import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Dumbbell, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Workout } from "@/lib/types";

interface WorkoutStatusCardProps {
  activeWorkout: Workout | null;
  isStarting: boolean;
  onStartWorkout: () => void;
}

export function WorkoutStatusCard({
  activeWorkout,
  isStarting,
  onStartWorkout,
}: WorkoutStatusCardProps) {
  return (
    <motion.div
      layout
      layoutId="workout-status-container"
      onClick={
        !activeWorkout && !isStarting ? onStartWorkout : undefined
      }
      className={cn(
        "rounded-3xl p-6 relative",
        activeWorkout
          ? "bg-green-400/20 border border-green-400/30"
          : "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
        !activeWorkout && !isStarting && "cursor-pointer",
        isStarting && "opacity-50"
      )}
    >
      {activeWorkout ? (
        <Link
          to={`/workout/${activeWorkout.id}`}
          className="absolute inset-0"
          aria-label="View active workout"
        />
      ) : null}
      <div className="flex items-center justify-between">
        <div className="text-left">
          <motion.h2
            layoutId="workout-status-title"
            className={cn(
              "text-xl font-bold",
              activeWorkout && "text-green-400"
            )}
          >
            {activeWorkout ? "Active Workout" : "Start New Workout"}
          </motion.h2>
          <motion.p
            layoutId="workout-status-subtitle"
            className={cn(
              "text-sm",
              activeWorkout ? "text-green-300" : "text-purple-100"
            )}
          >
            {activeWorkout
              ? "In Progress"
              : isStarting
              ? "Starting..."
              : "Begin your fitness session"}
          </motion.p>
        </div>
        <motion.div
          layoutId="workout-status-icon"
          className={cn(
            "rounded-full h-12 w-12 flex items-center justify-center",
            activeWorkout ? "bg-green-400/20" : "bg-white/20"
          )}
        >
          {activeWorkout ? (
            <Dumbbell className="h-6 w-6 text-green-400" />
          ) : (
            <Plus className="h-6 w-6" />
          )}
        </motion.div>
      </div>
      {activeWorkout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-sm text-gray-300 mt-4"
        >
          <p>
            Started:{" "}
            {new Date(activeWorkout.startTime!).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p>Exercises: {activeWorkout.exercises.length}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

