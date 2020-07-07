class King extends Piece{
    constructor(color){
        super(color);
        this.symbol = this.setSymbol();
        this.canCastle = true;
    }
    setSymbol(){
        return (this.color === 'White') ? '&#9812' : '&#9818';
    }
    possibleMoves(board, start){
        var positions = [];

        //Moving Left
        if(start.x - 1 > 0){
            if(board[8 * (start.y - 1) + start.x - 2].piece.color !== this.color){
                positions.push(8 * (start.y - 1) + start.x - 2);
            }
        }

        //Moving Right
        if(start.x + 1 < 9){
            if(board[8 * (start.y - 1) + start.x].piece.color !== this.color){
                positions.push(8 * (start.y - 1) + start.x);
            }
        }
        
        //Moving Up
        if(start.y - 1 > 0){
            if(board[8 * (start.y - 2) + start.x - 1].piece.color !== this.color){
                positions.push(8 * (start.y - 2) + start.x - 1);
            }
        }

        //Moving Down
        if(start.y + 1 < 9){
            if(board[8 * (start.y) + start.x - 1].piece.color !== this.color){
                positions.push(8 * (start.y) + start.x - 1);
            }
        }

        //Moving Up-Left
        if(start.x - 1 > 0 && start.y - 1 > 0){
            if(board[8 * (start.y - 2) + start.x - 2].piece.color !== this.color){
                positions.push(8 * (start.y - 2) + start.x - 2);
            }
        }

        //Moving Up-Right
        if(start.x + 1 < 9 && start.y - 1 > 0){
            if(board[8 * (start.y - 2) + start.x].piece.color !== this.color){
                positions.push(8 * (start.y - 2) + start.x);
            }
        }

        //Moving Down-Left
        if(start.x - 1 > 0 && start.y + 1 < 9){
            if(board[8 * (start.y) + start.x - 2].piece.color !== this.color){
                positions.push(8 * (start.y) + start.x - 2);
            }
        }

        //Moving Down-Right
        if(start.x + 1 < 9 && start.y + 1 < 9){
            if(board[8 * (start.y) + start.x].piece.color !== this.color){
                positions.push(8 * (start.y) + start.x);
            }
        }

        return positions;
    }
}