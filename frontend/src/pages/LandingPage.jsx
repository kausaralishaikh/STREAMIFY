import { Link } from "react-router";
import { ShipWheelIcon, Globe2Icon, MessageCircleIcon, VideoIcon, UsersIcon } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 via-base-200 to-base-100">
      {/* NAVBAR */}
      <header className="border-b border-base-300">
        <div className="container mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShipWheelIcon className="size-8 text-primary" />
            <span className="text-2xl sm:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Streamify
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login" className="btn btn-ghost btn-sm">
              Log in
            </Link>
            <Link to="/signup" className="btn btn-primary btn-sm">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main className="container mx-auto px-4 sm:px-8 py-10 sm:py-16 lg:py-20">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT: TEXT */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium">
              <Globe2Icon className="size-4" />
              Talk to the world, in any language
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Fluent conversations.{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Real connections.
              </span>
            </h1>

            <p className="text-base sm:text-lg opacity-80 max-w-xl">
              Streamify matches you with language partners worldwide for crystal-clear video
              calls and instant chat. Practice in real time, build friendships, and speak with
              confidence.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/signup" className="btn btn-primary btn-lg gap-2">
                <VideoIcon className="size-5" />
                Start your first call
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg">
                I already have an account
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 text-sm opacity-80 pt-2">
              <div className="flex items-center gap-2">
                <UsersIcon className="size-4 text-primary" />
                <span>Find native speakers in seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircleIcon className="size-4 text-secondary" />
                <span>Built-in messaging & video rooms</span>
              </div>
            </div>
          </div>

          {/* RIGHT: ILLUSTRATION */}
          <div className="relative">
            <div className="hidden sm:block absolute -inset-8 rounded-3xl bg-gradient-to-tr from-primary/15 via-secondary/10 to-accent/10 blur-2xl" />

            <div className="relative card bg-base-200/90 backdrop-blur-xl shadow-2xl border border-base-300 rounded-3xl overflow-hidden">
              <div className="p-6 sm:p-8 space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-video rounded-2xl bg-base-300 flex items-center justify-center text-xs sm:text-sm">
                    Your camera
                  </div>
                  <div className="aspect-video rounded-2xl bg-base-300 flex items-center justify-center text-xs sm:text-sm">
                    Partner preview
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-3">
                    <div className="avatar size-9 border-2 border-base-200">
                      <img src="/i.png" alt="User 1" />
                    </div>
                    <div className="avatar size-9 border-2 border-base-200">
                      <img src="/vite.svg" alt="User 2" />
                    </div>
                  </div>
                  <p className="text-xs opacity-70">
                    “Streamify made speaking with natives feel natural and fun.”
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-base-300">
                  <div className="flex flex-col text-xs opacity-80">
                    <span>Perfect for daily 15-minute practice</span>
                    <span className="text-success font-medium">
                      No downloads. Just click and talk.
                    </span>
                  </div>
                  <Link to="/signup" className="btn btn-sm btn-secondary normal-case">
                    Join now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h3 className="font-semibold text-lg mb-2">Smart matching</h3>
              <p className="text-sm opacity-80">
                Streamify recommends partners based on your native and learning languages, so
                every conversation moves you closer to fluency.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h3 className="font-semibold text-lg mb-2">Video + chat, in one place</h3>
              <p className="text-sm opacity-80">
                Hop into a call, send a quick message, or share corrections without switching
                apps or losing context.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h3 className="font-semibold text-lg mb-2">Designed for learners</h3>
              <p className="text-sm opacity-80">
                Clean, distraction-free UI tailored for focused practice and building real
                friendships around the world.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;

