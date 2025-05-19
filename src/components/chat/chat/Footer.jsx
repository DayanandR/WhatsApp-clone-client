import {
  AttachFile,
  EmojiEmotionsOutlined,
  Mic,
  Send,
} from "@mui/icons-material";
import { Box, InputBase, IconButton, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { UploadFile } from "service/api";

const Container = styled(Box)`
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: #ededed;
  height: 56px;
  box-sizing: border-box;
  width: 100%;
`;

const InputWrapper = styled(Box)`
  background-color: #ffffff;
  flex: 1;
  margin: 0 12px;
  border-radius: 10px;
  padding: 5px 15px;
  display: flex;
  align-items: center;
`;

const StyledInput = styled(InputBase)`
  width: 100%;
  font-size: 14px;
`;

const Footer = ({ sendText, setValue, value, file, setFile, setFileUrl }) => {
  const [loading, setLoading] = useState(false);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendText();
    }
  };

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setValue(selectedFile.name);

    e.target.value = null;
  };

  useEffect(() => {
    const getFile = async () => {
      if (file) {
        setLoading(true); // show loader
        const data = new FormData();
        data.append("file", file);
        data.append("name", file.name);

        try {
          const response = await UploadFile(data);
          setFileUrl(response.fileUrl);
        } catch (error) {
          console.error("File upload failed:", error);
        }
        setLoading(false); // hide loader
      }
    };
    getFile();
  }, [file]);

  return (
    <Container>
      <Box sx={{ display: "flex", gap: 2 }}>
        <EmojiEmotionsOutlined sx={{ cursor: "pointer" }} />
        <label htmlFor="file-upload">
          <AttachFile sx={{ transform: "rotate(40deg)", cursor: "pointer" }} />
        </label>
        <input
          type="file"
          style={{ display: "none" }}
          id="file-upload"
          onChange={(e) => onFileChange(e)}
        />
      </Box>
      <InputWrapper>
        <StyledInput
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          value={value}
          placeholder="Type a message"
        />
      </InputWrapper>

     {loading ? (
  <IconButton disabled>
    <Box
      sx={{
        border: "2px solid #ccc",
        borderTop: "2px solid #1976d2",
        borderRadius: "50%",
        width: "18px",
        height: "18px",
        animation: "spin 1s linear infinite",
      }}
    />
  </IconButton>
) : value.trim() ? (
  <IconButton onClick={sendText}>
    <Send />
  </IconButton>
) : (
  <Mic sx={{ cursor: "pointer" }} />
)}

    </Container>
  );
};

export default Footer;
