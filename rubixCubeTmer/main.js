const midBox = document.getElementById("midBox")
const fiveRecentList = document.getElementById('fiveRecentList')
const currentAverageTime = document.getElementById("currentAverageTime");
const output = document.getElementById("output");
const bestSingleTimeBox = document.getElementById("bestSingleTimeBox");
const bestSingleTime = document.getElementById("bestSingleTime");
const button = document.getElementById("startButton");
const bestAverageTimeBox = document.getElementById("bestAverageTimeBox");
const bestAverageTime = document.getElementById("bestAverageTime");

button.addEventListener('pointerdown', onButtonDown);
button.addEventListener('pointerup', onbuttonup)

// localStorage.removeItem('bestTimes');

output.style.display = "none"
let counting = false;
let timeStop
let timeStart
boxAmount = 5
let times = []
let sumOfAvridge


let bestTimes = JSON.parse(localStorage.getItem('bestTimes'))
console.log(bestTimes)
if (bestTimes == null){
    bestSingleTime.textContent = ''
    bestAverageTime.textContent = ''
}
else{
    bestSingleTime.textContent = bestTimes.single + 's'
    bestAverageTime.textContent = bestTimes.average + 's'
}



function onButtonDown(){
    if (!counting){
        hide()
        
        output.style.display = null
        output.textContent = 'relise to start'
        button.textContent = null
        button.style.backgroundColor = 'white'
    }
    else{
        console.log('stop');
        timeStop = new Date()

        //checks if you have played 5 times
        if (times.length >= boxAmount){
            bestTimes = {
                single: bestTimes.single,
                average: currentAverageTime.textContent
            }
            localStorage.setItem('bestTimes', JSON.stringify(bestTimes))

            console.log('too many')
            times.length = 0;
        }
        
        setToRcentFive(timeCalculate());

        show()
        button.textContent = 'HOLD'
        button.style.backgroundColor = "rgb(9, 255, 0)"
        output.style.display = 'none'
        
    }
}

function onbuttonup(){
    if (!counting){
        console.log('start');
        timeStart = new Date()

        output.textContent = "SOLVE"
        button.textContent = 'press to stop'
        button.style.backgroundColor = 'red'
        counting = true

    }
    else{
        counting = false;
    }
}

function setToRcentFive(time){
    times.push(time)
    sumOfAvridge = 0
    for (let i = 0; i < times.length; i++) {
        sumOfAvridge += parseFloat(times[i]) 
    }
    currentAverageTime.textContent = (sumOfAvridge / times.length).toFixed(3)

    fiveRecentList.innerHTML = ''
    
    //display the numbers in times array
    for (let i = 0; i < boxAmount; i++) {
        var boxes = document.createElement('div');
        fiveRecentList.appendChild(boxes);
        boxes.classList.add('recentBoxs');
        boxes.textContent = times[i]
    }
    bestTimes = JSON.parse(localStorage.getItem('bestTimes'))
    bestSingleTime.textContent = bestTimes.single + 's'
    bestAverageTime.textContent = bestTimes.average + 's'
}


//calculate time function
function timeCalculate(){
    finalTime = (timeStop.getTime() - timeStart.getTime()) / 1000
    checkBestTime(finalTime);
    console.log(finalTime)
    return(finalTime)
}

function checkBestTime(){
    if (bestTimes == null || finalTime < bestTimes.single){
        bestTimes = {
            single: finalTime,
            average: bestTimes ? bestTimes.average : ''
        }
        localStorage.setItem('bestTimes', JSON.stringify(bestTimes))
    }
}

function mobileCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};


//show and hide functions
function hide(){
    fiveRecentList.style.display = "none"
    currentAverageTime.style.display = "none"
    bestAverageTimeBox.style.display = "none"
    bestSingleTimeBox.style.display = "none"
}
function show(){
    fiveRecentList.style.display = null
    currentAverageTime.style.display = null
    bestAverageTimeBox.style.display = null
    bestSingleTimeBox.style.display = null
}  



// window.addEventListener('touchstart', function(e) {
//     button.textContent = e.touches.length
//  }, false);  