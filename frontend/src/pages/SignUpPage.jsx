import { useState } from "react";
import { ShipWheelIcon, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { isPending, error, signupMutation } = useSignUp();

  /* ================= VALIDATION FUNCTIONS ================= */
  const validateFullName = (name) =>
    /^[A-Za-z ]{3,}$/.test(name);

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignupData({ ...signupData, [name]: value });

    if (name === "fullName") {
      setErrors({
        ...errors,
        fullName: validateFullName(value)
          ? ""
          : "Name should contain only letters (min 3 characters)",
      });
    }

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
          : "Password must be 6+ chars, include uppercase, lowercase & number",
      });
    }
  };

  /* ================= SUBMIT ================= */
  const handleSignup = (e) => {
    e.preventDefault();

    if (
      !validateFullName(signupData.fullName) ||
      !validateEmail(signupData.email) ||
      !validatePassword(signupData.password)
    ) {
      return;
    }

    signupMutation(signupData, {
      onSuccess: () => {
        navigate("/onboarding");
      },
    });
  };

  const isFormInvalid =
    !validateFullName(signupData.fullName) ||
    !validateEmail(signupData.email) ||
    !validatePassword(signupData.password);

  return (
    <div className="h-screen flex items-center justify-center p-4" data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl bg-base-100 rounded-xl shadow-xl overflow-hidden">

        {/* SIGNUP FORM */}
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
              <span>{error.response?.data?.message || "Signup failed"}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <h2 className="text-2xl font-semibold">Create an Account 🚀</h2>
              <p className="text-sm opacity-70">
                Join Streamify and start connecting worldwide
              </p>
            </div>

            {/* FULL NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Kausar Ali"
                className={`input input-bordered w-full ${
                  errors.fullName ? "input-error" : ""
                }`}
                value={signupData.fullName}
                onChange={handleChange}
                required
              />
              {errors.fullName && (
                <p className="text-error text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* EMAIL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="kausar@gmail.com"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                value={signupData.email}
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
                placeholder="********"
                className={`input input-bordered w-full pr-10 ${
                  errors.password ? "input-error" : ""
                }`}
                value={signupData.password}
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

            {/* TERMS */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2">
                <input type="checkbox" className="checkbox checkbox-sm" required />
                <span className="text-xs">
                  I agree to the{" "}
                  <span className="text-primary hover:underline">
                    terms of service
                  </span>{" "}
                  and{" "}
                  <span className="text-primary hover:underline">
                    privacy policy
                  </span>
                </span>
              </label>
            </div>

            {/* SUBMIT */}
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isPending || isFormInvalid}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex w-1/2 bg-primary/10 items-center justify-center p-10">
          <div className="text-center space-y-4">
            <img src="/i.png" alt="illustration" className="max-w-sm mx-auto" />
            <h2 className="text-xl font-semibold">
              Connect with Anyone, Anywhere 🌍
            </h2>
            <p className="opacity-70">
              Video calls, instant chat, and real-time global connections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
