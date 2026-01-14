import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  SearchIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { capitialize } from "../lib/utils";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
  const queryClient = useQueryClient();

  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
      toast.success("Friend request sent 🚀");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Unable to send friend request";
      toast.error(message);
    },
  });

  /* ================= EFFECTS ================= */
  useEffect(() => {
    const outgoingIds = new Set();
    outgoingFriendReqs?.forEach((req) => {
      outgoingIds.add(req.recipient._id);
    });
    setOutgoingRequestsIds(outgoingIds);
  }, [outgoingFriendReqs]);

  const filteredRecommendedUsers = useMemo(() => {
    if (!searchTerm.trim()) return recommendedUsers;

    const lower = searchTerm.toLowerCase();

    return recommendedUsers.filter((user) => {
      return (
        user.fullName?.toLowerCase().includes(lower) ||
        user.nativeLanguage?.toLowerCase().includes(lower) ||
        user.learningLanguage?.toLowerCase().includes(lower)
      );
    });
  }, [recommendedUsers, searchTerm]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto space-y-10">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Friends & Connections
              </h1>
              <p className="opacity-70 mt-1">
                Manage your friends and discover new people to practice with.
              </p>
            </div>

            <Link to="/notifications" className="btn btn-outline btn-sm">
              <UsersIcon className="mr-2 size-4" />
              View Friend Requests
            </Link>
          </div>

          {/* YOUR FRIENDS */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                Your Friends
              </h2>
            </div>

            {loadingFriends ? (
              <div className="flex justify-center py-10">
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
          </section>

          {/* DISCOVER NEW FRIENDS */}
          <section className="space-y-5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Add New Friends
                </h2>
                <p className="opacity-70">
                  Search for people by name or language and send them a friend
                  request.
                </p>
              </div>

              <label className="input input-bordered flex items-center gap-2 w-full md:w-80">
                <SearchIcon className="size-4 opacity-70" />
                <input
                  type="text"
                  className="grow"
                  placeholder="Search by name or language..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </label>
            </div>

            {loadingUsers ? (
              <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-lg" />
              </div>
            ) : filteredRecommendedUsers.length === 0 ? (
              <div className="card bg-base-200 p-6 text-center">
                <h3 className="font-semibold text-lg">
                  No matching users found
                </h3>
                <p className="opacity-70">
                  Try a different name or language, or check back later for new
                  members.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecommendedUsers.map((user) => {
                  const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                  return (
                    <div
                      key={user._id}
                      className="card bg-base-200 hover:shadow-lg transition-all"
                    >
                      <div className="card-body space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="avatar size-16 rounded-full">
                            <img src={user.profilePic} alt={user.fullName} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{user.fullName}</h3>
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
                            hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                          }`}
                          disabled={hasRequestBeenSent || isPending}
                          onClick={() => sendRequestMutation(user._id)}
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
    </div>
  );
};

export default FriendsPage;

