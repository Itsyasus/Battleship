import React from "react";
import GameBoard from "./GameBoard.jsx";
import battleship from "../utilities/battleshipBoard.js";

var update = require("react-addons-update");

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.fire = this.fire.bind(this);
    this.switchTurn = this.switchTurn.bind(this);

    this.state = {
      whoseTurn: 0,
      hasFire: false,
      gameOver: false,
      winner: null,
      playerBoards: [
        battleship.boardWithShips(this.props.ships[1]),
        battleship.boardWithShips(this.props.ships[0])
      ]
    };
  }

  getOtherPlayer() {
    return this.state.whoseTurn === 0 ? 1 : 0;
  }

  fire(row, col) {
    if (this.state.hasFire) {
      return;
    }

    let boards = this.state.playerBoards,
      player = this.state.whoseTurn,
      board = this.state.playerBoards[player],
      newBoard = battleship.fireAt(board, row, col),
      isGameOver = battleship.isWinner(
        newBoard,
        this.props.ships[this.getOtherPlayer()]
      );

    let newBoards = update(boards, {
      [player]: {
        $set: newBoard
      }
    });

    let newState = {
      hasFired: true,
      playerBoards: newBoards,
      gameOver: isGameOver
    };

    if (isGameOver) {
      newState["winner"] = player;
    }

    this.setState(newState);
  }

  switchTurn() {
    this.setState({
      whoseTurn: this.getOtherPlayer(),
      hasFired: false
    });
  }

  render() {
    const { gameOver, whoseTurn, hasFired } = this.state;

    return (
      <div>
        <h1>Player {this.state.whoseTurn}'s turn</h1>
        <GameBoard
          board={this.state.playerBoards[0]}
          canFire={!this.state.hasFired}
          onFire={this.fire.bind(this)}
          visible={whoseTurn === 0}
        />
        <GameBoard
          board={this.state.playerBoards[1]}
          canFire={!this.state.hasFired}
          onFire={this.fire.bind(this)}
          visible={whoseTurn === 1}
        />
        {gameOver ? <h1>Player {this.state.winner} wins!</h1> : ""}
        {hasFired && !gameOver ? (
          <button onClick={this.switchTurn}>Next Player</button>
        ) : (
          ""
        )}
      </div>
    );
  }
}
