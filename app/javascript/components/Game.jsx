import React from "react";
import Board from "./Board";

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      lastPos: null,
      sortOrder: "descending"
    };
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      lastPos: [getX(i), getY(i)]
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  changeSort(){
    let newSort = this.state.sortOrder == "descending" ? "ascending" : "descending";
    this.setState({
      sortOrder: newSort
    });
  }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      let winnerArray = calculateWinner(current.squares);
      const winner = winnerArray != null ? winnerArray[0] : null;
      const winnerSquares = winnerArray != null ? winnerArray[1] : null;
      const draw = !current.squares.includes(null);
      
      let moves = history.map((step, move) => {
        let bolden = false;
        if(this.state.stepNumber == move){
          bolden = true;
        }
        const desc = move ? 'Go to move #' + move + " X: " + this.state.lastPos[0] + " Y: " + this.state.lastPos[1] : 'Go to game start';
        return (
          <li key={move}>
            <button className={bolden ? "bold" : ""} onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      if(this.state.sortOrder == 'ascending'){
        moves = moves.reverse();
      }

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else if(draw){
        status = "IT'S A DRAW!!!!!!"
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      let sort_toggle = <button onClick={() => this.changeSort()}>
        {this.state.sortOrder}
        </button>

      return (
        <div className="game">
          <div className="game-board">
            <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winner={ winnerSquares }
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div>{sort_toggle}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
      }
  }

  

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], lines[i]];
      }
    }
    return null;
  }

  function getX(i){
    let one = [0, 3, 6];
    if(one.includes(i)){
      return 1;
    }
    let two = [1, 4, 7];
    if(two.includes(i)){
      return 2;
    }
    return 3;
  }

  function getY(i){
    let one = [6, 7, 8];
    if(one.includes(i)){
      return 1;
    }
    let two = [3, 4, 5];
    if(two.includes(i)){
      return 2;
    }
    return 3;
  }

  