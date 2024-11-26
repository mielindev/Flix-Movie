import { Toaster } from "react-hot-toast";
import useRoutesElements from "./routes/useRoutesElements";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
