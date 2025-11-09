import { useState, useEffect } from 'react';
import { Trophy, RotateCcw } from 'lucide-react';
import GameBoard from './components/GameBoard';
import { checkWinner, isBoardFull } from './utils/gameLogic';
import { loadGameState, saveGameState, clearGameState } from './utils/storage';

type Player = 'X' | 'O' | null;

function App() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<'X' | 'O' | 'draw' | null>(null);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      setScores(savedState.scores);
    }
  }, []);

  useEffect(() => {
    if (winner) {
      saveGameState({ scores });
    }
  }, [scores, winner]);

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setScores(prev => ({ ...prev, [gameWinner]: prev[gameWinner] + 1 }));
    } else if (isBoardFull(newBoard)) {
      setWinner('draw');
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const resetAllScores = () => {
    setScores({ X: 0, O: 0, draws: 0 });
    clearGameState();
    resetGame();
  };

  const getWinnerMessage = () => {
    if (winner === 'draw') return '¡Empate, klk!';

    const winMessages = [
      '¡Te di pa\' abajo, manín!',
      '¡Tá klaro que gané!',
      '¡Eso tá duro, pero ganaste!',
      '¡Wepa, victoria!'
    ];

    const loseMessages = [
      'Coño, casi me gana, pero no llega.',
      '¡Diache, me ganaste!',
      '¡Tá difícil, me venciste!',
      'No puede ser, ganaste esta.'
    ];

    if (winner === 'X') {
      return currentPlayer === 'O' ?
        winMessages[Math.floor(Math.random() * winMessages.length)] :
        loseMessages[Math.floor(Math.random() * loseMessages.length)];
    } else {
      return currentPlayer === 'X' ?
        winMessages[Math.floor(Math.random() * winMessages.length)] :
        loseMessages[Math.floor(Math.random() * loseMessages.length)];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-white to-red-600 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-red-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Tres en Línea RD
          </h1>
          <p className="text-gray-600 text-sm">Licey vs Águilas</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 bg-gradient-to-r from-blue-100 to-red-100 p-4 rounded-xl">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{scores.X}</div>
            <div className="text-xs text-gray-600">Licey (X)</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-600">{scores.draws}</div>
            <div className="text-xs text-gray-600">Empates</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">{scores.O}</div>
            <div className="text-xs text-gray-600">Águilas (O)</div>
          </div>
        </div>

        {!winner && (
          <div className="text-center mb-4">
            <p className="text-lg font-semibold text-gray-700">
              Turno de: <span className={currentPlayer === 'X' ? 'text-blue-600' : 'text-red-600'}>
                {currentPlayer === 'X' ? 'Licey' : 'Águilas'}
              </span>
            </p>
          </div>
        )}

        {winner && (
          <div className="text-center mb-4 bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 rounded-xl border-2 border-yellow-400">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
            <p className="text-xl font-bold text-gray-800">
              {getWinnerMessage()}
            </p>
            {winner !== 'draw' && (
              <p className="text-sm text-gray-600 mt-1">
                Ganador: {winner === 'X' ? 'Licey' : 'Águilas'}
              </p>
            )}
          </div>
        )}

        <GameBoard
          board={board}
          onCellClick={handleCellClick}
          winner={winner}
        />

        <div className="flex gap-3 mt-6">
          <button
            onClick={resetGame}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Jugar de Nuevo
          </button>
          <button
            onClick={resetAllScores}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200"
          >
            Reset
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          ¡Dale duro papa!
        </div>
      </div>
    </div>
  );
}

export default App;
