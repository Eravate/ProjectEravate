// Function to fetch data from the DB

function fetchData() {
    var formData = new FormData();
    formData.append('solar', solar);
    fetch('php/read.php', {
        method: "POST",
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            objects = JSON.parse(data);
        });
}
function fetchDataAdmin() {
  fetch('php/receivemessages.php', {
      method: "POST",
  })
      .then(response => response.text())
      .then(data => {
          adminInfo = JSON.parse(data);
      });
}

// Function to fill all the objects with information uppon load

function fillWithPlanet() {
    var threed;
    /*planetName = objects[numObject][1].toLowerCase();
    audio = new Audio('music/'+planetName+'.mp3');
    $("#object").attr("src","photos/"+planetName+".png");
    $("#planetname").html(objects[numObject][1]);
    $("#mass").html(objects[numObject][2]);
    $("#radius").html(objects[numObject][3]);
    $("#gravity").html(objects[numObject][4].toFixed(2));
    $("#temperature").html(objects[numObject][5]);
    $("#pressure").html(objects[numObject][6]);
    $("#period").html(objects[numObject][7]);
    $("#axis").html(objects[numObject][8]);
    $("#tilt").html(objects[numObject][9]);
    $("#speed").html(objects[numObject][10]);
    $("#type").html(objects[numObject][11]);
    $("#volcanism").html(objects[numObject][12]);
    $("#atmosphere").html(objects[numObject][13]);
    $("#atmosphere1").html(objects[numObject][14]);
    $("#atmosphere2").html(objects[numObject][15]);
    $("#atmosphere3").html(objects[numObject][16]);
    $("#composition1").html(objects[numObject][17]);
    $("#composition2").html(objects[numObject][18]);*/
    $("#solarsystem").html(objects[0][1].toUpperCase());
    if (Array.isArray(objects[numObject][0])) {
      $("#name").html(objects[numObject][numSat][1].toUpperCase());
      $("#txt").html(objects[numObject][numSat][6]);
      $("#source").html('Source: &nbsp; <a href=\''+objects[numObject][0][8]+'\'>'+objects[numObject][numSat][7]+'</a>');
      $("#rottime").html(objects[numObject][numSat][2]+'&nbsp;DAYS');
      $("#revtime").html(objects[numObject][numSat][3]+'&nbsp;DAYS');
      $("#radius").html(objects[numObject][numSat][4]+'&nbsp;KM');
      $("#temp").html(objects[numObject][numSat][5]+'&nbsp;ºC');

      threed = objects[numObject][numSat][15];
      // Switch for loading 3D Planet
      switch (threed) {
        // If the object doesn't have a 3D Texture, load the ? texture
        case 0:
          execute3d("unknown");
          break;
        case 1:
          execute3d(objects[numObject][numSat][1].toLowerCase());
          break;
        default:
          execute3d(threed);
          break;
      }
    } else {
      $("#name").html(objects[numObject][1].toUpperCase());
      $("#txt").html(objects[numObject][6]);
      $("#source").html('Source: &nbsp; <a href=\''+objects[numObject][8]+'\'>'+objects[numObject][7]+'</a>');
      $("#rottime").html(objects[numObject][2]+'&nbsp;DAYS');
      $("#revtime").html(objects[numObject][3]+'&nbsp;DAYS');
      $("#radius").html(objects[numObject][4]+'&nbsp;KM');
      $("#temp").html(objects[numObject][5]+'&nbsp;ºC');

      threed = objects[numObject][15];
      // Switch for loading 3D Planet
      switch (threed) {
        // If the object doesn't have a 3D Texture, load the ? texture
        case 0:
          execute3d("unknown");
          break;
        case 1:
          execute3d(objects[numObject][1].toLowerCase());
          break;
        default:
          execute3d(threed);
          break;
      }
    }
    
    checkForArrows();   
}

