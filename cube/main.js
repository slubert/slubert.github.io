const midBox = document.getElementById("midBox")
const spot1 = document.getElementById("spot1");
const spot2 = document.getElementById("spot2");
const spot3 = document.getElementById("spot3");
const spot4 = document.getElementById("spot4");
const spot5 = document.getElementById("spot5");
const averageTime = document.getElementById("averageTime");
const output = document.getElementById("output");
const bestSingleTimeBox = document.getElementById("bestSingleTimeBox");
const bestSingleTime = document.getElementById("bestSingleTime");
const button = document.getElementById("startButton");
const bestAverageTimeBox = document.getElementById("bestAverageTimeBox");
const bestAverageTime = document.getElementById("bestAverageTime");

button.addEventListener('mousedown', onButtonDown);
button.addEventListener('mouseup', onbuttonup)


output.style.display = "none"
let counting = false;
let timeStop
var timeStart
var placement = 1;


function onButtonDown(){
    if (!counting){
        hideFiveRecentList()
        hideBestTimes()
    
        output.style.display = null
        output.textContent = 'relise to start'
        button.textContent = 'RELICE'
        button.style.backgroundColor = 'black'
    }
    else{
        showFiveRecentList()
        showBestTimes()
        button.textContent = 'HOLD'
        button.style.backgroundColor = "rgb(9, 255, 0)"
        output.style.display = 'none'

        console.log('stop');
        timeStop = new Date()

        timeCalculate();

    }
}

function onbuttonup(){
    if (!counting){
        output.textContent = "SOLVE"
        button.textContent = 'press to stop'
        button.style.backgroundColor = 'red'
        counting = true

        console.log('start');
        timeStart = new Date()
    }
    else{
        counting = false;
    }
}


//calculate time function
function timeCalculate(){
    finalTime = (timeStop.getTime() - timeStart.getTime()) / 1000
    bestSingleTime.textContent = finalTime + 's'
}

//hide and show functions
function hideFiveRecentList(){
    spot1.style.display = "none"
    spot2.style.display = "none"
    spot3.style.display = "none"
    spot4.style.display = "none"
    spot5.style.display = "none"
    averageTime.style.display = "none"
}
function showFiveRecentList(){
    spot1.style.display = null
    spot2.style.display = null
    spot3.style.display = null
    spot4.style.display = null
    spot5.style.display = null
    averageTime.style.display = null
}

function hideBestTimes(){
    bestAverageTimeBox.style.display = "none"
    bestSingleTimeBox.style.display = "none"
}
function showBestTimes(){
    bestAverageTimeBox.style.display = null
    bestSingleTimeBox.style.display = null
}
