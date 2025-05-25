import { MoreVert, Search } from "@mui/icons-material";
import { Box, Typography, InputBase } from "@mui/material";
import { emptyProfilePicture } from "../../../constants/data.js";
import { AccountContext } from "contexts/AccountProvider.jsx";
import { useContext, useState } from "react";

const ChatHeader = ({ person, setSearchText }) => {
  const { activeUsers } = useContext(AccountContext);
  const [showSearch, setShowSearch] = useState(false);

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
      <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}>
        {showSearch ? (
          <InputBase
            placeholder="Search messages"
            onChange={(e) => setSearchText(e.target.value)}
            autoFocus
            sx={{
              px: 1,
              backgroundColor: "white",
              borderRadius: "4px",
              fontSize: "14px",
              height: "30px",
              width: "200px",
            }}
          />
        ) : (
          <Search
            onClick={() => setShowSearch(true)}
            sx={{ cursor: "pointer" }}
          />
        )}
        <MoreVert />
      </Box>
    </Box>
  );
};

export default ChatHeader;
