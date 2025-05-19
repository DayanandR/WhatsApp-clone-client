import { ArrowBack } from "@mui/icons-material";
import {
  alpha,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext } from "react";
import { AccountContext } from "contexts/AccountProvider";

const InfoDrawer = ({ openDrawer, setOpen }) => {
  const theme = useTheme();
  const { account, setAccount } = useContext(AccountContext);

  const handleLogout = () => {
    setAccount(null);
    localStorage.clear(); 
    window.location.reload();
  };

  return (
    <Drawer
      open={openDrawer}
      onClose={() => setOpen(false)}
      slotProps={{
        paper: {
          sx: {
            left: 20,
            top: 17,
            height: "95%",
            width: { xs: "80%", sm: "60%", md: "40%", lg: "30%" },
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: theme.palette.background.paper,
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
      style={{ zIndex: 1500 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1.5,
          backgroundColor: alpha(theme.palette.primary.light, 1),
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: "#fff",
        }}
      >
        <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" fontWeight={600}>
          Profile
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
        <Avatar
          src={account?.picture}
          alt={account?.name}
          sx={{ width: 100, height: 100 }}
        />
      </Box>

      <Box
        sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="caption" color="textSecondary">
              Your Name
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {account?.name || "Not Set"}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="caption" color="textSecondary">
              About
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {account?.about || "Available"}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Typography variant="caption" color="textSecondary">
            Email
          </Typography>
          <Typography variant="body1" sx={{ mt: 0.5 }}>
            {account?.email}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ px: 2, pb: 2 }}>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default InfoDrawer;
