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
  const [bankIFSCcode, setbankIFSCcode] = useState("");

  const [upiID, setupiID] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  // ✅ REGISTER HANDLER
  const handleRegister = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    if (role === "Auctioneer") {
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", bankName);
      formData.append("bankIFSCcode", bankIFSCcode);

      // ✅ IMPORTANT FIX
      formData.append("upiId", upiID);

      formData.append("paypalEmail", paypalEmail);
    }

    dispatch(register(formData));
  };

  // ✅ REDIRECT AFTER LOGIN
  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  // ✅ IMAGE HANDLER
  const imageHandler = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImage(file);
    setProfileImagePreview(URL.createObjectURL(file));
  };

  return (
    <section className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-6">

        <h1 className="text-3xl font-bold text-center text-[#d6482b] mb-6">
          Create Account
        </h1>

        {/* FORM START */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">

          <input
            placeholder="Full Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="input"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="input"
          />

          <input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="input"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="input"
          >
            <option value="">Select Role</option>
            <option value="Auctioneer">Auctioneer</option>
            <option value="Bidder">Bidder</option>
          </select>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />

          {/* IMAGE */}
          <input type="file" accept="image/*" onChange={imageHandler} />

          {/* PREVIEW */}
          {profileImagePreview && (
            <img
              src={profileImagePreview}
              className="w-20 h-20 rounded-full object-cover"
            />
          )}

          {/* AUCTIONEER ONLY FIELDS */}
          {role === "Auctioneer" && (
            <>
              <input
                placeholder="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="input"
              />

              <input
                placeholder="Account Number"
                value={bankAccountNumber}
                onChange={(e) => setBankAccountNumber(e.target.value)}
                className="input"
              />

              <input
                placeholder="Account Holder Name"
                value={bankAccountName}
                onChange={(e) => setBankAccountName(e.target.value)}
                className="input"
              />

              <input
                placeholder="IFSC Code"
                value={bankIFSCcode}
                onChange={(e) => setbankIFSCcode(e.target.value)}
                className="input"
              />

              <input
                placeholder="UPI ID"
                value={upiID}
                onChange={(e) => setupiID(e.target.value)}
                className="input"
              />

              <input
                placeholder="PayPal Email"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                className="input"
              />
            </>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#d6482b] text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

      </div>

      {/* SIMPLE INPUT STYLE */}
      <style>
        {`
          .input {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 8px;
          }
        `}
      </style>
    </section>
  );
};

export default SignUp;