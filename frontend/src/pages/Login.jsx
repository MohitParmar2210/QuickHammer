import { login } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, loading]);

  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 pt-16 lg:pl-[320px] flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full bg-white shadow-xl rounded-xl p-8 md:p-12 flex flex-col gap-8 items-center">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl font-bold text-[#d6482b] mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-center">Sign in to continue to QuickHammer</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6482b] focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6482b] focus:border-transparent pr-10"
                      placeholder="Enter your password"
                      required
                      minLength="6"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#d6482b]"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                            clipRule="evenodd"
                          />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      className="mr-2 rounded"
                    />
                    <span>Remember me</span>
                  </label>
                  <a
                    href="/forgot-password"
                    className="text-sm text-[#d6482b] hover:text-[#b8381e]"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#d6482b] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#b8381e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging In...' : 'Login'}
              </button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/sign-up" className="text-[#d6482b] font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
