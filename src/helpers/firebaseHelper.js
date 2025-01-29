export const firebaseHelper = Object.freeze({
  ERROR_CODES: {
    DEFAULT_MESSAGE: "Something went wrong",
    INVALID_CREDENTIALS: {
      CODE: "auth/invalid-credential",
      MESSAGE: "Invalid Credentials",
    },
    TOO_MANY_REQUESTS: {
      CODE: "auth/too-many-requests",
      MESSAGE: "Too Many Requests",
    },
    EMAIL_EXISTS: {
      CODE: "auth/email-already-in-use",
      MESSAGE: "Email already in use",
    },
  },
});
