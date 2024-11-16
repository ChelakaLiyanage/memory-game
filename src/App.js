import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GamePage from "./pages/gamePage/GamePage";
import MainPage from "./pages/mainPage/MainPage";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";

import AuthenticatedWrapper from "./components/wrappers/Authenticated";
import UnAuthenticatedWrapper from "./components/wrappers/UnAuthenticated";

import AuthenticationProvider from "./providers/AuthenticationProvider";

import { routeHelper } from "./helpers/routeHelper";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthenticationProvider>
          <Routes>
            <Route element={<UnAuthenticatedWrapper />}>
              <Route path={routeHelper.SIGNUP.PATH} element={<SignUp />} />
              <Route path={routeHelper.SIGNIN.PATH} element={<SignIn />} />
            </Route>
            <Route element={<AuthenticatedWrapper />}>
              <Route path={routeHelper.MAINPAGE.PATH} element={<MainPage />} />
              <Route
                path={routeHelper.LEADERBOARD.PATH}
                element={<Leaderboard />}
              />
              <Route path={routeHelper.GAMEPAGE.PATH} element={<GamePage />} />
            </Route>
            <Route
              path="*"
              element={<Navigate to={routeHelper.MAINPAGE.PATH} />}
            />
          </Routes>
        </AuthenticationProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