function fillWithDataAdmin(typeofInfo) {
  var fillWithLeft;
  var fillWithCenter;
  var fillWithRight;
  switch (typeofInfo) {
    case "home":
      // Left side
      // Fill with Sun info
      if (adminInfo[0].length == 1) {
        fillWithLeft = "<div class='titleInfo'>" + adminInfo[0].length + " STAR</div><div class='textInfo'>Has been added since the creation of this app, the last being " + adminInfo[0][0][1] + ".</div>";
      } else if (adminInfo[0].length == 0) {
        fillWithLeft = "<div class='titleInfo'>" + adminInfo[0].length + " STARS</div><div class='textInfo'>No stars have been added yet!</div>";
      } else {
        fillWithLeft = "<div class='titleInfo'>" + adminInfo[0].length + " STARS</div><div class='textInfo'>Have been added since the creation of this app, the last of them being " + adminInfo[0][adminInfo[0].length-1][1] + ".</div>";
      }
      // Fill with Planet info
      if (adminInfo[1].length == 1) {
        fillWithLeft += "<div class='titleInfo'>" + adminInfo[1].length + " PLANET</div><div class='textInfo'>Has been added since the creation of this app, the last being " + adminInfo[1][0][2] + ".</div>";
      } else if (adminInfo[1].length == 0) {
        fillWithLeft += "<div class='titleInfo'>" + adminInfo[1].length + " PLANETS</div><div class='textInfo'>No planets have been added yet!</div>";
      } else {
        fillWithLeft += "<div class='titleInfo'>" + adminInfo[1].length + " PLANETS</div><div class='textInfo'>Have been added since the creation of this app, the last of them being " + adminInfo[1][adminInfo[1].length-1][2] + ".</div>";
      }
      // Fill with NPO info
      if (adminInfo[2].length == 1) {
        fillWithLeft += "<div class='titleInfo'>" + adminInfo[2].length + " NPO</div><div class='textInfo'>Has been added since the creation of this app, the last being " + adminInfo[2][0][2] + ".</div>";
      } else if (adminInfo[2].length == 0) {
        fillWithLeft += "<div class='titleInfo'>" + adminInfo[2].length + " NPOs</div><div class='textInfo'>No npos have been added yet!</div>";
      } else {
        fillWithLeft += "<div class='titleInfo'>" + adminInfo[2].length + " NPOs</div><div class='textInfo'>Have been added since the creation of this app, the last of them being " + adminInfo[2][adminInfo[2].length-1][2] + ".</div>";
      }
      // Fill with Satellite info
      if (adminInfo[3].length == 1) {
        fillWithLeft += "<div class='titleInfo'>" + adminInfo[3].length + " SATELLITE</div><div class='textInfo'>Has been added since the creation of this app, "+adminInfo[3][0][2]+", with a radius of " + adminInfo[3][0][6] + "km.</div>";
      } else if (adminInfo[3].length == 0) {
        fillWithLeft += "<div class='titleInfo'>" + adminInfo[3].length + " SATELLITES</div><div class='textInfo'>No satellites have been added yet!</div>";
      } else {
        fillWithLeft += "<div class='titleInfo'>" + adminInfo[3].length + " SATELLITES</div><div class='textInfo'>Have been added since the creation of this app, the last of them being " + adminInfo[3][adminInfo[3].length-1][2] + ".</div>";
      }

      // Centre
      
      if (adminInfo[5].length == 1) {
        fillWithCenter = "<div class='titleInfo'>"+ adminInfo[5].length + " MESSAGE</div><div class='textInfo'>Has been received recently.</div><div id='infoMessages'></div>";
      } else if (adminInfo[5].length == 0) {
        fillWithCenter = "<div class='titleInfo'>"+ adminInfo[5].length + " MESSAGES</div><div class='textInfo'>No messages have been received recently.</div>";
      } else {
        fillWithCenter = "<div class='titleInfo'>"+ adminInfo[5].length + " MESSAGES</div><div class='textInfo'>Have messages have been received recently.</div>";
      }

      if (adminInfo[5].length >= 1) {
        fillWithCenter += "<div class='messageRow'>";
        for (var i=0;i<adminInfo[5].length;i++) {
          // IF the message is still open
          if (adminInfo[5][i][5] == 0) {
            fillWithCenter += "<div class='row'><div class='rowTitle'>"+adminInfo[5][i][1];
            // IF the message is tagged / not tagged
            if (adminInfo[5][i][6] == 0) {
              fillWithCenter += "<img class='rowIcon' src='icons/notflagged.png'>";
            } else {
              fillWithCenter += "<img class='rowIcon' src='icons/flagged.png'>";
            }
            // IF the message has not been read / has been read
            if (adminInfo[5][i][4] == 0) {
              fillWithCenter += " <img class='rowIcon' src='icons/notread.png'>";
            } else {
              fillWithCenter += "<img class='rowIcon' src='icons/read.png'>";
            }
            fillWithCenter += "</div><div class='rowText'>"+adminInfo[5][i][2]+"</div><div class='rowFooter'>"+adminInfo[5][i][3]+"</div>";
          }
          fillWithCenter += "</div>";
        }
        fillWithCenter += "</div>";
      }

      // Right

      if (adminInfo[4].length == 1) {
        fillWithRight = "<div class='titleInfo'>"+ adminInfo[4].length + " LOG</div><div class='textInfo'>Only one log is available as of currently.</div><div id='infoLogs'></div>";
      } else if (adminInfo[4].length == 0) {
        fillWithRight = "<div class='titleInfo'>"+ adminInfo[4].length + " LOGS</div><div class='textInfo'>There are no logs as of currently.</div>";
      } else {
        fillWithRight = "<div class='titleInfo'>"+ adminInfo[4].length + " LOGS</div><div class='textInfo'>Are available as of currently.</div>";
      }

      if (adminInfo[4].length >= 1) {
        fillWithRight += "<div class='logRow'>";
        for (var i=0;i<adminInfo[4].length;i++) {
          fillWithRight += "<div class='row'><div class='rowTitle'>"+adminInfo[4][i][1]+"</div><div class='rowText'>"+adminInfo[4][i][2]+"</div><div class='rowFooter'>"+adminInfo[4][i][4]+"</div></div>";
        }
        fillWithRight += "</div>";
      }
      break;
    case "sun":
      fillWithLeft = "<div class='titleInfo'>Select Star</div><div class='textInfo'><select id='editable-select' name='numStar'>";
      for (var i=0;i<adminInfo[0].length;i++) {
        fillWithLeft += "<option value='"+i+"'>"+adminInfo[0][i][1]+"</option>";
      }
      fillWithLeft += "</select><button type='button' id='modifyStar'>Modify Data</button><button type='button' class='delete' id='deleteStar'>Delete Planet</button></div>";
      
      fillWithCenter = "<div class='titleInfo' id='starSubmitTitle'>Add New Star</div><div class='textInfo'>";
      fillWithCenter += "<form action=''>";
      fillWithCenter += "<input type='hidden' id='starExists' name='starExists' value='no'>"
      fillWithCenter += "<label for='starName'>Star Name:</label><input type='text' id='starName' name='starName'><br>";
      fillWithCenter += "<label for='starRotation'>Rotation:</label><input type='text' id='starRotation' name='starRotation'><br>";
      fillWithCenter += "<label for='starRevolution'>Revolution:</label><input type='text' id='starRevolution' name='starRevolution'><br>";
      fillWithCenter += "<label for='starRadius'>Radius:</label><input type='text' id='starRadius' name='starRadius'><br>";
      fillWithCenter += "<label for='starTemperature'>Temperature:</label><input type='text' id='starTemperature' name='starTemperature'><br>";
      fillWithCenter += "<label for='starOverview'>Overview:</label><textarea id='starOverview' name='starOverview'></textarea><br>";
      fillWithCenter += "<label for='starOverviewSource'>Overview Source:</label><input type='text' id='starOverviewSource' name='starOverviewSource'><br>";
      fillWithCenter += "<label for='starOverviewUrl'>Overview URL:</label><input type='text' id='starOverviewUrl' name='starOverviewUrl'><br>";
      fillWithCenter += "<label for='starInternal'>Internal:</label><textarea id='starInternal' name='starInternal'></textarea><br>";
      fillWithCenter += "<label for='starInternalSource'>Internal Source:</label><input type='text' id='starInternalSource' name='starInternalSource'><br>";
      fillWithCenter += "<label for='starInternalUrl'>Internal URL:</label><input type='text' id='starInternalUrl' name='starInternalUrl'><br>";
      fillWithCenter += "<label for='starSurface'>Surface:</label><textarea id='starSurface' name='starSurface'></textarea><br>";
      fillWithCenter += "<label for='starSurfaceSource'>Surface Source:</label><input type='text' id='starSurfaceSource' name='starSurfaceSource'><br>";
      fillWithCenter += "<label for='starSurfaceUrl'>Surface URL:</label><input type='text' id='starSurfaceUrl' name='starSurfaceUrl'><br>";
      fillWithCenter += "<label for='starType'>Star Type:</label><select id='starType' class='selectTra' name='starType'>";
      for (var i=0;i<adminInfo[6].length;i++) {
        fillWithCenter += "<option id='starType"+adminInfo[6][i][0]+"' value='"+adminInfo[6][i][0]+"'>"+adminInfo[6][i][1]+"</option>";
      }
      fillWithCenter += "</select><br>";
      fillWithCenter += "<button type='submit' value='Submit'>Submit</button>&nbsp;&nbsp;<button type='reset' id='resetStar' value='Reset'>Reset</button>";
      fillWithCenter += "</form>";
      fillWithCenter += "</div>";
      
      fillWithRight = "<div class='titleInfo'>Last Added Stars</div><div class='textInfo'>The last added stars are:</div>";
      if (adminInfo[0].length <=5) {
        for (var i=0;i<adminInfo[0].length;i++) {
          fillWithRight += "<div class='row'><div class='rowTitle'>"+adminInfo[0][i][1]+"</div><div class='rowText'>"+adminInfo[0][i][6]+"</div><div class='rowFooter'>"+adminInfo[0][i][7]+"</div></div>";
        }
      } else {
        for (var i=adminInfo[0].length-5;i<adminInfo[0].length;i++) {
          fillWithRight += "<div class='row'><div class='rowTitle'>"+adminInfo[0][i][1]+"</div><div class='rowText'>"+adminInfo[0][i][6]+"</div><div class='rowFooter'>"+adminInfo[0][i][7]+"</div></div>";
        }
      }
      break;
    case "planet":
      fillWithLeft = "<div class='titleInfo'>Select Planet</div><div class='textInfo'><select id='editable-select' class='planetPicker' name='numStar'>";
      for (var i=0;i<adminInfo[0].length;i++) {
        fillWithLeft += "<option value='"+i+"'>"+adminInfo[0][i][1]+"</option>";
      }
      fillWithLeft += "</select>";
      fillWithLeft += "<select id='selectPlanet' name='numPlanet' class='selectTra'><option value='no'>Select A Star</option></select><button type='button' id='modifyPlanet'>Modify Data</button><button type='button' class='delete' id='deletePlanet'>Delete Planet</button></div>"
      
      fillWithCenter = "<div class='titleInfo' id='planetSubmitTitle'>Add New Planet</div><div class='textInfo'>";
      fillWithCenter += "<form action=''>";
      fillWithCenter += "<input type='hidden' id='planetExists' name='planetExists' value='no'>"
      fillWithCenter += "<label for='planetName'>Planet Name:</label><input type='text' id='planetName' name='planetName'><br>";
      fillWithCenter += "<label for='planetPosition'>Position:</label><input type='text' id='planetPosition' name='planetPosition'><br>";
      fillWithCenter += "<label for='planetRotation'>Rotation:</label><input type='text' id='planetRotation' name='planetRotation'><br>";
      fillWithCenter += "<label for='planetRevolution'>Revolution:</label><input type='text' id='planetRevolution' name='planetRevolution'><br>";
      fillWithCenter += "<label for='planetRadius'>Radius:</label><input type='text' id='planetRadius' name='planetRadius'><br>";
      fillWithCenter += "<label for='planetTemperature'>Temperature:</label><input type='text' id='planetTemperature' name='planetTemperature'><br>";
      fillWithCenter += "<label for='planetOverview'>Overview:</label><textarea id='planetOverview' name='planetOverview'></textarea><br>";
      fillWithCenter += "<label for='planetOverviewSource'>Overview Source:</label><input type='text' id='planetOverviewSource' name='planetOverviewSource'><br>";
      fillWithCenter += "<label for='planetOverviewUrl'>Overview URL:</label><input type='text' id='planetOverviewUrl' name='planetOverviewUrl'><br>";
      fillWithCenter += "<label for='planetInternal'>Internal:</label><textarea id='planetInternal' name='planetInternal'></textarea><br>";
      fillWithCenter += "<label for='planetInternalSource'>Internal Source:</label><input type='text' id='planetInternalSource' name='planetInternalSource'><br>";
      fillWithCenter += "<label for='planetInternalUrl'>Internal URL:</label><input type='text' id='planetInternalUrl' name='planetInternalUrl'><br>";
      fillWithCenter += "<label for='planetSurface'>Surface:</label><textarea id='planetSurface' name='planetSurface'></textarea><br>";
      fillWithCenter += "<label for='planetSurfaceSource'>Surface Source:</label><input type='text' id='planetSurfaceSource' name='planetSurfaceSource'><br>";
      fillWithCenter += "<label for='planetSurfaceUrl'>Surface URL:</label><input type='text' id='planetSurfaceUrl' name='planetSurfaceUrl'><br>";
      fillWithCenter += "<button type='submit' value='Submit'>Submit</button>&nbsp;&nbsp;<button type='reset' id='resetPlanet' value='Reset' class='delete'>Reset</button>";
      fillWithCenter += "</form>";

      fillWithRight = "<div class='titleInfo'>Last Added Planets</div><div class='textInfo'>The last added planets are:</div>";
      if (adminInfo[1].length <=5) {
        for (var i=0;i<adminInfo[1].length;i++) {
          fillWithRight += "<div class='row'><div class='rowTitle'>"+adminInfo[1][i][2]+"</div><div class='rowText'>"+adminInfo[1][i][8]+"</div><div class='rowFooter'>"+adminInfo[1][i][9]+"</div></div>";
        }
      } else {
        for (var i=adminInfo[1].length-5;i<adminInfo[1].length;i++) {
          fillWithRight += "<div class='row'><div class='rowTitle'>"+adminInfo[1][i][2]+"</div><div class='rowText'>"+adminInfo[1][i][8]+"</div><div class='rowFooter'>"+adminInfo[1][i][9]+"</div></div>";
        }
      }
      break;
    case "npo":
      fillWithLeft = "<div class='titleInfo'>Select NPO</div><div class='textInfo'><select id='editable-select' class='npoPicker' name='numStar'>";
      for (var i=0;i<adminInfo[0].length;i++) {
        fillWithLeft += "<option value='"+i+"'>"+adminInfo[0][i][1]+"</option>";
      }
      fillWithLeft += "</select>";
      fillWithLeft += "<select id='selectNPO' name='numNPO' class='selectTra'><option value='no'>Select A Star</option></select><button type='button' id='modifyNPO'>Modify Data</button><button type='button' class='delete' id='deleteNPO'>Delete NPO</button></div>"
      
      fillWithCenter = "<div class='titleInfo' id='npoSubmitTitle'>Add New NPO</div><div class='textInfo'>";
      fillWithCenter += "<form action=''>";
      fillWithCenter += "<input type='hidden' id='npoExists' name='npoExists' value='no'>"
      fillWithCenter += "<label for='npoName'>NPO Name:</label><input type='text' id='npoName' name='npoName'><br>";
      fillWithCenter += "<label for='npoPosition'>Position:</label><input type='text' id='npoPosition' name='npoPosition'><br>";
      fillWithCenter += "<label for='npoRotation'>Rotation:</label><input type='text' id='npoRotation' name='npoRotation'><br>";
      fillWithCenter += "<label for='npoRevolution'>Revolution:</label><input type='text' id='npoRevolution' name='npoRevolution'><br>";
      fillWithCenter += "<label for='npoRadius'>Radius:</label><input type='text' id='npoRadius' name='npoRadius'><br>";
      fillWithCenter += "<label for='npoTemperature'>Temperature:</label><input type='text' id='npoTemperature' name='npoTemperature'><br>";
      fillWithCenter += "<label for='npoOverview'>Overview:</label><textarea id='npoOverview' name='npoOverview'></textarea><br>";
      fillWithCenter += "<label for='npoOverviewSource'>Overview Source:</label><input type='text' id='npoOverviewSource' name='npoOverviewSource'><br>";
      fillWithCenter += "<label for='npoOverviewUrl'>Overview URL:</label><input type='text' id='npoOverviewUrl' name='npoOverviewUrl'><br>";
      fillWithCenter += "<label for='npoInternal'>Internal:</label><textarea id='npoInternal' name='npoInternal'></textarea><br>";
      fillWithCenter += "<label for='npoInternalSource'>Internal Source:</label><input type='text' id='npoInternalSource' name='npoInternalSource'><br>";
      fillWithCenter += "<label for='npoInternalUrl'>Internal URL:</label><input type='text' id='npoInternalUrl' name='npoInternalUrl'><br>";
      fillWithCenter += "<label for='npoSurface'>Surface:</label><textarea id='npoSurface' name='npoSurface'></textarea><br>";
      fillWithCenter += "<label for='npoPlanetSurface'>Surface Source:</label><input type='text' id='npoPlanetSurface' name='npoPlanetSurface'><br>";
      fillWithCenter += "<label for='npoSurfaceUrl'>Surface URL:</label><input type='text' id='npoSurfaceUrl' name='npoSurfaceUrl'><br>";
      fillWithCenter += "<button type='submit' value='Submit'>Submit</button>&nbsp;&nbsp;<button type='reset' id='resetNPO' value='Reset' class='delete'>Reset</button>";
      fillWithCenter += "</form>";

      fillWithRight = "<div class='titleInfo'>Last Added NPOs</div><div class='textInfo'>The last added npos are:</div>";
      if (adminInfo[2].length <=5) {
        for (var i=0;i<adminInfo[2].length;i++) {
          fillWithRight += "<div class='row'><div class='rowTitle'>"+adminInfo[2][i][2]+"</div><div class='rowText'>"+adminInfo[2][i][8]+"</div><div class='rowFooter'>"+adminInfo[2][i][9]+"</div></div>";
        }
      } else {
        for (var i=adminInfo[2].length-5;i<adminInfo[2].length;i++) {
          fillWithRight += "<div class='row'><div class='rowTitle'>"+adminInfo[2][i][2]+"</div><div class='rowText'>"+adminInfo[2][i][8]+"</div><div class='rowFooter'>"+adminInfo[2][i][9]+"</div></div>";
        }
      }
      break;
    case "satellite":
      fillWithLeft = "<div class='titleInfo'>Select Satellite</div><div class='textInfo'><select id='editable-select' class='satellitePicker' name='numStar'>";
      for (var i=0;i<adminInfo[0].length;i++) {
        fillWithLeft += "<option value='"+i+"'>"+adminInfo[0][i][1]+"</option>";
      }
      fillWithLeft += "</select>";
      fillWithLeft += "<select id='selectSatellitePlanet' name='numSatellitePlanet' class='selectTra'><option value='no'>Select A Star</option></select><select id='selectSatellite' name='numSatellite' class='selectTra'><option value='no'>Select A Planet</option></select><button type='button' id='modifySatellite'>Modify Data</button><button type='button' class='delete' id='deleteSatellite'>Delete Satellite</button></div>"
      
      fillWithCenter = "<div class='titleInfo' id='satelliteSubmitTitle'>Add New Satellite</div><div class='textInfo'>";
      fillWithCenter += "<form action=''>";
      fillWithCenter += "<input type='hidden' id='satelliteExists' name='satelliteExists' value='no'>"
      fillWithCenter += "<label for='satelliteName'>NPO Name:</label><input type='text' id='satelliteName' name='satelliteName'><br>";
      fillWithCenter += "<label for='satellitePosition'>Position:</label><input type='text' id='satellitePosition' name='satellitePosition'><br>";
      fillWithCenter += "<label for='satelliteRotation'>Rotation:</label><input type='text' id='satelliteRotation' name='satelliteRotation'><br>";
      fillWithCenter += "<label for='satelliteRevolution'>Revolution:</label><input type='text' id='satelliteRevolution' name='satelliteRevolution'><br>";
      fillWithCenter += "<label for='satelliteRadius'>Radius:</label><input type='text' id='satelliteRadius' name='satelliteRadius'><br>";
      fillWithCenter += "<label for='satelliteTemperature'>Temperature:</label><input type='text' id='satelliteTemperature' name='satelliteTemperature'><br>";
      fillWithCenter += "<label for='satelliteOverview'>Overview:</label><textarea id='satelliteOverview' name='satelliteOverview'></textarea><br>";
      fillWithCenter += "<label for='satelliteOverviewSource'>Overview Source:</label><input type='text' id='satelliteOverviewSource' name='satelliteOverviewSource'><br>";
      fillWithCenter += "<label for='satelliteOverviewUrl'>Overview URL:</label><input type='text' id='satelliteOverviewUrl' name='satelliteOverviewUrl'><br>";
      fillWithCenter += "<label for='satelliteInternal'>Internal:</label><textarea id='satelliteInternal' name='satelliteInternal'></textarea><br>";
      fillWithCenter += "<label for='satelliteInternalSource'>Internal Source:</label><input type='text' id='satelliteInternalSource' name='satelliteInternalSource'><br>";
      fillWithCenter += "<label for='satelliteInternalUrl'>Internal URL:</label><input type='text' id='satelliteInternalUrl' name='satelliteInternalUrl'><br>";
      fillWithCenter += "<label for='satelliteSurface'>Surface:</label><textarea id='satelliteSurface' name='satelliteSurface'></textarea><br>";
      fillWithCenter += "<label for='satellitePlanetSurface'>Surface Source:</label><input type='text' id='satellitePlanetSurface' name='satellitePlanetSurface'><br>";
      fillWithCenter += "<label for='satelliteSurfaceUrl'>Surface URL:</label><input type='text' id='satelliteSurfaceUrl' name='satelliteSurfaceUrl'><br>";
      fillWithCenter += "<button type='submit' value='Submit'>Submit</button>&nbsp;&nbsp;<button type='reset' id='resetSatellite' value='Reset' class='delete'>Reset</button>";
      fillWithCenter += "</form>";

      fillWithRight = "<div class='titleInfo'>Last Added Satellites</div><div class='textInfo'>The last added satellites are:</div>";
      if (adminInfo[3].length <=5) {
        for (var i=0;i<adminInfo[3].length;i++) {
          fillWithRight += "<div class='row'><div class='rowTitle'>"+adminInfo[3][i][2]+"</div><div class='rowText'>"+adminInfo[3][i][8]+"</div><div class='rowFooter'>"+adminInfo[3][i][9]+"</div></div>";
        }
      } else {
        for (var i=adminInfo[3].length-5;i<adminInfo[3].length;i++) {
          fillWithRight += "<div class='row'><div class='rowTitle'>"+adminInfo[3][i][2]+"</div><div class='rowText'>"+adminInfo[3][i][8]+"</div><div class='rowFooter'>"+adminInfo[3][i][9]+"</div></div>";
        }
      }
      break;
    case "message":
      fillWithLeft = "<div class='titleInfo'>Select Message</div>";
      for (var i=0;i<adminInfo[5].length;i++) {
        fillWithLeft += "<option value='"+adminInfo[5][i][0]+"'>"+adminInfo[5][i][1]+"</option>";
      }
      fillWithLeft += "</select></div>";
      fillWithCenter = "<div class='titleInfo'>Handle Message</div>";
      fillWithRight = "<div class='titleInfo'>Message Comments</div>";
      break;
    case "user":
      fillWithLeft = "<div class='titleInfo'>Select User</div>";
      for (var i=0;i<adminInfo[0].length;i++) {
        fillWithLeft += "<option value='"+adminInfo[0][i][0]+"'>"+adminInfo[0][i][1]+"</option>";
      }
      fillWithLeft += "</select></div>";
      fillWithCenter = "<div class='titleInfo'>Add New User</div>";
      fillWithRight = "<div class='titleInfo'>User Logs</div>";
      break;
    default:
      break;
  }
  $("#infoleftInner").html(fillWithLeft);
  $('#editable-select').editableSelect();
  $("#infocentreInner").html(fillWithCenter);
  $("#inforightInner").html(fillWithRight);
}

