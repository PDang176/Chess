class Bishop extends Piece{
    constructor(color){
        super(color);
        this.symbol = this.setSymbol();
    }
    setSymbol(){
        return (this.color === 'White') ? '&#9815' : '&#9821';
    }
    possibleMoves(board, start){
        var positions = [];

        //Moving Up-Left
        for(let i = start.x - 1, j = start.y - 1; i > 0 && j > 0; i--, j--){
            if(board[8 * (j - 1) + i - 1].piece.color === ''){
                positions.push(8 * (j - 1) + i - 1);
            }
            else if(board[8 * (j - 1) + i - 1].piece.color === this.color){
                break;
            }
            else{
                positions.push(8 * (j - 1) + i - 1);
                break;
            }
        }

        //Moving Up-Right
        for(let i = start.x + 1, j = start.y - 1; i < 9 && j > 0; i++, j--){
            if(board[8 * (j - 1) + i - 1].piece.color === ''){
                positions.push(8 * (j - 1) + i - 1);
            }
            else if(board[8 * (j - 1) + i - 1].piece.color === this.color){
                break;
            }
            else{
                positions.push(8 * (j - 1) + i - 1);
                break;
            }
        }

        //Moving Down-Left
        for(let i = start.x - 1, j = start.y + 1; i > 0 && j < 9; i--, j++){
            if(board[8 * (j - 1) + i - 1].piece.color === ''){
                positions.push(8 * (j - 1) + i - 1);
            }
            else if(board[8 * (j - 1) + i - 1].piece.color === this.color){
                break;
            }
            else{
                positions.push(8 * (j - 1) + i - 1);
                break;
            }
        }

        //Moving Down-Right
        for(let i = start.x + 1, j = start.y + 1; i < 9 && j < 9; i++, j++){
            if(board[8 * (j - 1) + i - 1].piece.color === ''){
                positions.push(8 * (j - 1) + i - 1);
            }
            else if(board[8 * (j - 1) + i - 1].piece.color === this.color){
                break;
            }
            else{
                positions.push(8 * (j - 1) + i - 1);
                break;
            }
        }

        return positions;
    }
}