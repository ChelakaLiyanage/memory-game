import axios from "axios";
import { ref, set } from "firebase/database";

import { database } from "../utils/firebase";

export const getQuestion = async () => {
  try {
    const response = await axios.get(
      "https://marcconrad.com/uob/banana/api.php"
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveGameScore = (gameId, userId, userName, difficulty, score) => {
  set(ref(database, `leaderboard/${difficulty}/${gameId}`), {
    userId,
    userName,
    difficulty,
    score,
    negativeScore: -score,
  })
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};
