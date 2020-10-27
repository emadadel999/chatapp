export const loadUserData = () => {
    try {
      const serializedUserData = localStorage.getItem("userData");
      if (!serializedUserData) return undefined;
      return JSON.parse(serializedUserData);
    } catch (error) {
      console.error(error);
    }
  };
  
  export const saveUserData = (userData) => {
    try {
      const serializedUserData = JSON.stringify(userData);
      localStorage.setItem("userData", serializedUserData);
    } catch (error) {console.error(error)}
  };