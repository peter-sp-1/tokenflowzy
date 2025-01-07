import axios from 'axios';

interface UserInfo {
  is_super_admin: boolean;
  is_admin: boolean;
  // Add other fields you expect from the response
}

export const getUserInfo = async (token: string): Promise<UserInfo> => {
  try {
    const response = await axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};
