export const formatDate = (date: string | undefined) => {
  if (!date) {
    return "No Date";
  }
  const dateStr = new Date(date);
  const day = dateStr.getDate();
  const month = dateStr.toLocaleString("default", { month: "short" });
  const year = dateStr.getFullYear();
  return `${day} ${month} ${year}`;
};
