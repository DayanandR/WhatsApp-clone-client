import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "contexts/AccountProvider";
import { getConversation } from "service/api";

const ChatBox = () => {
  const { person, account } = useContext(AccountContext);
  const [conversation, setConversation] = useState({});
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getConversationDetails = async () => {
      const response = await getConversation({
        senderId: account.sub,
        receieverId: person.sub,
      });
      setConversation(response);
    };
    getConversationDetails();
  }, [person.sub]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <ChatHeader person={person} setSearchText={setSearchText} />
      </Box>
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <Messages
          person={person}
          conversation={conversation}
          searchText={searchText}
        />
      </Box>
    </Box>
  );
};

export default ChatBox;
