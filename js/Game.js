class Game{
    constructor(){
        this.inProgress = true;
        this.winner = null; // 'Black' or 'White'
        this.currentTurn = Game.white;
        this.squares = new Array(64).fill().map(s => new Square());
        this.currentSelected = [];
        this.movesMade = [];
        this.promotion = false;
        this.promotedPiece = -1;
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
            this.squares[i].piece = new Pawn(Game.black);
        }

        //White Pawns
        for(let i = 48; i < 56; i++){
            this.squares[i].piece = new Pawn(Game.white);
        }

        //Black Rooks
        this.squares[0].piece = new Rook(Game.black);
        this.squares[7].piece = new Rook(Game.black);

        //White Rooks
        this.squares[56].piece = new Rook(Game.white);
        this.squares[63].piece = new Rook(Game.white);

        //Black Knights
        this.squares[1].piece = new Knight(Game.black);
        this.squares[6].piece = new Knight(Game.black);
        //White Knights
        this.squares[57].piece = new Knight(Game.white);
        this.squares[62].piece = new Knight(Game.white);

        //Black Bishops
        this.squares[2].piece = new Bishop(Game.black);
        this.squares[5].piece = new Bishop(Game.black);

        //White Bishops
        this.squares[58].piece = new Bishop(Game.white);
        this.squares[61].piece = new Bishop(Game.white);

        //Black Queen
        this.squares[3].piece = new Queen(Game.black);

        //White Queen
        this.squares[59].piece = new Queen(Game.white);

        //Black King
        this.squares[4].piece = new King(Game.black);

        //White King
        this.squares[60].piece = new King(Game.white);
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
        if(this.inProgress && !this.promotion){
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
                let pieceCaptured = false;
                if(this.squares[this.currentSelected[0]].piece.symbol === '&#9817'){ // White pawn
                    if(this.squares[i].y === this.squares[this.currentSelected[0]].y - 2){ //Setting en Passant
                        this.squares[this.currentSelected[0]].piece.enPassant = true;
                    }
                    else if(this.squares[i].y === 1){ //Queen Promotion
                        this.promotion = true;
                        this.promotedPiece = i;
                    }

                }
                else if(this.squares[this.currentSelected[0]].piece.symbol === '&#9823'){ // Black pawn
                    if(this.squares[i].y === this.squares[this.currentSelected[0]].y + 2){ //Setting en Passant
                        this.squares[this.currentSelected[0]].piece.enPassant = true;
                    }
                    else if(this.squares[i].y === 8){ //Queen Promotion
                        this.promotion = true;
                        this.promotedPiece = i;
                    }
                }
                if(this.squares[this.currentSelected[0]].piece.symbol === '&#9817'){ //En Passant White
                    if(this.squares[this.currentSelected[0]].y === 4){
                        if(this.squares[i + 8].piece.symbol === '&#9823'){
                            pieceCaptured = true;
                            this.squares[i + 8].piece = new Piece('');
                        }
                    }
                }
                else if(this.squares[this.currentSelected[0]].piece.symbol === '&#9823'){ //En Passant Black
                    if(this.squares[this.currentSelected[0]].y === 5){
                        if(this.squares[i - 8].piece.symbol === '&#9817'){
                            pieceCaptured = true;
                            this.squares[i - 8].piece = new Piece('');
                        }
                    }
                }
                if(this.squares[this.currentSelected[0]].piece.symbol === '&#9812' 
                || this.squares[this.currentSelected[0]].piece.symbol === '&#9818'
                || this.squares[this.currentSelected[0]].piece.symbol === '&#9814' 
                || this.squares[this.currentSelected[0]].piece.symbol === '&#9820'){ //Castle Rights Revoked
                    if(this.squares[this.currentSelected[0]].piece.canCastle){
                        this.squares[this.currentSelected[0]].piece.canCastle = false;
                    }
                }
                if(this.squares[this.currentSelected[0]].piece.symbol === '&#9812' 
                || this.squares[this.currentSelected[0]].piece.symbol === '&#9818'){ //Castling move rook position
                    if(this.currentSelected[0] === i - 2){
                        this.squares[i - 1].piece = this.squares[i + 1].piece; //Moving rook
                        this.squares[i - 1].piece.canCastle = false;
                        this.squares[i + 1].piece = new Piece('');
                    }
                    else if(this.currentSelected[0] === i + 2){
                        this.squares[i + 1].piece = this.squares[i - 2].piece; //Moving rook
                        this.squares[i + 1].piece.canCastle = false;
                        this.squares[i - 2].piece = new Piece('');
                    }
                }
                if(this.currentTurn === Game.white){ //Updating moves made white
                    if(this.squares[i].piece.symbol !== ''){
                        pieceCaptured = true;
                    }
                    this.movesMade.push(this.moveMade(this.squares[this.currentSelected[0]], this.squares[i], pieceCaptured));
                }
                else{ //Updating moves made black
                    if(this.squares[i].piece.symbol !== ''){
                        pieceCaptured = true;
                    }
                    this.movesMade[this.movesMade.length - 1] += ' ' + this.moveMade(this.squares[this.currentSelected[0]], this.squares[i], false);
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

    pawnPromotion(newPiece){
        if(this.currentTurn === Game.white){
            if(newPiece === 'Queen'){
                this.squares[this.promotedPiece].piece = new Queen(Game.black);
            }
            else if(newPiece === 'Knight'){
                this.squares[this.promotedPiece].piece = new Knight(Game.black);
            }
            else if(newPiece === 'Rook'){
                this.squares[this.promotedPiece].piece = new Rook(Game.black);
            }
            else if(newPiece === 'Bishop'){
                this.squares[this.promotedPiece].piece = new Bishop(Game.black);
            }
        }
        else{
            if(newPiece === 'Queen'){
                this.squares[this.promotedPiece].piece = new Queen(Game.white);
            }
            else if(newPiece === 'Knight'){
                this.squares[this.promotedPiece].piece = new Knight(Game.white);
            }
            else if(newPiece === 'Rook'){
                this.squares[this.promotedPiece].piece = new Rook(Game.white);
            }
            else if(newPiece === 'Bishop'){
                this.squares[this.promotedPiece].piece = new Bishop(Game.white);
            }
        }

        this.promotion = false;
        this.promotedPiece = -1;
    }

    moveMade(start, end, pieceCaptured){
        let movement = ''; //Pawn is default

        if(start.piece.symbol === '&#9816' || start.piece.symbol === '&#9822'){ //Knight
            movement += 'N';
        }
        else if(start.piece.symbol === '&#9814' || start.piece.symbol === '&#9820'){ //Rook
            movement += 'R';
        }
        else if(start.piece.symbol === '&#9815' || start.piece.symbol === '&#9821'){ //Bishop
            movement += 'B';
        }  
        else if(start.piece.symbol === '&#9813' || start.piece.symbol === '&#9819'){ //Queen
            movement += 'Q';
        }
        else if(start.piece.symbol === '&#9812' || start.piece.symbol === '&#9818'){ //King
            movement += 'K';
        }

        if(pieceCaptured){
            if(start.piece.symbol === '&#9817' || start.piece.symbol === '&#9823'){ //Pawn
                movement += String.fromCharCode('a'.charCodeAt(0) + start.x - 1);
            }
            movement += 'x'
        }

        movement += String.fromCharCode('a'.charCodeAt(0) + end.x - 1) + Math.abs(end.y - 9);

        return movement;
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