import { Box, Typography, Link } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const Message = ({ message, account }) => {
  const istTime = new Date(message.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  const isSender = message.senderId === account.sub;

  const isImage = (name) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(name);
  };

  const isPdf = (name) => {
    return /\.pdf$/i.test(name);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isSender ? "flex-end" : "flex-start",
        marginBottom: "10px",
        px: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: isSender ? "#dcf8c6" : "#fff",
          padding: "8px 12px",
          borderRadius: "10px",
          maxWidth: "60%",
          wordBreak: "break-word",
          position: "relative",
          boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        {message.type === "file" ? (
          isImage(message.text) ? (
            <Box>
              <img
                src={message.fileUrl}
                alt="uploaded file"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  marginBottom: "5px",
                }}
              />
              <Link
                href={message.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{ display: "block", fontSize: "13px", color: "#0645AD" }}
              >
                {message.text}
              </Link>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {isPdf(message.text) ? (
                <PictureAsPdfIcon sx={{ fontSize: 40, color: "#d32f2f" }} />
              ) : (
                <InsertDriveFileIcon sx={{ fontSize: 40, color: "#1976d2" }} />
              )}
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {message.text}
                </Typography>
                <Link
                  href={message.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{ fontSize: "12px", color: "#0645AD" }}
                >
                  View / Download
                </Link>
              </Box>
            </Box>
          )
        ) : (
          <Typography variant="body2" sx={{ paddingRight: "50px" }}>
            {message.text}
          </Typography>
        )}

        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            bottom: "6px",
            right: "8px",
            fontSize: "10px",
            color: "gray",
          }}
        >
          {istTime}
        </Typography>
      </Box>
    </Box>
  );
};

export default Message;
