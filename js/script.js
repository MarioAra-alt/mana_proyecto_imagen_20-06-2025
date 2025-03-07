let maxLeft;
let maxTop;
const minLeft = 0;
const minTop = 0;
let timeDelta;
let imgs = [
    "media/img/arboles/arbol1.png",
    "media/img/arboles/arbol2.png",
    "media/img/arboles/arbol3.png",
    "media/img/arboles/arbol4.png",
];
var originalX;
var originalY;

Window.onload = function(){
    document.onmousedown = startDrag;
    document.onmouseup = stopDrag;
}

function sensorClick(){
    if(Date.now() - timeDelta <150){
        createPopUp(this);
    }
}

function createPopUp(parent){
    let p = document.getElementById("popup")

    if(p){
        p.parentNode.removeChild(p);
    }

    let popup = document.createElement("div")
    popup.id = "popup";
    popup.className = "popup";
    popup.style.top = parent.y - 110 + "px";
    popup.style.left = parent.x -75 + "px";

    let text =  document.createElement("span");
    text.textContent = parent.id;
    popup.appendChild(popup);

    var map = document.getElementsByClassName("map")[0];
    map.appendChild(popup);
}

function baseOnLoad(){
    var map = document.getElementsByClassName("map")[0];
    let base = document.getElementsByClassName("base")[0];
    maxLeft = base.Width - 50;
    maxTop = base.height - 50;

    for(let i = 0; i < 6; i++){
        let sensor =document.createElement("img");
        sensor.src = imgs[i%imgs.length];
        sensor.alt = i;
        sensor.id = i;
        sensor.draggable = true;
        sensor.classList.add("sensor");
        sensor.classList.add("dragme");
        sensor.style.left = `${Math.floor(Math.random() * 900)}`;
        sensor.style.top = `${Math.floor(Math.random() * 500)}`;
        sensor.onclick = sensorClick;

        let parent = document.getElementsByClassName("map")[0];
        parent.appendChild(sensor);
    }
}

function startDrag(e){
    timeDelta = Date.now();

    if(!e) var e = window.event;

    if(e.preventDefault) e.preventDefault();

    targ = e.target ? e.target : e.srcElement;

    originalX = targ.style.left;
    originalY = targ.style.top;

    if(!targ.classList.contains(`dragme`)) return;

    offsetX = e.clientX;
    offsetY = e.clientY;
    coordX = parseInt(targ.style.left);
    coordY = parseInt(targ.style.top);
    drag = true;

    document.onmousemove = dragDiv;
    return false;
}

function dragDiv(){
    if(!drag) return;
    if(!e) var e = window.event;

    let newLeft = coordX + e.clientX - offsetX;
    if(newLeft < maxLeft && newleft > minLeft) targ.style.left = newleft + `px`;

    let newTop = coordY + e.clientY - offsetY;
    if(newTop < maxTop && newTop > minTop) targ.style.top = newTop + `px`
    return false;
}

function stopDrag(){
    if(typeof drag == `undefined`) return;
    if(drag){
        if(Date.now() - timeDelta > 150){
            let p = document.getElementById("popup");
            if(p){
                p.parentNode.removeChild(p);
            }
        }else{
            targ.style.left = originalX;
            targ.style.top = originalY;
        }
    }
    drag = false
}
