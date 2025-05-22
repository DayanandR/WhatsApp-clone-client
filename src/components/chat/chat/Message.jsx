import {
  Box,
  Typography,
  Link,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { deleteMessageById } from "service/api";
import { useState } from "react";

const Message = ({ message, account, refreshMessages }) => {
  const istTime = new Date(message.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  const isSender = message.senderId === account.sub;
  const isImage = (name) => /\.(jpg|jpeg|png|gif)$/i.test(name);
  const isPdf = (name) => /\.pdf$/i.test(name);
  const isAudio = (name) => /\.(mp3|wav|ogg|webm)$/i.test(name);
  const isVideo = (name) => /\.(mp4|webm|ogg)$/i.test(name);

  const [hovered, setHovered] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm("Delete this message?");
    if (confirm) {
      await deleteMessageById(message._id);
      refreshMessages && refreshMessages();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isSender ? "flex-end" : "flex-start",
        marginBottom: "10px",
        px: 2,
        position: "relative",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Delete Icon */}
      {isSender && hovered && (
        <Tooltip title="Delete message" arrow>
          <IconButton
            onClick={handleDelete}
            size="small"
            sx={{
              position: "absolute",
              top: 0,
              right: isSender ? 0 : "unset",
              left: isSender ? "unset" : 0,
              transform: "translateY(-50%)",
              backgroundColor: "white",
              boxShadow: 1,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
              zIndex: 10,
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

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
                alt="uploaded"
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
                sx={{
                  display: "block",
                  fontSize: "13px",
                  color: "#0645AD",
                }}
              >
                {message.text}
              </Link>
            </Box>
          ) : isAudio(message.text) ? (
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: isSender ? "#e6f3d1" : "#f5f5f5",
                maxWidth: 400,
                boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
              }}
            >
              <audio
                controls
                style={{
                  width: "100%",
                  outline: "none",
                  borderRadius: 8,
                }}
              >
                <source
                  src={message.fileUrl}
                  type={`audio/${message.text.split(".").pop()}`}
                />
                Your browser does not support the audio element.
              </audio>
              <Typography
                variant="body2"
                sx={{ mt: 1, fontWeight: 500, wordBreak: "break-word" }}
              >
                {message.text}
              </Typography>
            </Box>
          ) : isVideo(message.text) ? (
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: isSender ? "#e6f3d1" : "#f5f5f5",
                maxWidth: 400,
                boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
              }}
            >
              <video
                controls
                style={{
                  width: "100%",
                  borderRadius: 8,
                  maxHeight: 280,
                  display: "block",
                  outline: "none",
                }}
                src={message.fileUrl}
              >
                <source
                  src={message.fileUrl}
                  type={`video/${message.text.split(".").pop()}`}
                />
                Your browser does not support the video tag.
              </video>
              <Typography
                variant="body2"
                sx={{ mt: 1, fontWeight: 500, wordBreak: "break-word" }}
              >
                {message.text}
              </Typography>
            </Box>
          ) : isPdf(message.text) ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PictureAsPdfIcon sx={{ fontSize: 40, color: "#d32f2f" }} />
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
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <InsertDriveFileIcon sx={{ fontSize: 40, color: "#1976d2" }} />
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
