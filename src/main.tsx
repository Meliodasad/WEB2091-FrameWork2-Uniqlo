import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import store from "./store/store"; 
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <Provider store={store}>
    <AppRoutes />
    </Provider>
  </React.StrictMode>
);
