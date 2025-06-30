import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
// import { registerSuccess } from "../../redux/AuthSlice";
import { TailSpin } from 'react-loader-spinner'
import { registerSuccess } from "../../redux/action/action";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Regex for Email Validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // Regex for Password Validation (At least one uppercase, one number, and one special character)
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const onchangeinput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password } = formData;

    // Email Validation
    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Error",
        text: "Please enter a valid email address.",
        icon: "error",
      });
      setLoading(false);
      return;
    }

    // Password Validation
    if (!passwordRegex.test(password)) {
      Swal.fire({
        title: "Error",
        text: "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.",
        icon: "error",
      });
      setLoading(false);
      return;
    }

    try {
      let result = await fetch("http://localhost:7000/api/userRoute/newRegister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include', // Ensure cookies are sent with the request
      });

      result = await result.json();

      console.log(result); // Log the result to check the structure

      setLoading(false);
      if (result.success) {
        // Store the token in cookies after successful registration
        Cookies.set('authToken', result.token, { expires: 1 });
        Cookies.set('userEmail', result.NewUser.email, { expires: 1 });
        Cookies.set('userName', result.NewUser.name, { expires: 1 });

        // Dispatch registerSuccess to update Redux store
        dispatch(registerSuccess({
          name: result.NewUser.name,
          email: result.NewUser.email,
          token: result.token,
        }));

        Swal.fire({
          title: "Success",
          text: result.Message,
          icon: "success",
        });
        navigate(`/verify`);
      } else {
        Swal.fire({
          title: "Error",
          text: result.Message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
    }
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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-gray-600 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-rose-600 hover:underline">
              Log in instead!
            </Link>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handlesubmit}>
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="fullName"
              name="name"
              type="text"
              onChange={onchangeinput}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={onchangeinput}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={onchangeinput}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-rose-600 hover:underline"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          {/* Submit Button with Loading State */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 border bg-[#FF5252] border-transparent rounded-md shadow-sm text-sm font-semibold text-white `}
          >
            {loading ? loader() : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
