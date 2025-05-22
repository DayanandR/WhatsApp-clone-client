import { groupMessagesByDate } from "../../../utils/helper";
import Message from "./Message";
import { Typography, Box } from "@mui/material";

const MessageList = ({ messages, account, refreshMessages }) => {
  const groupedMessages = groupMessagesByDate(messages);

  return (
    <Box>
      {Object.entries(groupedMessages).map(([date, msgs]) => (
        <Box key={date}>
          <Typography
            sx={{
              textAlign: "center",
              color: "gray",
              fontSize: "13px",
              margin: "10px 0",
            }}
          >
            {date}
          </Typography>

          {msgs.map((message) => (
            <Message
              key={message._id}
              message={message}
              account={account}
              refreshMessages={refreshMessages}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default MessageList;
