import { firebaseHelper } from "../helpers/firebaseHelper";

export const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export const getFirebaseErrorMessage = (errorCode) => {
  const { ERROR_CODES } = firebaseHelper;

  console.log(errorCode);

  switch (errorCode) {
    case ERROR_CODES.INVALID_CREDENTIALS.CODE:
      return ERROR_CODES.INVALID_CREDENTIALS.MESSAGE;
    case ERROR_CODES.TOO_MANY_REQUESTS.CODE:
      return ERROR_CODES.TOO_MANY_REQUESTS.MESSAGE;
    case ERROR_CODES.EMAIL_EXISTS.CODE:
      return ERROR_CODES.EMAIL_EXISTS.MESSAGE;
    default:
      return ERROR_CODES.DEFAULT_MESSAGE;
  }
};
