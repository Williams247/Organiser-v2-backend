export const generateOTPCode = (): string => {
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;
  return randomNumber.toString();
};
