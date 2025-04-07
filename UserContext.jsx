import React, { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const initialUser = token
    ? (() => {
        const decodedToken = jwtDecode(token);
        return {
          username: decodedToken.name,
          roleId: decodedToken.roleId,
          _id: decodedToken._id,
          email: decodedToken.email,
        };
      })()
    : null;

  const [user, setUser] = useState(initialUser);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContext;
