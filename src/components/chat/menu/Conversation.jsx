import { Box, Divider, Typography } from "@mui/material";
import { AccountContext } from "contexts/AccountProvider";
import { useContext } from "react";
import { setConversation } from "service/api";

const Conversation = ({ user }) => {
  const { setPerson, account } = useContext(AccountContext);

  const getUser = async () => {
    setPerson(user);
    await setConversation({ senderId: account.sub, receieverId: user.sub });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 16px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
        onClick={() => getUser()}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            marginRight: 2,
          }}
        >
          <img
            src={user.picture}
            alt="dp"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Box>

        <Box
          sx={{
            overflow: "hidden",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {user.name}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ backgroundColor: "#eee", opacity: 0.3, ml: 8 }} />
    </>
  );
};

export default Conversation;
