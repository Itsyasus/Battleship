require("../css/styles.css");

import React from "react";
import ReactDOM from "react-dom";
import Game from "../components/Game.jsx";

main();

function main() {
  const app = document.createElement("div");
  const ships = [[0, 1, -1, 2, -1], [0, 1, 1, -1, -1]];

  document.body.appendChild(app);

  ReactDOM.render(<Game ships={ships} />, app);
}
