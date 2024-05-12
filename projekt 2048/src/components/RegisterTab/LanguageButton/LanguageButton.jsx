import PropTypes from "prop-types";

function LanguageButton({ language, onClick }) {
  return <button onClick={onClick}>{language === "pl" ? "ENG" : "PL"}</button>;
}

LanguageButton.propTypes = {
  language: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LanguageButton;
