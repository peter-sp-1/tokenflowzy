// src/database/db.ts
import axios from "axios";

// const API_URL = "https://chatagent-fac4fc562e95.herokuapp.com";
const API_URL = "http://localhost:3000";

export const loginChatAgent = async (email: string, password: string): Promise<{ success: boolean | null, message: string | { is_super_admin: boolean, is_admin: boolean } }> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (!response.data.success) {
      console.log(response.data);
      return { success: false, message: response.data }; // Show error message from backend
    } else {
      // const token = response?.data?.token;
      const userinfo = response?.data?.message;
      console.log(userinfo);
      return { success: true, message:  userinfo};
      // return { token: token, message: "Login successful!" };
    }
  } catch (error: any) {
    return { success: false, message: "An unexpected error occurred. Please try again later." };
  }
};

export const signupChatAgent = async (email: string, is_super_admin: boolean=true, is_admin: boolean=true, password: string): Promise<void> => {
  try {
    await axios.post(`${API_URL}/signup`, { email, is_super_admin, is_admin, password });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};
