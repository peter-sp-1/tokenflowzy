import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginChatAgent, signupChatAgent } from "../utils/auth";

const LoginSignup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Login logic
        const result = await loginChatAgent(email, password);
        if (!result.success) {
          return alert(result.message);
        }

        // Store token and email in localStorage
        // localStorage.setItem("authToken", result.token);
        localStorage.setItem("email", email);

        // Redirect based on role
        if (result.message?.is_super_admin) {
          navigate("/super-admin");
        } else if (result.message?.is_admin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/user");
        }
      } else {
        // Signup logic
        await signupChatAgent(email, true, true, password);
        setShowModal(true);
        setEmail("");
        setPassword("");
      }
    } catch (error: any) {
      alert(error.message || "An error occurred. Please try again.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (!isLogin) {
      navigate("/user");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white text-center p-5">
      <div className="mt-24">
        <h1 className="text-5xl font-bold mb-4">
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </h1>
        <p className="text-lg mb-8">
          {isLogin
            ? "Test: Login to access your dashboard and features."
            : "Join our platform and start your journey today!"}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-md px-4 py-2 mb-4 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-[#3BE803]"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full max-w-md px-4 py-2 mb-4 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-[#3BE803]"
            required
          />
          <button
            type="submit"
            className="bg-[#3BE803] text-white py-3 px-6 rounded-full font-bold hover:bg-[#2FD700] transition duration-300"
          >
            {isLogin ? "LOGIN" : "SIGN UP"}
          </button>
        </form>

        <p className="mt-4 text-sm">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#3BE803] cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-black p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p>You’ve successfully signed up. Redirecting...</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-[#3BE803] text-white py-2 px-4 rounded-full font-bold hover:bg-[#2FD700] transition duration-300"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
