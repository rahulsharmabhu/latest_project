import "./App.css";
import DockManager from "./components/dock-manager/index";
import { Provider } from "react-redux";
import store from "./app-redux/store";
import CustomRibbon from "./components/ribbon";
import "bootstrap/dist/css/bootstrap.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouting from "./routes/AppRouting";

function App() {
  return (
    <Provider store={store}>
      <AppRouting />
    </Provider>
  );
}

export default App;
