class Pawn extends Piece{
    constructor(color){
        super(color);
        this.symbol = this.setSymbol();
        this.enPassant = false;
    }
    setSymbol(){
        return (this.color === 'White') ? '&#9817' : '&#9823';
    }
    possibleMoves(board, start){
        var positions = [];
        
        if(this.color === 'White'){
            if(start.y === 7 && board[8 * (start.y - 3) + start.x - 1].piece.color === ''){ //Double Step
                positions.push(8 * (start.y - 3) + start.x - 1);
            }
            if(start.y - 1 > 0 && board[8 * (start.y - 2) + start.x - 1].piece.color === ''){ //Single Step
                positions.push(8 * (start.y - 2) + start.x - 1);
            }
            if(start.y - 1 > 0 && start.x - 1 > 0 && board[8 * (start.y - 2) + start.x - 2].piece.color === 'Black'){ //Capture Left
                positions.push(8 * (start.y - 2) + start.x - 2);
            }
            if(start.y - 1 > 0 && start.x + 1 < 9 && board[8 * (start.y - 2) + start.x].piece.color === 'Black'){ //Capture Right
                positions.push(8 * (start.y - 2) + start.x);
            }
            if(start.y === 4 && board[8 * (start.y - 1) + start.x - 2].piece.symbol === '&#9823' && board[8 * (start.y - 1) + start.x - 2].piece.enPassant){ //En Passant Left
                positions.push(8 * (start.y - 2) + start.x - 2);
            }
            if(start.y === 4 && board[8 * (start.y - 1) + start.x].piece.symbol === '&#9823' && board[8 * (start.y - 1) + start.x].piece.enPassant){ //En Passant Right
                positions.push(8 * (start.y - 2) + start.x);
            }
        }
        else{
            if(start.y === 2 && board[8 * (start.y + 1) + start.x - 1].piece.color === ''){ //Double Step
                positions.push(8 * (start.y + 1) + start.x - 1);
            }
            if(start.y + 1 < 9 && board[8 * (start.y) + start.x - 1].piece.color === ''){ //Single Step
                positions.push(8 * (start.y) + start.x - 1);
            }
            if(start.y + 1 < 9 && start.x - 1 > 0 && board[8 * (start.y) + start.x - 2].piece.color === 'White'){ //Capture Left
                positions.push(8 * (start.y) + start.x - 2);
            }
            if(start.y + 1 < 9 && start.x + 1 < 9 && board[8 * (start.y) + start.x].piece.color === 'White'){ //Capture Right
                positions.push(8 * (start.y) + start.x);
            }
            if(start.y === 5 && board[8 * (start.y - 1) + start.x - 2].piece.symbol === '&#9817' && board[8 * (start.y - 1) + start.x - 2].piece.enPassant){ //En Passant Left
                positions.push(8 * (start.y) + start.x - 2);
            }
            if(start.y === 5 && board[8 * (start.y - 1) + start.x].piece.symbol === '&#9817' && board[8 * (start.y - 1) + start.x - 2].piece.enPassant){ //En Passant Right
                positions.push(8 * (start.y) + start.x);
            }
        }
        return positions;
    }
}