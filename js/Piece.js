class Piece{
    constructor(color){
        this.color = color;
        this.symbol = '';
    }

    possibleMoves(board, start, search){
        throw new Error('Not implemented');
    }

    setSymbol(){
        throw new Error('Not implemented');
    }

    kingLocation(board){
        for(let i = 0; i < board.length; i++){
            if(this.color === 'White'){
                if(board[i].piece.symbol === '&#9812'){
                    return i;
                }
            }
            else if(this.color === 'Black'){
                if(board[i].piece.symbol === '&#9818'){
                    return i;
                }
            }
        }
        return -1;
    }

    kingInCheck(board){
        let kingLoc = this.kingLocation(board);
        if(kingLoc != -1 && board[kingLoc].inCheck(board, this.color)){
            return true;
        }
    }

    createTempBoard(board, start, end){
        let tempBoard = _.cloneDeep(board);

        if(this.symbol === '&#9817'){ //En Passant White
            if(tempBoard[start].y === 4){
                if(tempBoard[end + 8].piece.symbol === '&#9823'){
                    tempBoard[end + 8].piece = new Piece('');
                }
            }
        }
        else if(this.symbol === '&#9823'){ //En Passant Black
            if(tempBoard[start].y === 5){
                if(tempBoard[end - 8].piece.symbol === '&#9817'){
                    tempBoard[end - 8].piece = new Piece('');
                }
            }
        }
        tempBoard[end].piece = tempBoard[start].piece;
        tempBoard[start].piece = new Piece('');

        return tempBoard;
    }
}