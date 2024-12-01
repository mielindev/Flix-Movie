import { Toaster } from "react-hot-toast";
import useRoutesElements from "./routes/useRoutesElements";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const routesElements = useRoutesElements();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {routesElements}
      <Toaster />
    </LocalizationProvider>
  );
}

export default App;
