import useRoutesElements from "./routes/useRoutesElements";

function App() {
  const routesElements = useRoutesElements();
  return <>{routesElements}</>;
}

export default App;
