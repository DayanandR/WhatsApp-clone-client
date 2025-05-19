import { MoreVert, Search } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { emptyProfilePicture } from "../../../constants/data.js";
import { AccountContext } from "contexts/AccountProvider.jsx";
import { useContext } from "react";

const ChatHeader = ({ person }) => {
  const { activeUsers } = useContext(AccountContext);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "8px 16px",
        height: "56px",
        background: "#ededed",
      }}
    >
      <img
        src={person.picture || emptyProfilePicture}
        alt="dp"
        style={{
          height: 40,
          width: 40,
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
      <Box>
        <Typography sx={{ ml: 2 }}>{person.name}</Typography>
        <Typography sx={{ ml: 2, fontSize: 12, color: "rgb(0,0,0,0.6)" }}>
          {activeUsers?.find((user) => user.sub === person.sub)
            ? "Online"
            : "Offline"}
        </Typography>
      </Box>
      <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 2 }}>
        <Search />
        <MoreVert />
      </Box>
    </Box>
  );
};

export default ChatHeader;
