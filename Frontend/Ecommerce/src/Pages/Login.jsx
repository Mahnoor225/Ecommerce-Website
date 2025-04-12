import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { loginSuccess } from "../../redux/AuthSlice";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Form validation
    if (!email || !password) {
      Swal.fire({
        title: "Error",
        text: "Please fill in both fields.",
        icon: "error",
      });
      setLoading(false);
      return;
    }

    // Simulating an API request for login
    try {
      const response = await fetch("http://localhost:7000/api/userRoute/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
     console.log(result);
      if (result.success) {
        Cookies.set('authToken', result.token, { expires: 1 });
        Cookies.set('userEmail', result.user.email, { expires: 1 });
        Cookies.set('userName', result.user.name, { expires: 1 });

        dispatch(loginSuccess({
          name: result.user.name,
          email: result.user.email,
          token: result.token
        }));
        Swal.fire({
          title: "Success",
          text: result.message,
          icon: "success",
        });
        // console.log(Cookies,"Login token");
        navigate("/"); // Redirect after login success
      } else {
        Swal.fire({
          title: "Error",
          text: result.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const loader = () => {
    return (
      <div className="flex justify-center items-center ">
      <TailSpin
        visible={true}
        height="30"
        width="30"
        color="#FFFFFF"
        ariaLabel="tail-spin-loading"
      />
    </div>  
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600 hover:text-gray-800"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="/forget"
                className="font-medium text-[#FF5252] hover:text-black"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-[#FF5252] text-white ${
                loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-black"
              } focus:outline-none focus:ring-2 focus:ring-offset-2`}
              disabled={loading}
            >
              {loading ? loader() : "Login"}
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              No account?{" "}
              <Link to="/register" className="font-medium text-[#FF5252] hover:text-black">
                Create one here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
