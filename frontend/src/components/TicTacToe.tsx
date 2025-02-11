import React, {useState} from 'react';

type SquareValue = 'X' | 'O' | null;

function calculateWinner(squares: SquareValue[]): SquareValue {
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
            return squares[a];
        }
    }
    return null;
}

const TicTacToe: React.FC = () => {
    const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState<number>(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handleSquareClick(i: number) {
        if (calculateWinner(currentSquares) || currentSquares[i]) {
            return;
        }
        const nextSquares = currentSquares.slice();
        nextSquares[i] = xIsNext ? 'X' : 'O';
        handlePlay(nextSquares);
    }

    function handlePlay(nextSquares: SquareValue[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(move: number) {
        setCurrentMove(move);
    }

    const winner = calculateWinner(currentSquares);
    const status = winner
        ? `Winner: ${winner}`
        : `Next player: ${xIsNext ? 'X' : 'O'}`;

    const moves = history.map((_, move) => {
        const description = move > 0 ? `Go to move #${move}` : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <div className="status">{status}</div>
                <div className="board-row">
                    <button className="square" onClick={() => handleSquareClick(0)}>
                        {currentSquares[0]}
                    </button>
                    <button className="square" onClick={() => handleSquareClick(1)}>
                        {currentSquares[1]}
                    </button>
                    <button className="square" onClick={() => handleSquareClick(2)}>
                        {currentSquares[2]}
                    </button>
                </div>
                <div className="board-row">
                    <button className="square" onClick={() => handleSquareClick(3)}>
                        {currentSquares[3]}
                    </button>
                    <button className="square" onClick={() => handleSquareClick(4)}>
                        {currentSquares[4]}
                    </button>
                    <button className="square" onClick={() => handleSquareClick(5)}>
                        {currentSquares[5]}
                    </button>
                </div>
                <div className="board-row">
                    <button className="square" onClick={() => handleSquareClick(6)}>
                        {currentSquares[6]}
                    </button>
                    <button className="square" onClick={() => handleSquareClick(7)}>
                        {currentSquares[7]}
                    </button>
                    <button className="square" onClick={() => handleSquareClick(8)}>
                        {currentSquares[8]}
                    </button>
                </div>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
};

export default TicTacToe;
