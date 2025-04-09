
import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Mail } from "lucide-react"

const  ForgetPassword = ()=> {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState(null)

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Reset states
    setError(null)

    // Validate email
    if (!email.trim()) {
      setError("Please enter your email address")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    // Show loading state
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success state
      setEmailSent(true)
      setIsSubmitting(false)
    } catch (err) {
      setError("Something went wrong. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {!emailSent ? (
          <>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Forgot Password</h1>
              <p className="text-gray-600 mt-2">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    disabled={isSubmitting}
                  />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isSubmitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-[#FF5252] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                }`}
              >
                {isSubmitting ? "Sending..." : "Reset Password"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Check your email</h2>
            <p className="mt-2 text-gray-600">
              We've sent a password reset link to <span className="font-medium">{email}</span>
            </p>
            <p className="mt-1 text-sm text-gray-500">If you don't see it, please check your spam folder</p>
            <button
              onClick={() => {
                setEmailSent(false)
                setEmail("")
              }}
              className="mt-6 text-sm text-[#FF5252] hover:text-black font-medium"
            >
              Try another email
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/login" className="inline-flex items-center text-sm text-[#FF5252] hover:text-black">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
export default ForgetPassword