import { useState } from "react";
import { ShipWheelIcon, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { isPending, error, loginMutation } = useLogin();

  /* ================= VALIDATION ================= */
  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData({ ...loginData, [name]: value });

    // Live validation
    if (name === "email") {
      setErrors({
        ...errors,
        email: validateEmail(value)
          ? ""
          : "Please enter a valid email address",
      });
    }

    if (name === "password") {
      setErrors({
        ...errors,
        password: validatePassword(value)
          ? ""
          : "Password must be at least 6 characters",
      });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateEmail(loginData.email) || !validatePassword(loginData.password)) {
      return;
    }

    loginMutation(loginData);
  };

  const isFormInvalid =
    !validateEmail(loginData.email) ||
    !validatePassword(loginData.password);

  return (
    <div className="h-screen flex items-center justify-center p-4" data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl bg-base-100 rounded-xl shadow-xl overflow-hidden">

        {/* LOGIN FORM */}
        <div className="w-full lg:w-1/2 p-8">
          {/* LOGO */}
          <div className="flex items-center gap-2 mb-6">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono text-primary">
              Streamify
            </span>
          </div>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response?.data?.message || "Login failed"}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <h2 className="text-2xl font-semibold">Welcome Back 👋</h2>
              <p className="text-sm opacity-70">
                Login to continue your journey
              </p>
            </div>

            {/* EMAIL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="hello@example.com"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                value={loginData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <p className="text-error text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className={`input input-bordered w-full pr-10 ${
                  errors.password ? "input-error" : ""
                }`}
                value={loginData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="absolute right-3 top-12 opacity-70"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

              {errors.password && (
                <p className="text-error text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPending || isFormInvalid}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Create one
              </Link>
            </p>
          </form>
        </div>

        {/* IMAGE SECTION */}
        <div className="hidden lg:flex w-1/2 bg-primary/10 items-center justify-center p-10">
          <div className="text-center space-y-4">
            <img src="/i.png" alt="illustration" className="max-w-sm mx-auto" />
            <h2 className="text-xl font-semibold">
              Connect with Anyone, Anywhere 🌍
            </h2>
            <p className="opacity-70">
              Seamless video, instant chat, and real-time global connections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
