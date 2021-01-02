import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import App from "./App";
import Footer from "./Footer";

const sectionStyle = {
  height: "100%",
  backgroundColor: "#f5f3f4",
};

function WrappedApp() {
  return (
    <div style={sectionStyle}>
      <Header title="SHOPPIES" />
      <App />
      <Footer/>
    </div>
  );
}

ReactDOM.render(<WrappedApp />, document.getElementById("root"));
