import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import RegisterForm from "./components/RegisterTab/RegisterForm/RegisterForm";
import LanguageButton from "./components/RegisterTab/LanguageButton/LanguageButton";
import ThemeButton from "./components/RegisterTab/ThemeButton/ThemeButton";
import GameBoard from "./components/GameTab/Game/GameBoard";

function App() {
  const [language, setLanguage] = useState("pl");
  const [theme, setTheme] = useState("light");

  const handleLanguageChange = () => {
    setLanguage(language === "pl" ? "eng" : "pl");
  };

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleRegister = (login, password) => {
    console.log("Rejestracja użytkownika:", login, password);
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        <h1>2048 Game</h1>
        <div className="registration-section">
          <RegisterForm onRegister={handleRegister} />
        </div>
        <div className="language-section">
          <LanguageButton language={language} onClick={handleLanguageChange} />
        </div>
        <div className="theme-section">
          <ThemeButton theme={theme} onClick={handleThemeChange} />
        </div>
        <Switch>
          <Route path="/game" component={GameBoard} />
          <Redirect from="/" to="/game" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
