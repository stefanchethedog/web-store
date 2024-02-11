import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider, closeSnackbar } from "notistack";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <SnackbarProvider
    action={(snackbarId) => (
      <button
        onClick={() => closeSnackbar(snackbarId)}
        style={{
          backgroundColor: "transparent",
          color: "white",
          border: "none",
          fontWeight: "bold",
          cursor:'pointer'
        }}
      >
        Dismiss
      </button>
    )}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SnackbarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
