import axiosInstance from '../config/axios';
import { Credentials } from '../interfaces/Credentials';

export const login = async ({ email, password }: Credentials) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const signup = async ({ email, password }: Credentials) => {
  try {
    const response = await axiosInstance.post('/auth/signup', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

export const fetchData = async (url: string, token: string) => {
  try {
    axiosInstance.defaults.headers.common = { Authorization: `bearer ${token}` };

    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};
