import React from "react";
import ReactDOM from "react-dom";
import "@shopify/polaris/dist/styles.css";
import { AppProvider, FooterHelp, Link } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

import App from "./App";

function WrappedApp() {
  return (
    <AppProvider i18n={enTranslations}>
      <App />
      <FooterHelp>
        Created by Jenny Zhang, learn more about me {" "}
        <Link url="https://jennyz.dev">here.</Link>
      </FooterHelp>
    </AppProvider>
  );
}

ReactDOM.render(<WrappedApp />, document.getElementById("root"));
