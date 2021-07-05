function fetchData() {
    fetch('read.php', {
        method: "POST",
    })
        .then(response => response.text())
        .then(data => {
            planets = JSON.parse(data);
        });
}

function fillWithPlanet() {
    planetName = planets[numPlanet][1].toLowerCase();
    audio = new Audio('music/'+planetName+'.mp3');
    $("#planet").attr("src","photos/"+planetName+".png");
    $("#planetname").html(planets[numPlanet][1]);
    $("#mass").html(planets[numPlanet][2]);
    $("#radius").html(planets[numPlanet][3]);
    $("#gravity").html(planets[numPlanet][4].toFixed(2));
    $("#temperature").html(planets[numPlanet][5]);
    $("#pressure").html(planets[numPlanet][6]);
    $("#period").html(planets[numPlanet][7]);
    $("#axis").html(planets[numPlanet][8]);
    $("#tilt").html(planets[numPlanet][9]);
    $("#speed").html(planets[numPlanet][10]);
    $("#type").html(planets[numPlanet][11]);
    $("#volcanism").html(planets[numPlanet][12]);
    $("#atmosphere").html(planets[numPlanet][13]);
    $("#atmosphere1").html(planets[numPlanet][14]);
    $("#atmosphere2").html(planets[numPlanet][15]);
    $("#atmosphere3").html(planets[numPlanet][16]);
    $("#composition1").html(planets[numPlanet][17]);
    $("#composition2").html(planets[numPlanet][18]);

}
function waitForPlanets(){
    if(typeof planets !== "undefined") {
        fillWithPlanet();
    } else {
        setTimeout(waitForPlanets, 250);
    }
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

function clearTextArea() {
  $("#textArea").contents().filter(function(){ return this.nodeType != 1; }).remove();
}