class Knight extends Piece{
    constructor(color){
        super(color);
        this.symbol = this.setSymbol();
    }
    setSymbol(){
        return (this.color === 'White') ? '&#9816' : '&#9822';
    }
    possibleMoves(board, start){
        var positions = [];
        
        if(start.x - 1 > 0 && start.y - 2 > 0){
            if(board[(8 * (start.y - 3)) + start.x - 2].piece.color !== start.piece.color){
                positions.push((8 * (start.y - 3)) + start.x - 2);
            }
        }
        if(start.x + 1 < 9 && start.y - 2 > 0){
            if(board[(8 * (start.y - 3)) + start.x].piece.color !== start.piece.color){
                positions.push((8 * (start.y - 3)) + start.x);
            }
        }
        if(start.x - 2 > 0 && start.y - 1 > 0){
            if(board[(8 * (start.y - 2)) + start.x - 3].piece.color !== start.piece.color){
                positions.push((8 * (start.y - 2)) + start.x - 3);
            }
        }
        if(start.x + 2 < 9 && start.y - 1 > 0){
            if(board[(8 * (start.y - 2)) + start.x + 1].piece.color !== start.piece.color){
                positions.push((8 * (start.y - 2)) + start.x + 1);
            }
        }
        if(start.x - 1 > 0 && start.y + 2 < 9){
            if(board[(8 * (start.y + 1)) + start.x - 2].piece.color !== start.piece.color){
                positions.push((8 * (start.y + 1)) + start.x - 2);
            }
        }
        if(start.x + 1 < 9 && start.y + 2 < 9){
            if(board[(8 * (start.y + 1)) + start.x].piece.color !== start.piece.color){
                positions.push((8 * (start.y + 1)) + start.x);
            }
        }
        if(start.x - 2 > 0 && start.y + 1 < 9){
            if(board[(8 * (start.y)) + start.x - 3].piece.color !== start.piece.color){
                positions.push((8 * (start.y)) + start.x - 3);
            }
        }
        if(start.x + 2 < 9 && start.y + 1 < 9){
            if(board[(8 * (start.y)) + start.x + 1].piece.color !== start.piece.color){
                positions.push((8 * (start.y)) + start.x + 1);
            }
        }
        return positions;
    }
}