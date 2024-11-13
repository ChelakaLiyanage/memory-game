import { BrowserRouter, Route, Routes } from "react-router-dom";

import GamePage from "./pages/gamePage/GamePage";
import MainPage from "./pages/MainPage/MainPage";

import { routeHelper } from "./helpers/routeHelper";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={routeHelper.MAINPAGE.PATH} element={<MainPage />} />
          <Route path={routeHelper.GAMEPAGE.PATH} element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
