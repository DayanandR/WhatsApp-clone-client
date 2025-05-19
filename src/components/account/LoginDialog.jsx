import { Box, Dialog, List, ListItem, styled, Typography } from "@mui/material";
import { qrCodeImage } from "../../constants/data";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AccountContext } from "contexts/AccountProvider";
import { addUser } from "service/api";

const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
  }
`;

const LoginDialog = () => {
  const { setAccount } = useContext(AccountContext);

  const onLoginSuccess = async (res) => {
    const decoded = jwtDecode(res?.credential);

    localStorage.setItem("user", JSON.stringify(decoded));

    setAccount(decoded);
    await addUser(decoded);
  };

  const onLoginError = (err) => {
    console.log(err);
  };
  return (
    <Dialog
      open
      slotProps={{
        paper: {
          sx: {
            height: "85%",
            width: "60%",
            mt: "12%",
            boxShadow: "none",
            maxWidth: "100%",
            maxHeight: "100%",
            overflow: "hidden",
          },
        },
      }}
      hideBackdrop={true}
    >
      <Box sx={{ display: "flex" }}>
        <Box sx={{ padding: "50px 0px 56px 56px" }}>
          <Typography
            sx={{
              fontSize: "20px",
              color: "#525252",
              fontWeight: 300,
              fontFamily: "inherit",
              marginBottom: "25px",
            }}
          >
            To use WhatsApp on your computer:
          </Typography>
          <StyledList>
            <ListItem>1. Open WhatsApp on your phone</ListItem>
            <ListItem>2. Tap Menu Settings and select WhatsApp Web</ListItem>
            <ListItem>
              3. Point your phone to this screen to capture the code
            </ListItem>
          </StyledList>
        </Box>
        <Box position={"relative"}>
          <img
            style={{ height: 264, width: 264, margin: "50px 0 0 50px" }}
            src={qrCodeImage}
            alt="qr-code"
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateX(50%)",
            }}
          >
            <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default LoginDialog;
