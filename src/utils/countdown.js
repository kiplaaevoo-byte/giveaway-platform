export function getRemainingDays(endDate) {
  const today = new Date();

  const end = new Date(endDate);

  const difference = end - today;

  if (difference <= 0) {
    return "Ended";
  }

  const days = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );

  return `${days} day${days === 1 ? "" : "s"} left`;
}