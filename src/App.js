import Router from "./route/Index";
import ThemeProvider from "./layout/provider/Theme";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <ThemeProvider>
      <ToastContainer/>
      <Router />
    </ThemeProvider>
  );
};
export default App;