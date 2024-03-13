import React from "react";
import ReactDOM from "react-dom/client";

import { initializeNetwork } from "@common/network/init";
import { NetworkSide } from "@common/network/sides";

import "./assets/styles.css";
import "@fontsource/inter";

async function bootstrap() {
  initializeNetwork(NetworkSide.UI);

  const App = (await import("./app")).default;

  const rootElement = document.getElementById("root") as HTMLElement;
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

bootstrap();
