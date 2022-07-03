import axios from "axios";

const API_URL = "/api/users";
const API_URL_LOGIN = "/api/users/login";

//Register User

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//Login User
const login = async (userData) => {
  const response = await axios.post(API_URL_LOGIN, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//Logout User

const logOut = () => localStorage.removeItem("user");

const authService = {
  register,
  login,
  logOut,
};

export default authService;
