import { isToday, isYesterday, format } from "date-fns";

export const groupMessagesByDate = (messages) => {
  const grouped = {};

  messages.forEach((msg) => {
    const msgDate = new Date(msg.createdAt);
    let dateKey;

    if (isToday(msgDate)) {
      dateKey = "Today";
    } else if (isYesterday(msgDate)) {
      dateKey = "Yesterday";
    } else {
      dateKey = format(msgDate, "MMMM dd, yyyy"); // e.g., May 18, 2025
    }

    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(msg);
  });

  return grouped;
};
