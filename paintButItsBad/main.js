let selectedColorElement

rowCount = 64
let colors = ["Blue", "pink", "yellow", "green", "red", "orange", "lightBlue", "purple", "white", "black"]


const toolBarElement = document.getElementById("toolbar") 
const rowContainerElement = document.getElementById("row-container")

colors.map(color => {
    let colorElement = document.createElement("a");
    colorElement.href = "#"
    colorElement.classList.add("color")
    toolBarElement.appendChild(colorElement);
    colorElement.style.backgroundColor = color;
    colorElement.addEventListener("click", onSelectColor); 
});

for(let i = 0; i < rowCount; i++){
    let divTags = document.createElement("div")
    rowContainerElement.appendChild(divTags)
    divTags.classList.add("row")
    divTags.addEventListener("click", onPaint);
}


function onSelectColor(e){
    e.preventDefault();
    if(selectedColorElement) {
        selectedColorElement.classList.remove('--selected');
    }
    selectedColorElement = e.target;
    selectedColorElement.classList.add("--selected")
}

function onPaint(e){
    e.target.style.backgroundColor = 
        selectedColorElement.style.backgroundColor;
}