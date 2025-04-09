import { useState, useRef, useEffect } from "react"

const Verify = () => {
  const [otp, setOtp] = useState(Array(6).fill(""))
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const inputRefs = useRef([])

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
    const pastedData = e.clipboardData.getData("text")

    if (!/^\d+$/.test(pastedData)) return

    const digits = pastedData.substring(0, 6).split("")
    const newOtp = [...otp]

    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit
    })

    setOtp(newOtp)

    const nextEmptyIndex = newOtp.findIndex((val) => val === "")
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  const verifyOtp = () => {
    const otpString = otp.join("")

    if (otpString.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    setIsVerifying(true)

    setTimeout(() => {
      if (otpString === "123456") {
        setSuccess(true)
        setError(null)
      } else {
        setError("Invalid verification code. Please try again.")
      }
      setIsVerifying(false)
    }, 1500)
  }

  const resendOtp = () => {
    setOtp(Array(6).fill(""))
    setError(null)
    setSuccess(false)
    inputRefs.current[0]?.focus()
    alert("A new verification code has been sent!")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Verification Code</h1>
          <p className="text-gray-600 mt-2">We've sent a verification code to your email</p>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-6 gap-2 mb-6">
            {/* boxes */}
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-full h-14 text-center text-xl font-bold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                aria-label={`Digit ${index + 1} of verification code`}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center mb-4">Verification successful!</p>}

          <button
            onClick={verifyOtp}
            disabled={isVerifying || success}
            className={`w-full py-3 px-4 rounded-md shadow-sm text-white font-medium ${
              isVerifying || success ? "cursor-not-allowed" : "bg-[#FF5252] hover:bg-black"
            }`}
          >
            {isVerifying ? "Verifying..." : success ? "Verified" : "Verify Code"}
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Didn't receive the code?{" "}
            <button onClick={resendOtp} className="text-[#FF5252] hover:underline font-medium">
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Verify
