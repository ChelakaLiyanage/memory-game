import axios from "axios";

export const getQuestion = async () => {
  try {
    const response = await axios.get(
      "https://marcconrad.com/uob/banana/api.php"
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
