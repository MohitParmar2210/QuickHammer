import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const[bankIFSCcode,setbankIFSCcode]=useState("");
  const [upiID, setupiID] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);

    if (role === "Auctioneer") {
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", bankName);
      formData.append("bankIFSCcode", bankIFSCcode);
      formData.append("upiID", upiID);
      formData.append("paypalEmail", paypalEmail);
    }

    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, loading, isAuthenticated]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 pt-16 lg:pl-[320px] flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full bg-white shadow-xl rounded-xl p-8 md:p-12 flex flex-col gap-8 items-center">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl font-bold text-[#d6482b] mb-2">Join QuickHammer</h1>
            <p className="text-gray-600 text-center">Create your account and start bidding today</p>
          </div>
          <form
            className="flex flex-col gap-6 w-full"
            onSubmit={handleRegister}
          >
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6482b] focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
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
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6482b] focus:border-transparent"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6482b] focus:border-transparent"
                  placeholder="Enter your address"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6482b] focus:border-transparent"
                  required
                >
                  <option value="">Select Account Type</option>
                  <option value="Auctioneer">Auctioneer</option>
                  <option value="Bidder">Bidder</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6482b] focus:border-transparent"
                  placeholder="Create a strong password"
                  required
                  minLength="6"
                />
              </div>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Photo</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={
                      profileImagePreview
                        ? profileImagePreview
                        : "/imageHolder.jpg"
                    }
                    alt="profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-0 right-0 bg-[#d6482b] text-white rounded-full p-2 cursor-pointer hover:bg-[#b8381e] transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                </div>
                <input
                  type="file"
                  id="profileImage"
                  onChange={imageHandler}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Information</h2>
              <p className="text-gray-600 mb-4">(Required for Auctioneers only)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6482b] focus:border-transparent"
                    disabled={role === "Bidder"}
                  >
                    <option value="State Bank Of India">State Bank Of India</option>
                    <option value="Bank Of India">Bank Of India</option>
                    <option value="Bank Of Baroda">Bank Of Baroda</option>
                    <option value="Punjab National Bank">Punjab National Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="HDFC Bank"> HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Bandhan Bank">Bandhan Bank</option>
                    <option value="Canara Bank">Canara Bank</option>
                    <option value="Kotak Mahindra Bank"> Kotak Mahindara Bank</option>
                    <option value="Union Bank of India"> Union Bank Of India</option>
                    <option value="Yes Bank">Yes Bank</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    value={bankAccountNumber}
                    placeholder="Account Number"
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6482b] focus:border-transparent"
                    disabled={role === "Bidder"}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                  <input
                    type="text"
                    value={bankAccountName}
                    placeholder="Bank Account Holder Name"
                    onChange={(e) => setBankAccountName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6482b] focus:border-transparent"
                    disabled={role === "Bidder"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IFSC code</label>
                  <input
                    type="string"
                    value={bankIFSCcode}
                    placeholder="IFSC code"
                    onChange={(e) => setbankIFSCcode(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6482b] focus:border-transparent"
                    disabled={role === "Bidder"}
                  />
                </div>
                
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">UPI-ID</label>
                  <input
                    type="string"
                    value={upiID}
                    placeholder="UPI ID"
                    onChange={(e) => setupiID(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6482b] focus:border-transparent"
                    disabled={role === "Bidder"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PayPal Email</label>
                  <input
                    type="email"
                    value={paypalEmail}
                    placeholder="PayPal Email Address"
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6482b] focus:border-transparent"
                    disabled={role === "Bidder"}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d6482b] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#b8381e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-[#d6482b] font-medium hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