function fillWithAdmin() {
  if (adminInfo[0].length == 1) {
    $("#addtit1").html(adminInfo[0].length + " STAR");
  } else {
    $("#addtit1").html(adminInfo[0].length + " STARS");
  }
  if (adminInfo[1].length == 1) {
    $("#addtit2").html(adminInfo[1].length + " PLANET");
  } else {
    $("#addtit2").html(adminInfo[1].length + " PLANETS");
  }
  if (adminInfo[2].length == 1) {
    $("#addtit3").html(adminInfo[2].length + " NPO");
  } else {
    $("#addtit3").html(adminInfo[2].length + " NPOS");
  }
  if (adminInfo[3].length == 1) {
    $("#addtit4").html(adminInfo[3].length + " SATELLITE");
  } else {
    $("#addtit4").html(adminInfo[3].length + " SATELLITES");
  }
  
}


// Function to wait for objects to load in

function waitForObjects(){
    if(typeof objects !== "undefined") {
        fillWithPlanet();
    } else {
        setTimeout(waitForObjects, 250);
    }
}

function waitForAdmin(){
  if(typeof adminInfo !== "undefined") {
      fillWithAdmin();
      fillWithDataAdmin("home");
  } else {
      setTimeout(waitForAdmin, 250);
  }
}

// Function to allow the dragging of the console across the screen

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

