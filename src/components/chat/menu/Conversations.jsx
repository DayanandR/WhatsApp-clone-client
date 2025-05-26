import { Box, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { getUsers } from "service/api";
import Conversation from "./Conversation";
import { AccountContext } from "contexts/AccountProvider";

const Conversations = ({ text }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { account, socket, setActiveUsers } = useContext(AccountContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getUsers();
        setAllUsers(response);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
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
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flexDirection: "column",
            mt: 4,
            gap: 2,
          }}
        >
          <CircularProgress />
          <Typography>Just a moment, loading your chat list...</Typography>
        </Box>
      ) : filteredUsers.length > 0 ? (
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
