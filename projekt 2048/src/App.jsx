import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <>
      <RegisterForm
        onRegister={(login, password) => {
          alert(login + " " + password);
        }}
      />
    </>
  );
}

export default App;
