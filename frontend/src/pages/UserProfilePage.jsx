import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router";
import { MapPinIcon, MessageCircleIcon } from "lucide-react";

import { getUserById } from "../lib/api";
import PageLoader from "../components/PageLoader";

const getInitial = (name = "") => {
  const trimmed = name.trim();
  return trimmed ? trimmed[0].toUpperCase() : "?";
};

const UserProfilePage = () => {
  const { id } = useParams();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: () => getUserById(id),
  });

  if (isLoading) return <PageLoader />;

  if (isError || !user) {
    return (
      <div className="p-6">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">User not found</h1>
          <p className="opacity-70 mb-4">
            We couldn&apos;t load this profile. It may have been removed or is not available.
          </p>
          <Link to="/" className="btn btn-primary">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const initial = getInitial(user.fullName);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="card bg-base-200 shadow-md">
          <div className="card-body flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <div className="avatar">
              {user.profilePic ? (
                <div className="w-24 rounded-full overflow-hidden bg-base-300">
                  <img src={user.profilePic} alt={user.fullName} />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary text-primary-content flex items-center justify-center text-3xl font-bold">
                  {initial}
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h1 className="text-2xl font-bold">{user.fullName}</h1>

              {user.location && (
                <div className="inline-flex items-center gap-1 text-sm opacity-80">
                  <MapPinIcon className="size-4" />
                  <span>{user.location}</span>
                </div>
              )}

              {user.bio && (
                <p className="text-sm opacity-80 mt-2 whitespace-pre-line">{user.bio}</p>
              )}

              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                {user.nativeLanguage && (
                  <span className="badge badge-secondary">
                    Native: {user.nativeLanguage}
                  </span>
                )}
                {user.learningLanguage && (
                  <span className="badge badge-outline">
                    Learning: {user.learningLanguage}
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
                <Link to={`/chat/${user._id}`} className="btn btn-primary btn-sm gap-2">
                  <MessageCircleIcon className="size-4" />
                  Message
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

