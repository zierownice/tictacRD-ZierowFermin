import { X, Circle } from 'lucide-react';

type Player = 'X' | 'O' | null;

interface GameBoardProps {
  board: Player[];
  onCellClick: (index: number) => void;
  winner: 'X' | 'O' | 'draw' | null;
}

function GameBoard({ board, onCellClick, winner }: GameBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-3 bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-2xl shadow-inner">
      {board.map((cell, index) => (
        <button
          key={index}
          onClick={() => onCellClick(index)}
          disabled={!!winner || !!cell}
          className={`
            aspect-square bg-white rounded-xl shadow-md
            flex items-center justify-center
            transition-all duration-200
            ${!cell && !winner ? 'hover:bg-blue-50 hover:scale-105 hover:shadow-lg cursor-pointer' : ''}
            ${cell ? 'cursor-not-allowed' : ''}
            ${winner ? 'opacity-75' : ''}
          `}
        >
          {cell === 'X' && (
            <X className="w-12 h-12 text-blue-600 stroke-[3]" />
          )}
          {cell === 'O' && (
            <Circle className="w-12 h-12 text-red-600 stroke-[3]" />
          )}
        </button>
      ))}
    </div>
  );
}

export default GameBoard;
