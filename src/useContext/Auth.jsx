import React, { useState, useContext } from "react";

const UserContext = React.createContext();

export const AuthUser = ({ children }) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const userAuth = () => useContext(UserContext);
