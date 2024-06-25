export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};
o;
export const validatePassword = (password) => {
  return password.length >= 6;
};
