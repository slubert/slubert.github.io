const output = document.getElementById("output");
const cityInput = document.getElementById("cityInput");
const submit = document.getElementById("form");
const background = document.getElementById("background");
const feelsLikeOutput = document.getElementById("feelsLikeOutput")

submit.addEventListener("submit", onSubmit)

function onSubmit(e){
    e.preventDefault();
    let place = cityInput.value;
    
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=c84bdf644399cebe626d9897429823dd&units=metric")
        .then( res => res.json() )
        .then(whenLoaded)
    
    function whenLoaded(data){
        output.textContent = data.main.temp.toFixed(0) + "°C"
        feelsLikeOutput.textContent = "feels like " + data.main.feels_like.toFixed(0) + "°C"

        if(data.weather[0].main === "Clouds"){
            background.style.backgroundImage = "url('pics/clowdy.jpg')"
            output.style.color = "white"
            feelsLikeOutput.style.color = "White"
        }
        else if(data.weather[0].main === "Rain"){
            background.style.backgroundImage = "url('pics/rainny.jpg')"
            output.style.color = "white"
            feelsLikeOutput.style.color = "White"
        }
        else if(data.weather[0].main === "Sun"){
            background.style.backgroundImage = "url('pics/sunny.jpg')"
            output.style.color = "white"
            feelsLikeOutput.style.color = "White"
        }
        else if(data.weather[0].main === "Clear"){
            background.style.backgroundImage = "url('pics/clear.jpg')"
        }

        console.log(data)
        console.log(data.main.temp)
        console.log(data.weather[0].main)
    }
}


// https://openweathermap.org/current#zip