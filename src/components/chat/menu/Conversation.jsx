import { Box, Divider, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AccountContext } from "contexts/AccountProvider";
import { useContext } from "react";
import { setConversation, deleteUser } from "service/api";

const Conversation = ({ user }) => {
  const { setPerson, account } = useContext(AccountContext);

  const getUser = async () => {
    setPerson(user);
    await setConversation({ senderId: account.sub, receieverId: user.sub });
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const confirm = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );
    if (confirm) {
      await deleteUser(user._id);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 16px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
        onClick={getUser}
      >
        <Box sx={{ width: 50, height: 50, marginRight: 2 }}>
          <img
            src={user.picture}
            alt="dp"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Box>

        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {user.name}
          </Typography>
        </Box>

        <IconButton onClick={handleDelete} size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <Divider sx={{ backgroundColor: "#eee", opacity: 0.3, ml: 8 }} />
    </>
  );
};

export default Conversation;
