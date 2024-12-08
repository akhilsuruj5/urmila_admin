import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminVerifyEmail = () => {
  const [message, setMessage] = useState("Verifying account...");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const { token } = useParams();

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or missing verification token.");
      setError(true);
      setLoading(false); // Stop loading if there's no token
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/admin/verify-account/${token}`);
        setMessage(res.data.msg || "Account verified successfully.");
      } catch (err) {
        if (err.response && err.response.status === 400) {
          setMessage("Account already verified.");
        } else {
          setMessage("Error verifying account. Please try again later.");
        }
        setError(true);
      } finally {
        setLoading(false); // Stop loading after API request is completed
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md text-center w-96">
        {loading ? ( // Show loader if loading is true
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 mx-auto mb-4"></div>
        ) : (
          <div>
            {error ? (
              <h2 className="text-xl font-bold text-red-600 mb-4">Verification Failed</h2>
            ) : (
              <h2 className="text-xl font-bold text-gray-700">{message}</h2>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVerifyEmail;
