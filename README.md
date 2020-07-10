# Chess
 
Game hosted on https://pdang176.github.io/Chess/

**How to play:**
- Clicking on a piece will select it and provide movement options
- Clicking on highlighted options will move selected piece to the new square

**Pawn:**
- Moves one step forward
- Can move two steps starting from its initial square
  - Moving two steps makes the pawn susceptible to enpassant
- Captures a piece one step diagonally in front of it

**Knight:**
- Moves in an L shape (2 step one direction, 1 step another)

**Rook:**
- Moves in a straight all sides stopping in front of same colored piece, or can capture the first piece in its way

**Bishop:**
- Moves in a diagonal all sides with the same properties as the rook

**Queen:**
- Moves with the same properties and options as the rook and bishop combined

**King:**
- Moves one step on all sides + diagonally
- Has the option to castle if requirements are met

**Check:**
- If the player's king is being attacked by an opponent's piece that player is currently in check

**Checkmate:**
- If a player can simply not move due to their king being attacked with no option to protect against the attack then they are Checkmated

**Special Rules:**
- Castling
  - Requirements
    - If the rook the king wants to castle to has not moved
    - If the king has not moved
  - If the requirements have been met the king can move two steps towards the rook and put the rook directly next to the king on the opposite side
- En Passant
  - Requirements
    - Turn directly after an enemy pawn double stepped
    - Player's pawn able to capture enemy pawn as if it had single stepped instead
  - If the requirements have been met the pawn can move as if the enemy pawn single stepped and capture it
