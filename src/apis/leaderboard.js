import { ref, orderByChild, query, get } from "firebase/database";

import { database } from "../utils/firebase";

export const getLeaderboardData = async (difficulty) => {
  return get(
    query(
      ref(database, `leaderboard/${difficulty}`),
      orderByChild("negativeScore")
    )
  )
    .then((snapshot) => {
      const data = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          data.push({
            ...childSnapshot.val(),
            gameId: childSnapshot.key, // Retrieve the unique key for the child
          });
        });
      }
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};
