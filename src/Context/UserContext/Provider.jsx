import React, { useLayoutEffect, useState } from "react";
import UserContext from "./Context";
import jwtDecode from "jwt-decode";
import AdminProvider from "../../Data/AdminProvider";

const Provider = ({ children }) => {
  const [userData, setUserData] = useState({ isAuth: false, user: null });
  const [actions] = useState({ login, logout });
  const [isDoneUserChecking, setIsDoneUserChecking] = useState(false);

  function login(data) {
    const user_data = data?.token && (jwtDecode(data.token) || null);
    setUserData({ isAuth: true, user: user_data });
  }

  function logout() {
    localStorage.removeItem("token");
    setUserData({ isAuth: false, user: null });
  }

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    AdminProvider.getMe().then(
      (res) => {
        console.log(res);
        const data = token && (jwtDecode(token) || null);
        console.log(data);
        if (data) {
          setUserData({ isAuth: true, user: data });
        }
        setIsDoneUserChecking(true);
      },
      () => {
        setIsDoneUserChecking(true);
      }
    );
  }, []);

  return (
    <UserContext.Provider
      value={{
        state: userData,
        actions,
        isDoneUserChecking,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default React.memo(Provider);
