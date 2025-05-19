import { Box, Typography, Link, Chip } from "@mui/material";
import { emptyChatImage } from "../../../constants/data";

const EmptyChat = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        textAlign: "center",
        color: "#4a4a4a",
      }}
    >
      {/* Illustration */}
      <Box sx={{ maxWidth: 300, mb: 3 }}>
        <img
          src={emptyChatImage}
          alt="empty-chat"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      {/* Title with NEW badge */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          mb: 1,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          WhatsApp Web
        </Typography>
        <Chip
          label="NEW"
          size="small"
          sx={{
            backgroundColor: "#e6f4ea",
            color: "#34a853",
            fontWeight: "bold",
            height: 22,
          }}
        />
      </Box>

      {/* Description */}
      <Typography
        variant="body2"
        sx={{ maxWidth: 420, mb: 2, color: "#5f6368" }}
      >
        Welcome to your chat space. Start a new conversation to stay connected
        with your contacts in real-time.
      </Typography>

      <Typography variant="body2" sx={{ color: "#5f6368", mb: 6 }}>
        💬 Messages you send and receive will appear here.{" "}
        <Link href="#" underline="hover" sx={{ cursor: "pointer" }}>
          Learn more
        </Link>
      </Typography>

      {/* Footer */}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ position: "absolute", bottom: 12 }}
      >
        🔒 End-to-end encrypted
      </Typography>
    </Box>
  );
};

export default EmptyChat;
