import axios from "axios";

const url = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const addUser = async (data) => {
  try {
    await axios.post(`${url}/add`, data);
  } catch (error) {
    console.log("Error", error);
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${url}/users`);
    return response.data;
  } catch (error) {
    console.log("first", error);
  }
};

export const setConversation = async (data) => {
  try {
    await axios.post(`${url}/conversation/add`, data);
  } catch (error) {
    console.log("Error", error.message);
  }
};

export const getConversation = async (data) => {
  try {
    const response = await axios.post(`${url}/conversation/get`, data);
    return response.data;
  } catch (error) {
    console.log("Error", error.message);
  }
};

export const newMessage = async (data) => {
  try {
    await axios.post(`${url}/message/add`, data);
  } catch (error) {
    console.log("Error", error.message);
  }
};

export const getMessages = async (id) => {
  try {
    const response = await axios.get(`${url}/message/get/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error", error.message);
  }
};

export const UploadFile = async (data) => {
  try {
    const response = await axios.post(`${url}/file/upload`, data);
    return response.data;
  } catch (error) {
    console.log("Error", error.message);
  }
};

// export const getFile = async (filename) => {
//   try {
//     const response = await axios.get(`${url}/file/get/${filename}`, {
//       responseType: "blob",
//     });
//     return response.data;
//   } catch (error) {
//     console.log("Error", error.message);
//   }
// };

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${url}/user/${id}`);
  } catch (error) {
    console.log("Error deleting user", error.message);
  }
};

export const deleteChat = async (chatId) => {
  try {
    await axios.delete(`${url}/chat/${chatId}`);
  } catch (error) {
    console.log("Error deleting chat", error.message);
  }
};

export const deleteMessageById = async (id) => {
  try {
    await axios.delete(`${url}/message/delete/${id}`);
  } catch (error) {
    console.log("Error deleting message", error.message);
  }
};
