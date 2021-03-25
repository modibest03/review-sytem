import React from "react";

const Error = ({ children }) => {
  return (
    <div id="main">
      <div className="fof">
        <h1>Error {children}</h1>
      </div>
    </div>
  );
};

export default Error;
