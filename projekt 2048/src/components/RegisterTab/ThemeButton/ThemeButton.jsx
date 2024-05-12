import PropTypes from "prop-types";

function ThemeButton({ theme, onClick }) {
  return (
    <button onClick={onClick}>
      {theme === "light" ? "Ciemny motyw" : "Jasny motyw"}
    </button>
  );
}

ThemeButton.propTypes = {
  theme: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ThemeButton;
