import { Box, Typography, CircularProgress } from "@mui/material";
import Footer from "./Footer";
import { AccountContext } from "contexts/AccountProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { getMessages, newMessage } from "service/api";
import MessageList from "./MessageList";

const Messages = ({ person, conversation, searchText }) => {
  const { account, socket, newMessageFlag, setNewMessageFlag } =
    useContext(AccountContext);

  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setIncomingMessage({
        ...data,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    const getMessageDetails = async () => {
      setLoadingMessages(true);
      const data = await getMessages(conversation._id);
      setMessages(data);
      setLoadingMessages(false);
    };

    conversation?._id && getMessageDetails();
  }, [conversation?._id, person?._id, newMessageFlag]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    incomingMessage &&
      conversation?.members?.includes(incomingMessage.senderId) &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, conversation]);

  const sendText = async () => {
    if (value.trim() === "") return;

    let message = {};
    if (!file) {
      message = {
        senderId: account.sub,
        receieverId: person.sub,
        conversationId: conversation._id,
        type: "text",
        text: value,
      };
    } else {
      message = {
        senderId: account.sub,
        receieverId: person.sub,
        conversationId: conversation._id,
        type: "file",
        text: file.name,
        fileUrl: fileUrl,
      };
    }

    socket.current.emit("sendMessage", message);
    await newMessage(message);
    setNewMessageFlag((prev) => !prev);
    setValue("");
    setFile(null);
    setFileUrl("");

    const updatedMessages = await getMessages(conversation._id);
    setMessages(updatedMessages);
  };

  const filteredMessages =
    searchText?.trim() === ""
      ? messages
      : messages.filter((m) =>
          m.text?.toLowerCase().includes(searchText.toLowerCase())
        );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        backgroundImage:
          "url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Box sx={{ flex: 1, overflowY: "auto", padding: "8px 16px" }}>
        {loadingMessages ? (
          <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
        ) : filteredMessages.length > 0 ? (
          <MessageList
            messages={filteredMessages}
            account={account}
            refreshMessages={async () => {
              const updatedMessages = await getMessages(conversation._id);
              setMessages(updatedMessages);
            }}
          />
        ) : (
          <Typography textAlign="center" sx={{ color: "gray", mt: 2 }}>
            No messages found
          </Typography>
        )}
        <div ref={scrollRef} />
      </Box>

      <Box sx={{ flexShrink: 0 }}>
        <Footer
          sendText={sendText}
          setValue={setValue}
          value={value}
          file={file}
          setFile={setFile}
          setFileUrl={setFileUrl}
        />
      </Box>
    </Box>
  );
};

export default Messages;
