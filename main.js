let englishButton = document.getElementById('english');
let swedishButton = document.getElementById('swedish');

let titleText = document.getElementById('titleText');
let gameText = document.getElementById('gameText');
let pokemonText = document.getElementById('pokemonText');
let pongText = document.getElementById('pongText');

englishButton.addEventListener('click', onEnglishClick);
swedishButton.addEventListener('click', onswedishClick);

//language
let language = {
    eng: {
        title: 'My projects',
        gameText:'a simple game with two enemies, one bounces around the field randomly and gets a speed increase of 0.1 every time you collect a coin while the other is constantly following you ',
        pokemonText:'gets information and pictures from an API about the pokemon and displays it ',
        pongText:'he classic pong game where you play against an AI that calculates where the ball will go and returns to the middle when the ball is moving towards you ',
    },
    swe: {
        title: 'Mina project',
        gameText: 'Enkelt spel där amn samlar mynt och för varenda mynt man samlar ökar farten på en fiende. Det fins två fiender på planen och ena följer dig medans dena andra bara oker tills den slår i en vägg.',
        pokemonText: 'Hämtar informationen om en pokemon från en API och visar det',
        pongText: 'Classigt pong spel där amn spelar mot datorn som räknar ut exat vart bollen skall fara och går till mitten om bollen är påväg mot spelaren'
    }
}

function onEnglishClick(){
    titleText.textContent = language.eng.title;
    gameText.textContent = language.eng.gameText;
    pokemonText.textContent = language.eng.pokemonText;
    pongText.textContent = language.eng.pongText;
}
function onswedishClick(){
    titleText.textContent = language.swe.title;
    gameText.textContent = language.swe.gameText;
    pokemonText.textContent = language.swe.pokemonText;
    pongText.textContent = language.swe.pongText
}