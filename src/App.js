import { BrowserRouter, Route, Routes } from "react-router-dom";

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
          <UnAuthenticatedWrapper>
            <Routes>
              <Route path={routeHelper.SIGNUP.PATH} element={<SignUp />} />
              <Route path={routeHelper.SIGNIN.PATH} element={<SignIn />} />
            </Routes>
          </UnAuthenticatedWrapper>
          <AuthenticatedWrapper>
            <Routes>
              <Route path={routeHelper.MAINPAGE.PATH} element={<MainPage />} />
              <Route
                path={routeHelper.LEADERBOARD.PATH}
                element={<Leaderboard />}
              />
              <Route path={routeHelper.GAMEPAGE.PATH} element={<GamePage />} />
            </Routes>
          </AuthenticatedWrapper>
        </AuthenticationProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
