import React from 'react';
import Square from './Square';

export default class Board extends React.Component {

    renderSquare(i) {
      let winner = null;
      if(this.props.winner != undefined){
        winner = this.props.winner.includes(i) ? 'winner' : ''
      }
      return <Square 
      value={ this.props.squares[i] } 
      onClick={ () => this.props.onClick(i) }
      winner={ winner }
      />;
    }

    renderSquares(){
      let items = []

      for (var i = 0; i < 9; i+=3) {
        items.push(
        <div key={i} className="board-row">
            {this.renderSquare(i)}
            {this.renderSquare(i+1)}
            {this.renderSquare(i+2)}
          </div>
        )
      }
      let squares = items.map(item => {
        return item;
      });
      return squares;
    }
  
    render() {
  
      return (
        <div>
          <div className="status">{status}</div>
          {this.renderSquares()}
        </div>
      );
    }
  }

  