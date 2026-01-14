import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
  GithubIcon,
  LinkedinIcon,
} from "lucide-react";

import { capitialize } from "../lib/utils";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  /* ================= QUERIES ================= */
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  /* ================= EFFECT ================= */
  useEffect(() => {
    const outgoingIds = new Set();
    outgoingFriendReqs?.forEach((req) => {
      outgoingIds.add(req.recipient._id);
    });
    setOutgoingRequestsIds(outgoingIds);
  }, [outgoingFriendReqs]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-grow p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto space-y-10">

          {/* FRIENDS HEADER */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Your Friends
            </h2>
            <Link to="/notifications" className="btn btn-outline btn-sm">
              <UsersIcon className="mr-2 size-4" />
              Friend Requests
            </Link>
          </div>

          {/* FRIENDS LIST */}
          {loadingFriends ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : friends.length === 0 ? (
            <NoFriendsFound />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {friends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          )}

          {/* ================= RECOMMENDED USERS ================= */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Meet New Members
              </h2>
              <p className="opacity-70">
                Discover people based on your language preferences
              </p>
            </div>

            {loadingUsers ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg" />
              </div>
            ) : recommendedUsers.length === 0 ? (
              <div className="card bg-base-200 p-6 text-center">
                <h3 className="font-semibold text-lg">
                  No recommendations available
                </h3>
                <p className="opacity-70">
                  Check back later for new connections
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedUsers.map((user) => {
                  const hasRequestBeenSent =
                    outgoingRequestsIds.has(user._id);

                  return (
                    <div
                      key={user._id}
                      className="card bg-base-200 hover:shadow-lg transition-all"
                    >
                      <div className="card-body space-y-4">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/profile/${user._id}`}
                            className="avatar size-16 rounded-full bg-base-300 overflow-hidden flex items-center justify-center text-lg font-bold"
                          >
                            {user.profilePic ? (
                              <img
                                src={user.profilePic}
                                alt={user.fullName}
                              />
                            ) : (
                              <span>
                                {user.fullName?.charAt(0).toUpperCase() || "?"}
                              </span>
                            )}
                          </Link>
                          <div>
                            <h3 className="font-semibold">
                              {user.fullName}
                            </h3>
                            {user.location && (
                              <div className="flex items-center text-xs opacity-70">
                                <MapPinIcon className="size-3 mr-1" />
                                {user.location}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className="badge badge-secondary">
                            {getLanguageFlag(user.nativeLanguage)}
                            Native: {capitialize(user.nativeLanguage)}
                          </span>
                          <span className="badge badge-outline">
                            {getLanguageFlag(user.learningLanguage)}
                            Learning: {capitialize(user.learningLanguage)}
                          </span>
                        </div>

                        <button
                          className={`btn w-full ${
                            hasRequestBeenSent
                              ? "btn-disabled"
                              : "btn-primary"
                          }`}
                          disabled={hasRequestBeenSent || isPending}
                          onClick={() =>
                            sendRequestMutation(user._id)
                          }
                        >
                          {hasRequestBeenSent ? (
                            <>
                              <CheckCircleIcon className="size-4 mr-2" />
                              Request Sent
                            </>
                          ) : (
                            <>
                              <UserPlusIcon className="size-4 mr-2" />
                              Send Friend Request
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-base-300 bg-base-100">
        <div className="container mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">

          {/* BRAND */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Streamify</h3>
            <p className="opacity-70 leading-relaxed">
              Connect with people around the world through language,
              conversation, and culture.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 opacity-70">
              <li>
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:underline">
                
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL + CREDIT */}
          <div className="sm:text-right space-y-3">
            <div className="flex sm:justify-end gap-4">
              {/* 🔗 ADD YOUR LINKS HERE */}
              <a
                href="https://www.linkedin.com/in/kausar-ali-shaikh-294a73362/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="size-5" />
              </a>

              <a
                href="https://github.com/kausaralishaikh"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition"
                aria-label="GitHub"
              >
                <GithubIcon className="size-5" />
              </a>
            </div>

            <p className="opacity-70">
              © {new Date().getFullYear()} Streamify
            </p>

            <p className="font-medium">
              Made by <span className="text-primary">Kausar Ali</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
