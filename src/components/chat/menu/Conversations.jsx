import { Box, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { getUsers } from "service/api";
import Conversation from "./Conversation";
import { AccountContext } from "contexts/AccountProvider";

const Conversations = ({ text }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { account, socket, setActiveUsers } = useContext(AccountContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUsers();
      setAllUsers(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (text) {
      const filtered = allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(text.toLowerCase()) &&
          String(user.sub) !== String(account?.sub)
      );
      setFilteredUsers(filtered);
    } else {
      const filtered = allUsers?.filter(
        (user) => String(user.sub) !== String(account?.sub)
      );
      setFilteredUsers(filtered);
    }
  }, [text, allUsers, account?.sub]);

  useEffect(() => {
    if (account) {
      socket.current.emit("addUsers", account);
      socket.current.on("getUsers", (usersData) => {
        setActiveUsers(usersData);
      });
    }
  }, [account, socket, setActiveUsers]);

  return (
    <Box>
      {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
        filteredUsers.map((user) => <Conversation key={user.sub} user={user} />)
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography>No Users Found</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Conversations;
