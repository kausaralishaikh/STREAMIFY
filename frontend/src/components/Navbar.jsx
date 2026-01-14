import { Link, useLocation, useNavigate } from "react-router";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";

import useAuthUser from "../hooks/useAuthUser";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const navigate = useNavigate();

  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();

  const profileSrc = authUser?.profilePic || "/i.png";

  const handleLogoutClick = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      logoutMutation();
    }
  };

  const handleProfileClick = () => {
    navigate("/onboarding");
  };

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  Streamify
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle" aria-label="Notifications">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          <ThemeSelector />

          <button
            type="button"
            className="avatar btn btn-ghost btn-circle"
            onClick={handleProfileClick}
            aria-label="Open profile"
          >
            <div className="w-9 rounded-full overflow-hidden">
              <img src={profileSrc} alt="User Avatar" rel="noreferrer" />
            </div>
          </button>

          <button
            className="btn btn-ghost btn-circle"
            onClick={handleLogoutClick}
            aria-label="Logout"
          >
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

