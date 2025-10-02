"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/actions/userActions";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const BasicInfoForm = () => {
  const dispatch = useDispatch();

  // Step/page management
  const [step, setStep] = useState(1);

  const [isMounted, setIsMounted] = useState(false);

  // Local state for form fields
  const [userData, setUserData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
  });

  const {user} = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Submit to Redux
  const handleSubmit = (e) => {
    e.preventDefault();
    const clerkId = user.id;
    dispatch(updateUser(userData, clerkId));
    alert("Form submitted successfully!")
  };

    if (!isMounted) {
    // Instead of returning early before hooks, just render null safely
    return <div>Loading...</div>;
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Basic Information
        </h2>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={userData.firstName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="middleName"
                  placeholder="Middle Name"
                  value={userData.middleName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={userData.lastName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                  required
                />
                <input
                  type="date"
                  name="dob"
                  value={userData.dob}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                  required
                />
                
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition cursor-pointer"
                >
                  Next →
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <textarea
                  name="address"
                  placeholder="Address"
                  value={userData.address}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={userData.phone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                  required
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-gray-400 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-500 transition cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};

export default BasicInfoForm;
