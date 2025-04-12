import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import Cookies from "js-cookie"

const Verify = () => {
  const [otp, setOtp] = useState(Array(6).fill(""))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const inputRefs = useRef([]) 
  const navigate = useNavigate()

  const email = Cookies.get("userEmail") // Get the email from cookies
  console.log("Email verification code retrieved from cookies:", email) // Debugging line
  
  useEffect(() => {
    if (!email) {
      navigate("/register")
    }
  }, [email, navigate])

  const verifyOtp = async () => {
    const otpString = otp.join("")
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits")
      Swal.fire({
        title: "Error",
        text: "Please enter all 6 digits of the OTP.",
        icon: "error",
        confirmButtonText: "OK",
      })
      return
    }

    setIsLoading(true)
    setError(null)
    console.log("Sending for verification:", { otp: otpString, email })

    try {
      const result = await fetch("http://localhost:7000/api/userRoute/emailVerification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: otpString, email }),
      })

      const data = await result.json()
      console.log(data)

      if (data.success) {
        setSuccess(true)
        setError(null)
        Swal.fire({
          title: 'Success!',
          text: 'Verification successful!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate("/login")
        })
      } else {
        setError("Invalid verification code. Please try again.")
        setOtp(Array(6).fill("")) // Reset OTP inputs
        Swal.fire({
          title: 'Error',
          text: 'Invalid verification code. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    } catch (error) {
      setError("An error occurred. Please try again later.")
      console.error(error)
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const resendOtp = async () => {
    setOtp(Array(6).fill("")) 
    setError(null)
    setSuccess(false)
    inputRefs.current[0]?.focus()

    const otpExpiry = Cookies.get("otpExpiry")
    const isExpired = Date.now() > otpExpiry

    if (isExpired) {
      setError("OTP has expired, requesting a new one.")
      Swal.fire({
        title: "OTP Expired",
        text: "OTP has expired, requesting a new one.",
        icon: "warning",
        confirmButtonText: "OK"
      })

      try {
        const result = await fetch("http://localhost:7000/api/userRoute/resend", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })

        const data = await result.json()
        console.log(data)

        const newOtpExpiry = Date.now() + 600000 // 10 minutes
        Cookies.set("otpExpiry", newOtpExpiry, { expires: 1 / 144 })

        if (data.success) {
          Swal.fire({
            title: 'OTP Sent',
            text: data.Message || 'A new OTP has been sent to your email.',
            icon: 'success',
            confirmButtonText: 'OK'
          })
        } else {
          Swal.fire({
            title: 'Failed',
            text: data.Message || 'Failed to resend OTP.',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while resending OTP. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        console.error(error)
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "OTP is still valid. Please enter it to verify your email.",
        icon: "error",
        confirmButtonText: "OK"
      })
    }
  }

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6)
  }, [])

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.substring(0, 1)
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    setError(null)
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp]
        newOtp[index - 1] = ""
        setOtp(newOtp)
        inputRefs.current[index - 1]?.focus()
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const paste = e.clipboardData.getData("Text")
    if (/^\d{6}$/.test(paste)) {
      setOtp(paste.split("").map((d) => d.trim()))
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Verify Your Email</h2>
        <div className="flex justify-center mb-4">
          <p>Enter the OTP sent to <strong>{email}</strong></p>
        </div>

        <div className="flex justify-center mb-6">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              maxLength={1}
              className="w-10 h-10 text-center text-xl border border-gray-300 rounded-md mx-1 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          ))}
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && <div className="text-green-500 text-center mb-4">Verification successful!</div>}

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={verifyOtp}
            disabled={isLoading}
            className="bg-rose-600 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-rose-700"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            onClick={resendOtp}
            className="text-rose-600 hover:underline"
            disabled={isLoading}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  )
}

export default Verify
