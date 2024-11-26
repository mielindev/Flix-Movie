import { Toaster } from "react-hot-toast";
import useRoutesElements from "./routes/useRoutesElements";

function App() {
  const routesElements = useRoutesElements();
  return (
    <>
      {routesElements}
      <Toaster />
    </>
  );
}

export default App;
