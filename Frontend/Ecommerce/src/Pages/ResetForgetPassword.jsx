import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
const ResetForgetPassword = () => {
  const email = useSelector((state) => state.auth.user?.email || "");

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [isResetting, setIsResetting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      return setError("Passwords do not match.");
    }

    setIsResetting(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:7000/api/userRoute/reset-ForgetPassword", {
        method: "PUT", // make sure this matches your backend
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        Swal.fire({
          icon: "success",
          title: "Password Reset!",
          text: "You can now login with your new password.",
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message || "Failed to reset password.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-[#FF5252] text-white py-2 px-4 rounded w-full"
            disabled={isResetting}
          >
            {isResetting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetForgetPassword;
