class King extends Piece{
    constructor(color){
        super(color);
        this.symbol = this.setSymbol();
    }
    setSymbol(){
        return (this.color === 'White') ? '&#9812' : '&#9818';
    }
}