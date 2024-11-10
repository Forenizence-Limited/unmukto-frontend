export const convertMsToDate = (ms: number): string => {
  const date = new Date(ms); // Convert milliseconds to Date object
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

// Helper function to get token from localStorage
export const getToken = () => {
  return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
};

// Helper function to get user from localStorage
export const getUser = () => {
  return typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') ?? "") : null;
};
