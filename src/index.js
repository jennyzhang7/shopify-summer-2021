import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import App from "./App";
import Footer from "./Footer";

var sectionStyle = {
  // backgroundImage: `url(${Background})`,
  // backgroundRepeat: "repeat-y",
  // backgroundSize: "100%",
  height: "100%",
  backgroundColor: "#f5f3f4",
  // background: "linear-gradient(90deg, #f5f3f4 50%, #1d3557 50%)",
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
