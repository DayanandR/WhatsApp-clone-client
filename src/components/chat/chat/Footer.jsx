import {
  AttachFile,
  EmojiEmotionsOutlined,
  Mic,
  Send,
  Stop,
} from "@mui/icons-material";
import {
  Box,
  InputBase,
  IconButton,
  styled,
  ClickAwayListener,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { UploadFile } from "service/api";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const Container = styled(Box)`
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: #ededed;
  height: 56px;
  box-sizing: border-box;
  width: 100%;
  position: relative;
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

const EmojiWrapper = styled(Box)`
  position: absolute;
  bottom: 60px;
  left: 20px;
  z-index: 1000;
`;

const Footer = ({ sendText, setValue, value, file, setFile, setFileUrl }) => {
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Handle Enter key for sending text
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendText();
    }
  };

  // Handle file upload input change
  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setValue(selectedFile.name);
    e.target.value = null;
  };

  // Upload file or audio blob when file changes
  useEffect(() => {
    const getFile = async () => {
      if (file) {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", file.name);
        try {
          const response = await UploadFile(formData);
          setFileUrl(response.fileUrl);
        } catch (error) {
          console.error("File upload failed:", error);
        }
        setLoading(false);
      }
    };
    getFile();
  }, [file]);

  // Add emoji to input value
  const addEmoji = (emoji) => {
    setValue((prev) => prev + emoji.native);
  };

  // Start recording audio
  const startRecording = async () => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert("Your browser does not support audio recording.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioFile = new File([audioBlob], `voice-message-${Date.now()}.webm`, {
          type: "audio/webm",
        });
        setFile(audioFile);
        setValue("Voice message...");
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
      alert("Could not access microphone.");
    }
  };

  // Stop recording audio
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Toggle recording state on mic icon click
  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <Container>
      <Box sx={{ display: "flex", gap: 2, position: "relative" }}>
        <ClickAwayListener onClickAway={() => setShowEmojiPicker(false)}>
          <Box>
            <EmojiEmotionsOutlined
              sx={{ cursor: "pointer" }}
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            />
            {showEmojiPicker && (
              <EmojiWrapper>
                {/* @ts-ignore */}
                <Picker data={data} onEmojiSelect={addEmoji} theme="light" />
              </EmojiWrapper>
            )}
          </Box>
        </ClickAwayListener>

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
          disabled={isRecording}
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
              "@keyframes spin": {
                from: { transform: "rotate(0deg)" },
                to: { transform: "rotate(360deg)" },
              },
            }}
          />
        </IconButton>
      ) : value.trim() ? (
        <IconButton onClick={sendText}>
          <Send />
        </IconButton>
      ) : (
        <IconButton onClick={handleMicClick}>
          {isRecording ? (
            <Stop sx={{ color: "red", cursor: "pointer" }} />
          ) : (
            <Mic sx={{ cursor: "pointer" }} />
          )}
        </IconButton>
      )}
    </Container>
  );
};

export default Footer;
