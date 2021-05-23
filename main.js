let englishButton = document.getElementById('english');
let swedishButton = document.getElementById('swedish');

let title = document.getElementById('titleText');
let game = document.getElementById('gameText');
let pokemon = document.getElementById('pokemonText');
let pong = document.getElementById('pongText');
let openCV = document.getElementById('openCV');
let top5List = document.getElementById('top5List');
let qouteDatabase = document.getElementById('qouteDatabase');
let rubixCubeTimer = document.getElementById('RubixCubeTimer');

englishButton.addEventListener('click', onEnglishClick);
swedishButton.addEventListener('click', onswedishClick);

//language
let language = {
    eng: {
        title: 'My projects',
        gameText:'A simple game with two enemies, one bounces around the field randomly and gets a speed increase of 0.1 every time you collect a coin while the other is constantly following you ',
        pokemonText:'Gets information and pictures from an API about the pokemon and displays it ',
        pongText:'He classic pong game where you play against an AI that calculates where the ball will go and returns to the middle when the ball is moving towards you ',
        openCVText:"vidFaceDetection: tracks faces from a video feed. picFaceDetection: finds faces in a picture and cuts it out to a singular picture",
        top5ListText:"Collects the scores from every game and saves them in a database. one can then visit \"scores\" to see the top 5 plays ",
        qouteDatabaseText:"You can add quotes to a database and then when you visit the landing page it will display a random quote from the database",
        rubixCubeTimerText:"Rubixcube timer made for mobile but also works on pc"
    },
    swe: {
        title: 'Mina project',
        gameText: 'Enkelt spel där amn samlar mynt och för varenda mynt man samlar ökar farten på en fiende. Det fins två fiender på planen och ena följer dig medans dena andra bara oker tills den slår i en vägg.',
        pokemonText: 'Hämtar informationen om en pokemon från en API och visar det',
        pongText: 'Classigt pong spel där amn spelar mot datorn som räknar ut exat vart bollen skall fara och går till mitten om bollen är påväg mot spelaren',
        openCVText:"VidFaceDetection: Detecterar följer ett aniskte från en kamera ingång. picFaceDetection: Hittar och clipper ut ansikten frånb en bild",
        top5ListText:"Efter varädna spel skickar påengen till en databas och om man besöker \"scores\" kan man se top 5 besta spel",
        qouteDatabaseText:"Du kan sätta till citat till en databas och när man besäker landings sidan visas ett slumpmässig citat",
        rubixCubeTimerText:"Rubixcube timer för mobil men fungerar också på dator"
    }
}

function onEnglishClick(){
    title.textContent = language.eng.title;
    game.textContent = language.eng.gameText;
    pokemon.textContent = language.eng.pokemonText;
    pong.textContent = language.eng.pongText;
    openCV.textContent = language.eng.openCVText;
    top5List.textContent = language.eng.top5ListText;
    rubixCubeTimer.textContent = language.eng.rubixCubeTimerText;

}
function onswedishClick(){
    title.textContent = language.swe.title;
    game.textContent = language.swe.gameText;
    pokemon.textContent = language.swe.pokemonText;
    pong.textContent = language.swe.pongText
    openCV.textContent = language.swe.openCVText;
    top5List.textContent = language.swe.top5ListText;
    qouteDatabase.textContent = language.swe.top5ListText;
    rubixCubeTimer.textContent = language.swe.rubixCubeTimerText;
}