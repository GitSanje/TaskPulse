import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { GlobalProvider } from "./hooks/globalContextProvider.tsx";
import { ReduxProviders } from "./hooks/ReduxProviders.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <ReduxProviders>

      <GlobalProvider>
        <App />
        <Toaster />
      </GlobalProvider>
            
    </ReduxProviders>
    </BrowserRouter>
  </StrictMode>
);
