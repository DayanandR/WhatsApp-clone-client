import { Box } from "@mui/material";
import Header from "./Header";
import SearchField from "./SearchField";
import Conversations from "./Conversations";
import { useState } from "react";

const WhatsAppMenu = () => {
  const [text, setText] = useState("");
  return (
    <Box>
      <Header />
      <SearchField setText={setText} />
      <Conversations text={text} />
    </Box>
  );
};

export default WhatsAppMenu;
