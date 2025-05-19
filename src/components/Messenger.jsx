import { AppBar, Box, Toolbar, styled, useTheme } from "@mui/material";
import LoginDialog from "./account/LoginDialog";
import { useContext } from "react";
import { AccountContext } from "contexts/AccountProvider";
import ChatDialog from "./chat/ChatDialog";

const Messenger = () => {
  const theme = useTheme();
  const { account } = useContext(AccountContext);

  return (
    <Box
      sx={{
        height: "85%",
        backgroundColor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {account ? (
        <>
          <ChatDialog />
        </>
      ) : (
        <>
          <AppBar
            position="static"
            sx={{
              height: 200,
              backgroundColor: theme.palette.primary.main,
              boxShadow: "none",
            }}
          >
            <Toolbar />
          </AppBar>
          <LoginDialog />
        </>
      )}
    </Box>
  );
};

export default Messenger;
