

export const convertMsToDate = (ms: number): string => {
  const date = new Date(ms); // Convert milliseconds to Date object
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};