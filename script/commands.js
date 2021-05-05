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

