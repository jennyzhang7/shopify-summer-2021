import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import "./Header.css";

export default function Header(props) {
  const { title } = props;
  return (
    <>
      <div className="headerSection">
        <Toolbar>
          <div className="logo">
            <h1>{title}</h1>
          </div>
        </Toolbar>
      </div>
    </>
  );
}
