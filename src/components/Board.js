import React, {useState, useEffect} from 'react';
import Card from './Card';

function Board(props) {
    const [deck, setDeck] = useState(props.unshuffledDeck);
    const [matchAttemptFlipped, setMatchAttemptFlipped] = useState([]);
    const [gameWon, setGameWon] = useState(false);

    useEffect(() => shuffleDeck(), []);

    const shuffleDeck = () => {
        const cardsLeft = deck.slice(0);
 
        // Random deck load
        const shuffledDeck = [];
        const limit = cardsLeft.length;
        for (let i = 0; i < limit; i++) {
            let index = Math.floor(Math.random() * cardsLeft.length);
            let card = cardsLeft.splice(index, 1)[0];
            card.matched = false;
            card.isFaceUp = false;

            shuffledDeck.push(card);
        }
    
        setDeck(shuffledDeck);
    }

    const createBoard = () => {
        const boardRows = [];
        const cards = [];
        const limit = deck.length;
        for (let i = 0; i < limit; i++) {
            let cardData = deck[i];

            // Add the Card to the array of cards
            cards.push(renderCardTd(i, cardData));
        
            if (cards.length === 5) {
                // Add a board row with 5 cards and flush the cards array
                boardRows.push(
                    <tr key={i}>
                        {cards.slice(0)}
                    </tr>
                );
                cards.splice(0, cards.length);
            }
        }
    
        return (
            <table>
                <tbody>
                    {boardRows}
                </tbody>
            </table>
        );
    }

    const handleCardClicked = (i) => {
        // Copy the current array of flipped indexes in this match attempt
        const newMatchAttemptFlipped = matchAttemptFlipped.slice();

        // Copy the current deck
        const thedeck = deck.slice(0);

        const card = thedeck[i];
        card.isFaceUp = !card.isFaceUp;
        thedeck[i] = card;

        // Handle the setting of the current flipped cards in this search for a match
        if (card.isFaceUp) {
            newMatchAttemptFlipped.push(i);
        } else {
            newMatchAttemptFlipped.pop(i);
        }

        // Check match
        if (newMatchAttemptFlipped.length >= 2) {
            if (thedeck[newMatchAttemptFlipped[0]].name === thedeck[newMatchAttemptFlipped[1]].name) {
                // Set the match
                thedeck[newMatchAttemptFlipped[0]].matched = true;
                thedeck[newMatchAttemptFlipped[1]].matched = true;

                // Clear the match attempt record
                newMatchAttemptFlipped.splice(0);
            } else {
                // Flip 'em back over, set a timeout on this
                setTimeout(function () {
                    const thedeck = deck.slice(0);
    
                    thedeck[newMatchAttemptFlipped[0]].isFaceUp = false;
                    thedeck[newMatchAttemptFlipped[1]].isFaceUp = false;
        
                    // Clear the match attempt record
                    newMatchAttemptFlipped.splice(0);
    
                    setMatchAttemptFlipped(newMatchAttemptFlipped);
                    setDeck(thedeck);
                }, 1000);
            }
        }

        setMatchAttemptFlipped(newMatchAttemptFlipped);
        setDeck(thedeck);

        if (isGameOver()) {
            setGameWon(true);
        }
    }

    const isGameOver = () => {
        for (let i = 0; i < deck.length; i++) {
            if (!deck[i].isFaceUp) {
                return false;
            }
        }

        return true;
    }

    const renderCardTd = (i, cardData) => {
        const isClickable = !cardData.matched && matchAttemptFlipped.length < 2;

        return (
            <td key={i}>
                <Card 
                    key={i} 
                    card={cardData}
                    onClick={() => {if (isClickable) handleCardClicked(i)}}
                    isClickable={isClickable}
                />
            </td>
        );
    }

    const handleNewGame = () => {
        setMatchAttemptFlipped([]);
        setGameWon(false);
        shuffleDeck();
    }
    
    return (
        <div>
            {createBoard()}
            <button className="new-game" onClick={handleNewGame}>New Game</button>
            <h1 className="winner">{gameWon ? 'Winner!' : ''}</h1>
        </div>
    );
}

export default Board;
