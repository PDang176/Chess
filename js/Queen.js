class Queen extends Piece{
    constructor(color){
        super(color);
        this.symbol = this.setSymbol();
    }
    setSymbol(){
        return (this.color === 'White') ? '&#9813' : '&#9819';
    }
}