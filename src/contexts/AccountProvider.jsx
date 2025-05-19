import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [person, setPerson] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [newMessageFlag, setNewMessageFlag] = useState(false);

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(
      import.meta.env.VITE_SOCKET_URL || "wss://localhost:9000"
    );
  }, []);

  useEffect(() => {
    if (account) {
      localStorage.setItem("user", JSON.stringify(account));
    }
  }, [account]);

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        person,
        setPerson,
        socket,
        activeUsers,
        setActiveUsers,
        setNewMessageFlag,
        newMessageFlag,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
