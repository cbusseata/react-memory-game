import React from "react";

function Card(props) {
    return (
        <div 
            className={(props.card.matched ? 'matched' : 'unmatched') + ' card'}
            onClick={props.onClick}
            style={{cursor: !props.isClickable ? 'not-allowed' : ''}}
        >
            <img 
                src={props.card.isFaceUp ? props.card.face : props.card.rear} 
                alt="" 
            />
        </div>
    );
}

export default Card;
