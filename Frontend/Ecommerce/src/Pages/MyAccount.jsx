import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import Cookies from "js-cookie";
import { loginSuccess } from "../../redux/AuthSlice"; // Assuming you are using Redux to store the user info

const MyAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
 
  const [fullName, setFullName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Handle the avatar upload
  const onchangeFile = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      if (!["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type)) {
        alert("Invalid file type.");
        return;
      }

      setUploading(true);

      // Temporary preview
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("avatar", file);
      const token = Cookies.get("authToken");

      const res = await axios.put(
        "http://localhost:7000/api/userRoute/user_Avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const uploadedAvatar = res.data.avatar;
      dispatch(loginSuccess({ ...user, avatar: uploadedAvatar }));
      Cookies.set("userAvatar", uploadedAvatar);
      setPreview(null);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  // Trigger file input click
  const avatarInput = () => fileInputRef.current.click();

  // Handle profile update (Name, Email)
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user?._id) return alert("User not found");

    const token = Cookies.get("authToken");

    try {
      const res = await axios.put(
        `http://localhost:7000/api/userRoute/update/${user._id}`,
        { name: fullName, email, },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert("Profile updated!");
        dispatch(loginSuccess({ ...user, name: fullName, email })); // Update Redux store with the new name and email
        Cookies.set("userName", fullName); // Update name in cookies
        Cookies.set("userEmail", email); // Update email in cookies
      } else {
        alert(res.data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Something went wrong.");
    }
  };

  // Avatar image or preview
  const avatarUrl = preview || user?.avatar || "https://via.placeholder.com/150";

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-md mx-10">
        <div className="p-4 border-b">
          <h2 className="font-bold text-sm tracking-wider">SHOP BY</h2>
          <h2 className="font-bold text-sm tracking-wider">CATEGORIES</h2>
        </div>

        <div className="p-4 border-t mt-4">
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex-shrink-0 relative">
              {uploading ? (
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
                  <TailSpin height="30" width="30" color="#000" />
                </div>
              ) : (
                <img
                  className="w-10 h-10 rounded-full cursor-pointer object-cover"
                  src='https://img.freepik.com/free-photo/decoration-artificial-flower-table-filtered-image-processed_1232-3629.jpg?semt=ais_hybrid&w=740'
                  alt="avatar"
                  onClick={avatarInput}
                />
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={onchangeFile}
              />
            </div>
            <div>
              <p className="font-medium text-sm">{fullName}</p>
              <p className="text-xs text-gray-500">{email}</p>
            </div>
          </div>

          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="block p-2 bg-gray-100 rounded-md font-medium">
                My Profile
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-bold mb-8">My Profile</h1>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <form onSubmit={handleUpdateProfile}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-md font-medium"
                >
                  UPDATE PROFILE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
