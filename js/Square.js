class Square{
    constructor(){
        this.piece = new Piece('');
        this.isHighlighted = false;
        this.x = null;
        this.y = null;
        this.index = null;
    }
    
    inCheck(board, currentTurn){
        for(let i = 0; i < board.length; i++){
            if(board[i].piece.color !== currentTurn && board[i].piece.color !== ''){
                let positions = board[i].piece.possibleMoves(board, board[i])
                for(let j = 0; j < positions.length; j++){
                    if(positions[j] === this.index){
                        return true;
                    }
                }
            }
        }
        return false;
    }
};