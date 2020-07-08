class King extends Piece{
    constructor(color){
        super(color);
        this.symbol = this.setSymbol();
        this.canCastle = true;
    }
    setSymbol(){
        return (this.color === 'White') ? '&#9812' : '&#9818';
    }
    possibleMoves(board, start, search){
        var positions = [];

        //Moving Left
        if(start.x - 1 > 0){
            if(board[8 * (start.y - 1) + start.x - 2].piece.color !== this.color){
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (start.y - 1) + start.x - 2))){
                    positions.push(8 * (start.y - 1) + start.x - 2);
                }
            }
        }

        //Moving Right
        if(start.x + 1 < 9){
            if(board[8 * (start.y - 1) + start.x].piece.color !== this.color){
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (start.y - 1) + start.x))){
                    positions.push(8 * (start.y - 1) + start.x);
                }
            }
        }
        
        //Moving Up
        if(start.y - 1 > 0){
            if(board[8 * (start.y - 2) + start.x - 1].piece.color !== this.color){
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (start.y - 2) + start.x - 1))){
                    positions.push(8 * (start.y - 2) + start.x - 1);
                }
            }
        }

        //Moving Down
        if(start.y + 1 < 9){
            if(board[8 * (start.y) + start.x - 1].piece.color !== this.color){
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (start.y) + start.x - 1))){
                    positions.push(8 * (start.y) + start.x - 1);
                }
            }
        }

        //Moving Up-Left
        if(start.x - 1 > 0 && start.y - 1 > 0){
            if(board[8 * (start.y - 2) + start.x - 2].piece.color !== this.color){
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (start.y - 2) + start.x - 2))){
                    positions.push(8 * (start.y - 2) + start.x - 2);
                }
            }
        }

        //Moving Up-Right
        if(start.x + 1 < 9 && start.y - 1 > 0){
            if(board[8 * (start.y - 2) + start.x].piece.color !== this.color){
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (start.y - 2) + start.x))){
                    positions.push(8 * (start.y - 2) + start.x);
                }
            }
        }

        //Moving Down-Left
        if(start.x - 1 > 0 && start.y + 1 < 9){
            if(board[8 * (start.y) + start.x - 2].piece.color !== this.color){
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (start.y) + start.x - 2))){
                    positions.push(8 * (start.y) + start.x - 2);
                }
            }
        }

        //Moving Down-Right
        if(start.x + 1 < 9 && start.y + 1 < 9){
            if(board[8 * (start.y) + start.x].piece.color !== this.color){
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (start.y) + start.x))){
                    positions.push(8 * (start.y) + start.x);
                }
            }
        }

        //Castle King Side
        if(!search && !board[start.index].inCheck(board, this.color) && this.castleKingSide(board, start)){
            positions.push(start.index + 2);
        }

        //Castle Queen Side
        if(!search && !board[start.index].inCheck(board, this.color) && this.castleQueenSide(board, start)){
            positions.push(start.index - 2);
        }

        return positions;
    }

    castleKingSide(board, start){
        if(this.canCastle){
            if(board[start.index + 3].piece.symbol === '&#9814' || board[start.index + 3].piece.symbol === '&#9820'){
                if(board[start.index + 3].piece.canCastle){
                    for(let i = 1; i < 3; i++){
                        if(board[start.index + i].piece.symbol !== '' || board[start.index + i].inCheck(board, this.color)){
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
    }

    castleQueenSide(board, start){
        if(this.canCastle){
            if(board[start.index - 4].piece.symbol === '&#9814' || board[start.index - 4].piece.symbol === '&#9820'){
                if(board[start.index - 4].piece.canCastle){
                    for(let i = 1; i < 4; i++){
                        if(board[start.index - i].piece.symbol !== '' || board[start.index - i].inCheck(board, this.color)){
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
    }
}