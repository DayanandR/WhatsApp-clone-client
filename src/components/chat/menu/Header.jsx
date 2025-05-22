import { Chat, MoreVert } from "@mui/icons-material";
import { Box } from "@mui/material";
import { AccountContext } from "contexts/AccountProvider";
import { useContext, useState } from "react";
import HeaderMenu from "./HeaderMenu";
import InfoDrawer from "components/drawer/InfoDrawer";

const Header = () => {
  const { account } = useContext(AccountContext);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#eee",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          height: "56px",
        }}
      >
        <img
          src={account?.picture}
          alt="dp"
          style={{
            height: 40,
            width: 40,
            borderRadius: "50%",
            cursor: "pointer",
          }}
          onClick={() => setOpenDrawer(true)}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginLeft: "auto",
          }}
        >
          <Chat fontSize="medium" sx={{ cursor: "pointer" }} />
          <HeaderMenu />
        </Box>
      </Box>
      <InfoDrawer openDrawer={openDrawer} setOpen={setOpenDrawer} />
    </>
  );
};

export default Header;
