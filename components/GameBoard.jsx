import React from "react";
import battleship from "../utilities/battleshipBoard.js";

export default class GameBoard extends React.Component {
  renderSquare(row, col) {
    switch (this.props.board[row][col]) {
      case battleship.types.EMPTY:
      case battleship.types.SHIP:
        return (
          <div
            className="empty"
            onClick={this.props.onFire.bind(this, row, col)}
          />
        );
      case battleship.types.HIT:
        return <div className="hit" />;
      case battleship.types.MISS:
        return <div className="miss" />;
    }
  }

  render() {
    let rows = [];
    for (let row = 0; row < 5; row++) {
      let thisRow = [];
      for (let col = 0; col < 5; col++) {
        let square = this.renderSquare(row, col);
        thisRow.push(square);
      }
      rows.push(<div className="game-row">{thisRow}</div>);
    }

    return <div className={this.props.visible ? "" : "hidden"}>{rows}</div>;
  }
}
