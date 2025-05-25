import { useContext,  useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { AccountContext } from "contexts/AccountProvider";

const HeaderMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setAccount } = useContext(AccountContext);

  const handleLogout = () => {
    setAccount(null);
    localStorage.clear();
    window.location.reload();
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVert fontSize="medium" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          sx={{
            padding: "15px 60px 5px 24px",
            color: "#4a4a4a",
            fontSize: "14px",
          }}
          onClick={handleClose}
        >
          Profile
        </MenuItem>

        <MenuItem
          sx={{
            padding: "15px 60px 5px 24px",
            color: "#4a4a4a",
            fontSize: "14px",
          }}
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default HeaderMenu;
