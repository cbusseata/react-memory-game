import React from 'react';
import Board from './components/Board';

import cardrear from './assets/images/playing-card-rear.png';

import circle from './assets/images/circle.png';
import diamond from './assets/images/diamond.png';
import octagon from './assets/images/octagon.jpg';
import pentagon from './assets/images/pentagon.jpg';
import rhombus from './assets/images/rhombus.gif';
import square from './assets/images/square.jpg';
import star from './assets/images/star.jpg';
import tangram from './assets/images/tangram.png';
import tesseract from './assets/images/tesseract.jpg';
import triangle from './assets/images/triangle.jpg';

import './App.css';

const cardsData = [
    {
        face: circle,
        rear: cardrear,
        name: 'circle',
    },
    {
        face: diamond,
        rear: cardrear,
        name: 'diamond',
    },
    {
        face: octagon,
        rear: cardrear,
        name: 'octagon',
    },
    {
        face: pentagon,
        rear: cardrear,
        name: 'pentagon',
    },
    {
        face: rhombus,
        rear: cardrear,
        name: 'rhombus',
    },
    {
        face: square,
        rear: cardrear,
        name: 'square',
    },
    {
        face: star,
        rear: cardrear,
        name: 'star',
    },
    {
        face: tangram,
        rear: cardrear,
        name: 'tangram',
    },
    {
        face: tesseract,
        rear: cardrear,
        name: 'tesseract',
    },
    {
        face: triangle,
        rear: cardrear,
        name: 'triangle',
    },
];

const deck = [];
for (let i = 0; i < cardsData.length; i++) {
    // Push each twice
    deck.push(Object.assign({}, cardsData[i]));
    deck.push(Object.assign({}, cardsData[i]));
}

function App() {
    return (
        <div className="App">
            <Board unshuffledDeck={deck} />
        </div>
    );
}

export default App;