/* Function to clear the console OBSOLETE

function clearTextArea() {
  $("#textArea").contents().filter(function(){ return this.nodeType != 1; }).remove();
}*/

// Function to submit the Log In and check if it's valid

function submitLogin() {
  var type = $('#type_input').val();
  var email = $('#email_input').val();
  var passwd = $('#password_input').val();
  var passwd2;
  if (type == "create") {
    passwd2 = $('#sec_password_input').val();
  }

  if (type == "login" || passwd == passwd2) {
    var formData = new FormData();
    formData.append('type', type);
    formData.append('email', email);
    formData.append('passwd', passwd);
    fetch('php/process.php', {
      method: "POST",
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        result = JSON.parse(data);
        switch(result) {
          // I've set up two different success cases and 2 different error cases for more specific alerts
          // sucl means the client has succesfully logged into his account
          // succ, on the other hand, means the client has succesfully registered his account, and is now allow to log in
          // err1 is the error that we get when a client is trying to register, but has already created an account with that email address
          // err2 is the error we get when the client is trying to log-in, but either the email address or the password are not correct
          case "sucl":
            window.location.href = "index.php";
            break;
          case "suca":
            var formData = new FormData();
            formData.append('action', "Logged In");
            formData.append('objAffected', "None");
            fetch('php/insertintologs.php', {
              method: "POST",
              body: formData
            })
                .then(response => response.text())
                .then(data => {
                    var result = JSON.parse(data);
                    if (result == "success") {
                      window.location.href = "admin.php";
                    } else {
                      console.log(data);
                    }
                });
            break;
          case "succ":
            Swal.fire({
              icon: 'success',
              title: 'The Account Has Been Created Succesfully, You Can Now Log In!',
            })
            changeLoginScope(true);
            break;
          case "err1":
            Swal.fire({
              icon: 'error',
              title: 'An Accout With This Email Already Exists!',
            })
            break;
          case "err2":
            Swal.fire({
              icon: 'error',
              title: 'The Email And The Password Do Not Correspond To Any Account!',
            })
            break;
        }
      });
  } else {
    if (type == "create") {
      // This alert is pretty self-explanatory, it's when the client has typed two different passwords when creating his account
      Swal.fire('Passwords Not Matching!','error');
      Swal.fire({
        icon: 'error',
        title: 'Passwords Don\'t Match!',
      })
    }
  }
  
}

