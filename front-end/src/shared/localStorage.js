import { decodeToken } from "react-jwt";

export const loadUserData = () => {
  try {
    return decodeToken(localStorage.getItem("userData") || '');
  } catch (error) {
    console.error(error);
  }
};

export const saveUserData = (userData) => {
  try {
    localStorage.setItem("userData", userData);
  } catch (error) {
    console.error(error);
  }
};

export const removeUserData = () => {
  try {
    localStorage.removeItem("userData");
  } catch (error) {
    console.error(error);
  }
};
