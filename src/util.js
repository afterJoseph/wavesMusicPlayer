export const calculatePercentage = (initialTime, totalTime) => {
  // Calculate Percentage
  const roundedInitial = Math.round(initialTime);
  const roundedTotal = Math.round(totalTime);
  return Math.round((roundedInitial / roundedTotal) * 100);
};
