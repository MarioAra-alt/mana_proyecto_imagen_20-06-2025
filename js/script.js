let maxLeft;
let maxTop;
const minLeft = 0;
const minTop = 0;
let timeDelta;
let imgs =[
    "media/img/arboles/arbol1.png",
    "media/img/arboles/arbol2.png",
    "media/img/arboles/arbol3.png",
    "media/img/arboles/arbol4.png",
];
var originalX;
var originalY

window.onload = function(){
    document.onmousedown = startDrag;
    document.onmouseup = stopDrag;
}

function sensorClick(){
    if(Date.now() - timeDelta < 150){
        createPopup(this);
    }
}

function createPopup(parent){
    let p = document.getElementById("popup")
    if(p){
        p.parentNode.removeChild(p);
    }

    let popup = document.createElement("div");
    popup.id = "popup";
    popup.className = "popup";
    popup.style.top = parent.y -110 +"px";
    popup.style.left = parent.x -75 +"px";

    let text = document.createElement("span")
    text.textContent = parent.id;
    popup.appendChild(text)
}