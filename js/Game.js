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
                s++;
            }
        }

        this.squares[28].piece = new Knight('White');

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
    makeMove(i){
        if(this.squares[i].piece.color === this.currentTurn){
            if(this.currentSelected.length > 0){
                for(let j = 0; j < this.currentSelected.length; j++){
                    this.squares[this.currentSelected[j]].isHighlighted = false;
                }
                this.currentSelected.splice(0, this.currentSelected.length)
            }
            this.squares[i].isHighlighted = true;
            this.currentSelected.push(i);
            let availableMoves = this.squares[i].piece.possibleMoves(this.squares, this.squares[i]);
            for(let j = 0; j < availableMoves.length; j++){
                this.squares[availableMoves[j]].isHighlighted = true;
                this.currentSelected.push(availableMoves[j]);
            }
        }
    }
}

Game.black = 'Black';
Game.white = 'White';