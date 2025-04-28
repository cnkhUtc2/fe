import React, { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const token = localStorage.getItem("token");

  let initialUser = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      initialUser = {
        username: decodedToken.name,
        role: decodedToken.role,
        _id: decodedToken._id,
        email: decodedToken.email,
      };
    } catch (err) {
      console.error("Invalid token", err);
      initialUser = null;
    }
  }

  const [user, setUser] = useState(initialUser);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContext;
