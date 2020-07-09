class Queen extends Piece{
    constructor(color){
        super(color);
        this.symbol = this.setSymbol();
    }
    setSymbol(){
        return (this.color === 'White') ? '&#9813' : '&#9819';
    }
    possibleMoves(board, start, search){
        var positions = [];

        //Moving Left
        for(let i = start.x - 1; i > 0; i--){
            if(board[8 * (start.y - 1) + i - 1].piece.color === ''){
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (start.y - 1) + i - 1))){
                    positions.push(8 * (start.y - 1) + i - 1);
                }
            }
            else if(board[8 * (start.y - 1) + i - 1].piece.color === this.color){
                break;
            }
            else{
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (start.y - 1) + i - 1))){
                    positions.push(8 * (start.y - 1) + i - 1);
                    break;
                }
            }
        }

        //Moving Right
        for(let i = start.x + 1; i < 9; i++){
            if(board[8 * (start.y - 1) + i - 1].piece.color === ''){
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (start.y - 1) + i - 1))){
                    positions.push(8 * (start.y - 1) + i - 1);
                }
            }
            else if(board[8 * (start.y - 1) + i - 1].piece.color === this.color){
                break;
            }
            else{
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (start.y - 1) + i - 1))){
                    positions.push(8 * (start.y - 1) + i - 1);
                    break;
                }
            }
        }

        //Moving Up
        for(let i = start.y - 1; i > 0; i--){
            if(board[8 * (i - 1) + start.x - 1].piece.color === ''){
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (i - 1) + start.x - 1))){
                    positions.push(8 * (i - 1) + start.x - 1);
                }
            }
            else if(board[8 * (i - 1) + start.x - 1].piece.color === this.color){
                break;
            }
            else{
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (i - 1) + start.x - 1))){
                    positions.push(8 * (i - 1) + start.x - 1);
                    break;
                }
            }
        }

        //Moving Down
        for(let i = start.y + 1; i < 9; i++){
            if(board[8 * (i - 1) + start.x - 1].piece.color === ''){
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (i - 1) + start.x - 1))){
                    positions.push(8 * (i - 1) + start.x - 1);
                }
            }
            else if(board[8 * (i - 1) + start.x - 1].piece.color === this.color){
                break;
            }
            else{
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (i - 1) + start.x - 1))){
                    positions.push(8 * (i - 1) + start.x - 1);
                    break;
                }
            }
        }

        //Moving Up-Left
        for(let i = start.x - 1, j = start.y - 1; i > 0 && j > 0; i--, j--){
            if(board[8 * (j - 1) + i - 1].piece.color === ''){
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (j - 1) + i - 1))){
                    positions.push(8 * (j - 1) + i - 1);
                }
            }
            else if(board[8 * (j - 1) + i - 1].piece.color === this.color){
                break;
            }
            else{
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (j - 1) + i - 1))){
                    positions.push(8 * (j - 1) + i - 1);
                    break;
                }
            }
        }

        //Moving Up-Right
        for(let i = start.x + 1, j = start.y - 1; i < 9 && j > 0; i++, j--){
            if(board[8 * (j - 1) + i - 1].piece.color === ''){
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (j - 1) + i - 1))){
                    positions.push(8 * (j - 1) + i - 1);
                }
            }
            else if(board[8 * (j - 1) + i - 1].piece.color === this.color){
                break;
            }
            else{
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (j - 1) + i - 1))){
                    positions.push(8 * (j - 1) + i - 1);
                    break;
                }
            }
        }

        //Moving Down-Left
        for(let i = start.x - 1, j = start.y + 1; i > 0 && j < 9; i--, j++){
            if(board[8 * (j - 1) + i - 1].piece.color === ''){
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (j - 1) + i - 1))){
                    positions.push(8 * (j - 1) + i - 1);
                }
            }
            else if(board[8 * (j - 1) + i - 1].piece.color === this.color){
                break;
            }
            else{
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (j - 1) + i - 1))){
                    positions.push(8 * (j - 1) + i - 1);
                    break;
                }
            }
        }

        //Moving Down-Right
        for(let i = start.x + 1, j = start.y + 1; i < 9 && j < 9; i++, j++){
            if(board[8 * (j - 1) + i - 1].piece.color === ''){
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (j - 1) + i - 1))){
                    positions.push(8 * (j - 1) + i - 1);
                }
            }
            else if(board[8 * (j - 1) + i - 1].piece.color === this.color){
                break;
            }
            else{
                if(search || !this.kingInCheck(this.createTempBoard(board, start.index, 8 * (j - 1) + i - 1))){
                    positions.push(8 * (j - 1) + i - 1);
                    break;
                }
            }
        }

        return positions;
    }
}