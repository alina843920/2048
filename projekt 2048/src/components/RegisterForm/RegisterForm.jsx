import React, { useState } from "react";
import PropTypes from "prop-types";
import "./RegisterForm.scss";

const RegisterForm = (props) => {
  const { onRegister } = props;
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [isRulesAccepted, setIsRulesAccepted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(login, password);
  };

  const handleLoginChange = (event) => {
    const { value: newLogin } = event.target;
    setLogin(newLogin);
  };

  const handlePasswordChange = (event) => {
    const { value: newPassword } = event.target;
    setPassword(newPassword);
  };

  const handleRepeatedPasswordChange = (event) => {
    const { value: newRepeatedPassword } = event.target;
    setRepeatedPassword(newRepeatedPassword);
  };

  const handleRulesAcceptationChange = (event) => {
    const { checked: newIsRulesAccepted } = event.target;
    setIsRulesAccepted(newIsRulesAccepted);
  };
  const validateForm = () => {
    if (login.length < 5 || login.length > 20) return false;
    if (password.length < 8 || password.length > 30) return false;
    if (password !== repeatedPassword) return false;
    if (!isRulesAccepted) return false;
    return true;
  };
  const isFormValid = validateForm();

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <input
        name="login"
        type="text"
        placeholder="Wpisz login"
        value={login}
        onChange={handleLoginChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Wpisz hasło"
        value={password}
        onChange={handlePasswordChange}
      />

      <input
        name="repeated-password"
        type="password"
        placeholder="Powtórz hasło"
        value={repeatedPassword}
        onChange={handleRepeatedPasswordChange}
      />
      <label>
        <input
          name="rules-acceptation"
          type="checkbox"
          checked={isRulesAccepted}
          onChange={handleRulesAcceptationChange}
        />
        <span>Akceptuję regulamin</span>
      </label>
      <button className="button" disabled={!isFormValid}>
        Zarejestruj konto
      </button>
    </form>
  );
};

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default RegisterForm;
