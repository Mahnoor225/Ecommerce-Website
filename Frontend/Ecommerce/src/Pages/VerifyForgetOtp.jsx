import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { setEmail } from "../../redux/AuthSlice";
const VerifyForgetOtp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.user?.email || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setError(null);

    if (!email || !otp) {
      setError("Email or OTP is missing.");
      setIsVerifying(false);
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:7000/api/userRoute/verify-ForgetPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const result = await res.json();

      if (res.ok && result.success) {
        Swal.fire({
          icon: "success",
          title: "OTP Verified!",
          text: "You can now reset your password.",
          confirmButtonColor: "#FF5252",
        });
        navigate("/resetForgetPassword", { state: { email } });
      } else {
        if (result.message === "OTP has expired") {
          Swal.fire({
            icon: "error",
            title: "OTP Expired",
            text: "Your OTP has expired. Please request a new one.",
            confirmButtonColor: "#FF5252",
          }).then(() => {
            navigate("/forgetPassword");
          });
        } else {
          setError(result.message || "Invalid OTP.");
        }
      }
    } catch (error) {
      setError("Server error. Try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="w-full px-4 py-2 border rounded-md"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-[#FF5252] text-white py-2 px-4 rounded w-full"
            disabled={isVerifying}
          >
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyForgetOtp;
