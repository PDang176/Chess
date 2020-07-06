class Knight extends Piece{
    constructor(color){
        super(color);
    }
    possibleMoves(x, y){
        var positions = [];
        if(x - 1 > 0 && y - 2 > 0){
            positions.push([x - 1, y - 2]);
        }
        if(x + 1 < 9 && y - 2 > 0){
            positions.push([x + 1, y - 2]);
        }
        if(x - 2 > 0 && y - 1 > 0){
            positions.push([x - 2, y - 1]);
        }
        if(x + 2 < 9 && y - 1 > 0){
            positions.push([x + 2, y - 1]);
        }
        if(x - 1 > 0 && y + 2 < 9){
            positions.push([x - 1, y + 2]);
        }
        if(x + 1 < 9 && y + 2 < 9){
            positions.push([x + 1, y + 2]);
        }
        if(x - 2 > 0 && y + 1 < 9){
            positions.push([x - 2, y + 1]);
        }
        if(x + 2 < 9 && y + 1 < 9){
            positions.push([x + 2, y + 1]);
        }
        return positions;
    }
}