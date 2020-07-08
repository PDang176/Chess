class Game{
    constructor(){
        this.inProgress = true;
        this.winner = null; // 'Black' or 'White'
        this.currentTurn = Game.white;
        this.squares = new Array(64).fill().map(s => new Square());
        this.currentSelected = [];
        this.initializeBoard();
    }

    initializeBoard(){
        //Assign x and y location to squares
        let s = 0;
        for(let i = 1; i < 9; i++){
            for(let j = 1; j < 9; j++){
                this.squares[s].x = j;
                this.squares[s].y = i;
                this.squares[s].index = s;
                s++;
            }
        }

        //Black Pawns
        for(let i = 8; i < 16; i++){
            this.squares[i].piece = new Pawn('Black');
        }

        //White Pawns
        for(let i = 48; i < 56; i++){
            this.squares[i].piece = new Pawn('White');
        }

        //Black Rooks
        this.squares[0].piece = new Rook('Black');
        this.squares[7].piece = new Rook('Black');

        //White Rooks
        this.squares[56].piece = new Rook('White');
        this.squares[63].piece = new Rook('White');

        //Black Knights
        this.squares[1].piece = new Knight('Black');
        this.squares[6].piece = new Knight('Black');
        //White Knights
        this.squares[57].piece = new Knight('White');
        this.squares[62].piece = new Knight('White');

        //Black Bishops
        this.squares[2].piece = new Bishop('Black');
        this.squares[5].piece = new Bishop('Black');

        //White Bishops
        this.squares[58].piece = new Bishop('White');
        this.squares[61].piece = new Bishop('White');

        //Black Queen
        this.squares[3].piece = new Queen('Black');

        //White Queen
        this.squares[59].piece = new Queen('White');

        //Black King
        this.squares[4].piece = new King('Black');

        //White King
        this.squares[60].piece = new King('White');
    }

    removeHighlights(){
        for(let i = 0; i < this.currentSelected.length; i++){
            this.squares[this.currentSelected[i]].isHighlighted = false;
        }
        this.currentSelected.splice(0, this.currentSelected.length);
    }

    removeEnPassant(){
        if(this.currentTurn === Game.white){
            for(let i = 24; i < 32; i++){
                if(this.squares[i].piece.symbol === '&#9823'){
                    this.squares[i].piece.enPassant = false;
                }
            }
        }
        else{
            for(let i = 32; i < 40; i++){
                if(this.squares[i].piece.symbol === '&#9817'){
                    this.squares[i].piece.enPassant = false;
                }
            }
        }
    }

    makeMove(i){
        if(this.inProgress){
            if(i === this.currentSelected[0]){ //Clicking already selected piece (deselects)
                this.removeHighlights();
            }
            else if(this.squares[i].piece.color === this.currentTurn){ //Clicking non-selected piece of player's color
                if(this.currentSelected.length > 0){
                    this.removeHighlights();
                }
                this.squares[i].isHighlighted = true;
                this.currentSelected.push(i);
                let availableMoves = this.squares[i].piece.possibleMoves(this.squares, this.squares[i], false);
                for(let j = 0; j < availableMoves.length; j++){
                    this.squares[availableMoves[j]].isHighlighted = true;
                    this.currentSelected.push(availableMoves[j]);
                }
            }
            else if(this.squares[i].isHighlighted === true){ //Clicking available movement option for selected piece
                if(this.squares[this.currentSelected[0]].piece.symbol === '&#9817'){ // White pawn
                    if(this.squares[i].y === this.squares[this.currentSelected[0]].y - 2){
                        this.squares[this.currentSelected[0]].piece.enPassant = true;
                    }
                }
                else if(this.squares[this.currentSelected[0]].piece.symbol === '&#9823'){ // Black pawn
                    if(this.squares[i].y === this.squares[this.currentSelected[0]].y + 2){
                        this.squares[this.currentSelected[0]].piece.enPassant = true;
                    }
                }
                if(this.squares[this.currentSelected[0]].piece.symbol === '&#9817'){ //En Passant White
                    if(this.squares[this.currentSelected[0]].y === 4){
                        if(this.squares[i + 8].piece.symbol === '&#9823'){
                            this.squares[i + 8].piece = new Piece('');
                        }
                    }
                }
                else if(this.squares[this.currentSelected[0]].piece.symbol === '&#9823'){ //En Passant Black
                    if(this.squares[this.currentSelected[0]].y === 5){
                        if(this.squares[i - 8].piece.symbol === '&#9817'){
                            this.squares[i - 8].piece = new Piece('');
                        }
                    }
                }
                this.squares[i].piece = this.squares[this.currentSelected[0]].piece;
                this.squares[this.currentSelected[0]].piece = new Piece('');
                this.removeHighlights();
                this.removeEnPassant();
                this.currentTurn = (this.currentTurn === Game.white) ? Game.black : Game.white;
                if(this.checkWinner() === "Stalemate"){
                    this.inProgress = false;
                }
                else if(this.checkWinner() === Game.white){
                    this.inProgress = false;
                    this.winner = Game.white;
                }
                else if(this.checkWinner() === Game.black){
                    this.inProgress = false;
                    this.winner = Game.black;
                }
            }
        }
    }

    checkWinner(){
        if(this.kingInCheck()){
            for(let i = 0; i < this.squares.length; i++){
                if(this.squares[i].piece.color === this.currentTurn){
                    if(this.squares[i].piece.possibleMoves(this.squares, this.squares[i], false).length > 0){
                        return "No Winner Yet";
                    }
                }
            }
            return (this.currentTurn === Game.white) ? Game.black : Game.white;
        }
        else{
            for(let i = 0; i < this.squares.length; i++){
                if(this.squares[i].piece.color === this.currentTurn){
                    if(this.squares[i].piece.possibleMoves(this.squares, this.squares[i], false).length > 0){
                        return "No Winner Yet";
                    }
                }
            }
            return "Stalemate";
        }
        
    }

    kingLocation(){
        for(let i = 0; i < this.squares.length; i++){
            if(this.currentTurn === Game.white){
                if(this.squares[i].piece.symbol === '&#9812'){
                    return i;
                }
            }
            else{
                if(this.squares[i].piece.symbol === '&#9818'){
                    return i;
                }
            }
        }
        return -1;
    }

    kingInCheck(){
        let kingLoc = this.kingLocation();
        if(kingLoc != -1 && this.squares[kingLoc].inCheck(this.squares, this.currentTurn)){
            return true;
        }
        return false;
    }
}

Game.black = 'Black';
Game.white = 'White';