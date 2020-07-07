class Pawn extends Piece{
    constructor(color){
        super(color);
        this.symbol = this.setSymbol();
    }
    setSymbol(){
        return (this.color === 'White') ? '&#9817' : '&#9823';
    }
    possibleMoves(board, start){
        var positions = [];
        
        if(this.color === 'White'){
            if(start.y === 7 && board[8 * (start.y - 3) + start.x - 1].piece.color === ''){
                positions.push(8 * (start.y - 3) + start.x - 1);
            }
            if(start.y - 1 > 0 && board[8 * (start.y - 2) + start.x - 1].piece.color === ''){
                positions.push(8 * (start.y - 2) + start.x - 1);
            }
            if(start.y - 1 > 0 && start.x - 1 > 0 && board[8 * (start.y - 2) + start.x - 2].piece.color === 'Black'){
                positions.push(8 * (start.y - 2) + start.x - 2);
            }
            if(start.y - 1 > 0 && start.x + 1 < 9 && board[8 * (start.y - 2) + start.x].piece.color === 'Black'){
                positions.push(8 * (start.y - 2) + start.x);
            }
        }
        else{
            if(start.y === 2 && board[8 * (start.y + 1) + start.x - 1].piece.color === ''){
                positions.push(8 * (start.y + 1) + start.x - 1);
            }
            if(start.y + 1 < 9 && board[8 * (start.y) + start.x - 1].piece.color === ''){
                positions.push(8 * (start.y) + start.x - 1);
            }
            if(start.y + 1 < 9 && start.x - 1 > 0 && board[8 * (start.y) + start.x - 2].piece.color === 'White'){
                positions.push(8 * (start.y) + start.x - 2);
            }
            if(start.y + 1 < 9 && start.x + 1 < 9 && board[8 * (start.y) + start.x].piece.color === 'White'){
                positions.push(8 * (start.y) + start.x);
            }
        }
        return positions;
    }
}