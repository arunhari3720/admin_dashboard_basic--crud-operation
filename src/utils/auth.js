import {jwtDecode} from "jwt-decode";

export const checkTokenExpiry = () => {
  const token = localStorage.getItem("token");

  if (!token) return;

  try {
    const decoded = jwtDecode(token);
     console.log("Token checking started");

    const expiryTime = decoded.exp * 1000;
    const currentTime = Date.now();
    console.log("Expiry time:", decoded.exp * 1000);
    console.log("Current time:", Date.now());

    const timeLeft = expiryTime - currentTime;
    

    if (timeLeft <= 0) {
      logout();
    } else {
      setTimeout(() => {
        logout();
      }, timeLeft);
    }
  } catch (error) {
    logout();
  }
};

const logout = () => {
  alert("Session expired ⏰");
  localStorage.removeItem("token");
  window.location.href = "/";
};