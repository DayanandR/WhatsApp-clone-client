// ChatDialog.jsx
import { Box, Dialog } from "@mui/material";
import WhatsAppMenu from "./menu/WhatsAppMenu";
import ChatBox from "./chat/ChatBox";
import { useContext } from "react";
import { AccountContext } from "contexts/AccountProvider";
import EmptyChat from "./chat/EmptyChat";

const ChatDialog = () => {
  const { person } = useContext(AccountContext);

  return (
    <Dialog
      open
      maxWidth="md"
      slotProps={{
        paper: {
          sx: {
            height: "95vh",
            width: "100%",
            margin: "20px",
            boxShadow: "none",
            maxWidth: "100%",
            maxHeight: "100%",
            overflow: "hidden",
            display: "flex",
            borderRadius: "8px",
          },
        },
      }}
    >
      <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
        <Box
          sx={{
            minWidth: "450px",
            borderRight: "1px solid rgba(0,0,0,0.14)",
            overflowX: "auto",
          }}
        >
          <WhatsAppMenu />
        </Box>
        <Box
          sx={{
            width: "100%",
            borderLeft: "1px solid rgba(0,0,0,0.14)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
        </Box>
      </Box>
    </Dialog>
  );
};

export default ChatDialog;
