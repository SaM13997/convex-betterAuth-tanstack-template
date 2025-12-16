import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const formatDateTime = (value: unknown) => {
  if (!value) {
    return undefined;
  }

  const date =
    value instanceof Date
      ? value
      : typeof value === "string" || typeof value === "number"
        ? new Date(value)
        : null;

  if (!date || Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toLocaleString();
};

function HomePage() {
  const { data: sessionData, isPending, error } = authClient.useSession();

  const session = sessionData?.session ?? null;
  const user = sessionData?.user ?? null;
  const displayName =
    (user?.name && user.name.trim()) ||
    (user?.email && user.email.trim()) ||
    session?.id ||
    undefined;
  const emailVerified =
    typeof user?.emailVerified === "boolean" ? user.emailVerified : undefined;

  const sessionCreatedAt = formatDateTime(session?.createdAt) ?? "—";
  const sessionExpiresAt = formatDateTime(session?.expiresAt) ?? "—";

  const statusMessage = isPending
    ? "Checking for an active session..."
    : session
      ? "You're currently signed in."
      : "You're not signed in yet.";

  const errorMessage = error?.message;

  return (
    <div className="bg-black px-4 py-6 min-h-screen text-white">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn("flex flex-col gap-4")}
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dummy App</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Minimal template wired up with Better Auth + Convex.
          </p>
        </div>

        <motion.section
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="rounded-xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Authentication status
              </h2>
              <p className="text-sm text-zinc-300">{statusMessage}</p>
            </div>
            {session ? (
              <span className="inline-flex items-center self-start rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/40">
                Logged in
              </span>
            ) : null}
          </div>

          <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4">
            {isPending ? (
              <p className="text-sm text-zinc-300">
                Loading session information&hellip;
              </p>
            ) : session ? (
              <div className="space-y-4 text-sm">
                <p className="text-emerald-300">
                  Signed in as{" "}
                  <span className="font-semibold text-white">
                    {displayName ?? "Authenticated user"}
                  </span>
                </p>
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-zinc-400">
                      User ID
                    </dt>
                    <dd className="mt-1 wrap-break-word text-white">
                      {user?.id ?? "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-zinc-400">
                      Email
                    </dt>
                    <dd className="mt-1 wrap-break-word text-white">
                      {user?.email ?? "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-zinc-400">
                      Session ID
                    </dt>
                    <dd className="mt-1 wrap-break-word text-white">
                      {session?.id ?? "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-zinc-400">
                      Email verified
                    </dt>
                    <dd className="mt-1 text-white">
                      {emailVerified === undefined
                        ? "—"
                        : emailVerified
                          ? "Yes"
                          : "No"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-zinc-400">
                      Signed in
                    </dt>
                    <dd className="mt-1 text-white">{sessionCreatedAt}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-zinc-400">
                      Expires
                    </dt>
                    <dd className="mt-1 text-white">{sessionExpiresAt}</dd>
                  </div>
                </dl>
              </div>
            ) : (
              <p className="text-sm text-zinc-300">
                No active session was found. Use the login link below to sign
                in.
              </p>
            )}

            {errorMessage ? (
              <p className="mt-3 text-xs text-red-300">
                Unable to load session details: {errorMessage}
              </p>
            ) : null}
          </div>
        </motion.section>
        {!session && (
          <Link
            to="/login"
            className="text-sm font-medium text-sky-400 transition hover:text-sky-300"
          >
            Go to login
          </Link>
        )}
        {session && (
          <Button onClick={() => authClient.signOut()}>Sign out</Button>
        )}
      </motion.div>
    </div>
  );
}