// Function to log-out, pretty self-explanatory

function logout() {
  if (typeof(adminInfo)!="undefined") {
    var formData = new FormData();
    formData.append('action', "Logged Out");
    formData.append('objAffected', "None");
    fetch('php/insertintologs.php', {
      method: "POST",
      body: formData
    })
        .then(response => response.text())
        .then(data => {
            var result = JSON.parse(data);
            if (result == "success") {
              window.location.href = "login.php";
            } else {
              console.log(data);
            }
        });
  }
  $('#logoutForm').submit();
}

// Function to change between Log-in and Register

function changeLoginScope(createAcc) {
  var txtLogin = '<div class="row"><div class="input-field col s12"><input id="type_input" type="hidden" value="login"><input id="email_input" type="email" class="validate" required="" aria-required="true"><label for="email_input">Email</label></div></div><div class="row"><div class="input-field col s12"><input id="password_input" type="password" class="validate" required="" aria-required="true"><label for="password_input">Password</label><div class="forgotPass"><a href="#">Forgot password?</a></div></div></div><div class="row"></div><div class="row"><div class="col s6"><a href="#" onclick="changeLoginScope(false)">Create account</a></div><div class="col s6 right-align"><button class="waves-effect waves-light btn" type="submit" name="login">Login</button></div></div>';
  var txtCreate = '<div class="row"><div class="input-field col s12"><input id="type_input" type="hidden" value="create"><input id="email_input" type="email" class="validate" required="" aria-required="true"><label for="email_input">Email</label></div></div><div class="row"><div class="input-field col s12"><input id="password_input" type="password" class="validate" required="" aria-required="true"><label for="password_input">Password</label></div></div><div class="row"><div class="input-field col s12"><input id="sec_password_input" type="password" class="validate" required="" aria-required="true"><label for="sec_password_input">Repeat Password</label></div></div><div class="row"></div><div class="row"><div class="col s6"><a href="#" onclick="changeLoginScope(true)">Have an account? Log In</a></div><div class="col s6 right-align"><button class="waves-effect waves-light btn" type="submit" name="login">Create</button></div></div>';
  if (!createAcc) {
    $('#formLogin').html(txtCreate);
  } else {
    $('#formLogin').html(txtLogin);
  }
}

// Function to go full-screen with the press of a button

function gofullscreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
  } else {
      if (document.cancelFullScreen) {
          document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
      }
  }
}

// Function used previously to retract the left-content table, unused now

/**
function retractInfoLeft() {
  $('#contentLeft').slideToggle(1000);
}
*/

function reportError() {
  Swal.fire({
    title: "Send a message to our team",
    input: 'textarea',
    inputPlaceholder: 'Type your message here...',
    inputAttributes: {
      'aria-label': 'Type your message here'
    },
    showCancelButton: true
  }).then((result) => {
    // THIS WORKS LMFAO FINESSED THEM DEVS!
    if(result.isConfirmed) {
      var formData = new FormData();
      formData.append('message', result.value);
      fetch('php/sendmessage.php', {
          method: "POST",
          body: formData
      })
          .then(response => response.text())
          .then(data => {
              if(data=="success") {
                Swal.fire('Sent!', 'The message has been sent', 'success');
              } else {
                console.log(data);
                Swal.fire('Error!', 'An unexpected error has appeared!', 'error');
              }
          });
      
    } else {
      Swal.fire('Canceled!', 'The message has not been sent', 'info');
    }
  });
}
