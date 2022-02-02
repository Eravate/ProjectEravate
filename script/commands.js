// Function to fetch data from the DB

// Fetch data for standard app

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

// Fetch data for admin app

function fetchDataAdmin() {
  fetch('php/readAdmin.php', {
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

    // I used these variables before, obsolete by now, but felt like leaving them idk

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

// Function to fill admin with data 

function fillWithDataAdmin(typeofInfo) {
  // Each fill represents a div and its position 
  var fillWithLeft;
  var fillWithCenter;
  var fillWithRight;
  switch (typeofInfo) {
    // IF the user goes to HOME page
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

      // Centre (or Center if american)
      
      if (adminInfo[5].length == 1) {
        fillWithCenter = "<div class='titleInfo'>"+ adminInfo[5].length + " MESSAGE</div><div class='textInfo'>Has been received recently.</div><div id='infoMessages'></div>";
      } else if (adminInfo[5].length == 0) {
        fillWithCenter = "<div class='titleInfo'>"+ adminInfo[5].length + " MESSAGES</div><div class='textInfo'>No messages have been received recently.</div>";
      } else {
        fillWithCenter = "<div class='titleInfo'>"+ adminInfo[5].length + " MESSAGES</div><div class='textInfo'>Have messages have been received recently.</div>";
      }

      // This one's for Messages, fills the centre column

      if (adminInfo[5].length >= 1) {
        fillWithCenter += "<div class='messageRow'>";
        for (var i=0;i<adminInfo[5].length;i++) {
          // IF the message is still open
          if (adminInfo[5][i][5] == 0) {
            fillWithCenter += "<div class='row messageMain' value='"+i+"'><div class='rowTitle'>"+adminInfo[5][i][1];
            // IF the message is tagged / not tagged
            if (adminInfo[5][i][6] == 0) {
              fillWithCenter += "<img class='rowIcon' src='icons/notflagged.png'>";
            } else {
              fillWithCenter += "<img class='rowIcon' src='icons/flagged.png'>";
            }
            // IF the message has not been read / has been read
            if (adminInfo[5][i][4] == 0) {
              fillWithCenter += "<img class='rowIcon' src='icons/notread.png'>";
            } else {
              fillWithCenter += "<img class='rowIcon' src='icons/read.png'>";
            }
            fillWithCenter += "</div><div class='rowText'>"+adminInfo[5][i][2]+"</div><div class='rowFooter'>"+adminInfo[5][i][3]+"</div></div>";
          }
        }
        fillWithCenter += "</div>";
      }

      // This one's for Logs, fills the right column
      var today = new Date();

      if (adminInfo[4].length == 1) {
        fillWithRight = "<div class='titleInfo'>"+ adminInfo[4].length + " LOG</div><div class='textInfo'>Only one log is available from the last 24h.</div><div id='infoLogs'></div>";
      } else if (adminInfo[4].length == 0) {
        fillWithRight = "<div class='titleInfo'>"+ adminInfo[4].length + " LOGS</div><div class='textInfo'>There are no logs as of currently.</div>";
      } else {
        var count = 0;
        for (var i=0;i<adminInfo[4].length;i++) {
          var logTime = new Date(adminInfo[4][i][4].replace(' ','T'));
          if (Math.abs(today - logTime) <= 60 * 60 * 24 * 1000) {
            count++;
          }
        }
        fillWithRight = "<div class='titleInfo'>"+ count + " LOGS</div><div class='textInfo'>Are available from the last 24h.</div>";
      }

      if (adminInfo[4].length >= 1) {
        fillWithRight += "<div class='logRow'>";
        for (var i=0;i<adminInfo[4].length;i++) {
          var logTime = new Date(adminInfo[4][i][4].replace(' ','T'));
          if (Math.abs(today - logTime) <= 60 * 60 * 24 * 1000) {
            fillWithRight += "<div class='row'><div class='rowTitle'>"+adminInfo[4][i][1]+"</div><div class='rowText'>"+adminInfo[4][i][2]+"</div><div class='rowFooter'>"+adminInfo[4][i][4]+"</div></div>";
          }
        }
        fillWithRight += "</div>";
      }
      break;
    // IF user goes to SUN page
    case "sun":

      // We fill the left side with a stellar choice (no pun intended)

      fillWithLeft = "<div class='titleInfo'>Select Star</div><div class='textInfo'>Select a Star to modify or delete it.</div><div class='textInfo'><div id='selectOutside'><select id='starPicker' name='numStar'>";
      for (var i=0;i<adminInfo[0].length;i++) {
        fillWithLeft += "<option value='"+i+"'>"+adminInfo[0][i][1]+"</option>";
      }
      fillWithLeft += "</select></div><button type='button' id='modifyStar' class='buttonAdmin'>Modify Data</button><button type='button' class='delete' id='deleteStar'>Delete Planet</button></div>";

      // In the centre we have the main data point and form, which on submit does a function instead of redirect

      fillWithCenter = "<div class='titleInfo' id='starSubmitTitle'>Add New Star</div><div class='textInfo' id='starSubmitInfo'>Add a new star by filing the form down below.</div><div class='textInfo objectInfo'>";
      fillWithCenter += "<form onsubmit='event.preventDefault(); submitStars();'>";
      fillWithCenter += "<input type='hidden' id='starExists' name='starExists' value='no'>"
      fillWithCenter += "<label for='starName'>Star Name:</label><input type='text' id='starName' name='starName' required><br>";
      fillWithCenter += "<label for='starRotation'>Rotation:</label><input type='text' id='starRotation' name='starRotation' required><br>";
      fillWithCenter += "<label for='starRevolution'>Revolution:</label><input type='text' id='starRevolution' name='starRevolution' required><br>";
      fillWithCenter += "<label for='starRadius'>Radius:</label><input type='text' id='starRadius' name='starRadius' required><br>";
      fillWithCenter += "<label for='starTemperature'>Temperature:</label><input type='text' id='starTemperature' name='starTemperature' required><br>";
      fillWithCenter += "<label for='starOverview'>Overview:</label><textarea id='starOverview' name='starOverview' required></textarea><br>";
      fillWithCenter += "<label for='starOverviewSource'>Overview Source:</label><input type='text' id='starOverviewSource' name='starOverviewSource' required><br>";
      fillWithCenter += "<label for='starOverviewUrl'>Overview URL:</label><input type='text' id='starOverviewUrl' name='starOverviewUrl' required><br>";
      fillWithCenter += "<label for='starInternal'>Internal:</label><textarea id='starInternal' name='starInternal' required></textarea><br>";
      fillWithCenter += "<label for='starInternalSource'>Internal Source:</label><input type='text' id='starInternalSource' name='starInternalSource' required><br>";
      fillWithCenter += "<label for='starInternalUrl'>Internal URL:</label><input type='text' id='starInternalUrl' name='starInternalUrl' required><br>";
      fillWithCenter += "<label for='starSurface'>Surface:</label><textarea id='starSurface' name='starSurface' required></textarea><br>";
      fillWithCenter += "<label for='starSurfaceSource'>Surface Source:</label><input type='text' id='starSurfaceSource' name='starSurfaceSource' required><br>";
      fillWithCenter += "<label for='starSurfaceUrl'>Surface URL:</label><input type='text' id='starSurfaceUrl' name='starSurfaceUrl' required><br>";
      fillWithCenter += "<label for='starType'>Star Type:</label><select id='starType' class='selectTra' name='starType'>";
      for (var i=0;i<adminInfo[6].length;i++) {
        fillWithCenter += "<option id='starType"+adminInfo[6][i][0]+"' value='"+adminInfo[6][i][0]+"'>"+adminInfo[6][i][1]+"</option>";
      }
      fillWithCenter += "</select><br>";
      fillWithCenter += "<button type='submit' value='Submit' class='buttonAdmin'>Submit</button>&nbsp;&nbsp;<button type='button' id='resetStar' value='Reset' class='delete'>Reset</button>";
      fillWithCenter += "</form>";
      fillWithCenter += "</div>";
      
      // The right side is filled with the last added planets, the if is necessary in case there's more than 5 stars.

      fillWithRight = "<div class='titleInfo'>Last Added Stars</div><div class='textInfo'>The last added stars are:</div><div class='textInfo objectLast'>";
      if (adminInfo[0].length <=5) {
        for (var i=0;i<adminInfo[0].length;i++) {
          fillWithRight += "<div class='row'><div class='rowTitle'>"+adminInfo[0][i][1]+"</div><div class='rowText'>"+adminInfo[0][i][6]+"</div><div class='rowFooter'>"+adminInfo[0][i][7]+"</div></div>";
        }
      } else {
        for (var i=adminInfo[0].length-5;i<adminInfo[0].length;i++) {
          fillWithRight += "<div class='row'><div class='rowTitle'>"+adminInfo[0][i][1]+"</div><div class='rowText'>"+adminInfo[0][i][6]+"</div><div class='rowFooter'>"+adminInfo[0][i][7]+"</div></div>";
        }
      }
      fillWithRight += "</div>"
      break;
    // IF user goes to PLANET page
    case "planet":

      // We fill the left side with a planetary choice

      fillWithLeft = "<div class='titleInfo'>Select Planet</div><div class='textInfo'>Select a Planet to modify or delete it.</div><div class='textInfo'><div id='selectOutside'><select id='starPickerPlanet' name='numStar'>";
      for (var i=0;i<adminInfo[0].length;i++) {
        fillWithLeft += "<option value='"+i+"'>"+adminInfo[0][i][1]+"</option>";
      }
      fillWithLeft += "</select></div>";
      fillWithLeft += "<select id='selectPlanet' name='numPlanet' class='selectTra'><option value='no'>Select A Star</option></select><button type='button' id='modifyPlanet' class='buttonAdmin'>Modify Data</button><button type='button' class='delete' id='deletePlanet'>Delete Planet</button></div>"
      
      // In the centre we have the main data point and form, which on submit does a function instead of redirect

      fillWithCenter = "<div class='titleInfo' id='planetSubmitTitle'>Add New Planet</div><div class='textInfo' id='planetSubmitInfo'>Add a new planet by filing the form down below.</div><div class='textInfo objectInfo'>";
      fillWithCenter += "<form onsubmit='event.preventDefault(); submitPlanets();'>";
      fillWithCenter += "<input type='hidden' id='planetExists' name='planetExists' value='no'>"
      fillWithCenter += "<label for='planetName'>Planet Name:</label><input type='text' id='planetName' name='planetName' required><br>";
      fillWithCenter += "<label for='starPickerPlanetInner'>Star Name:</label><div id='selectInside'><select id='starPickerPlanetInner' name='numStarInner'>";
      for (var i=0;i<adminInfo[0].length;i++) {
        fillWithCenter += "<option value='"+i+"'>"+adminInfo[0][i][1]+"</option>";
      }
      fillWithCenter += "</select></div>";
      fillWithCenter += "<label for='planetPosition'>Position:</label><input type='text' id='planetPosition' name='planetPosition' required><br>";
      fillWithCenter += "<label for='planetRotation'>Rotation:</label><input type='text' id='planetRotation' name='planetRotation' required><br>";
      fillWithCenter += "<label for='planetRevolution'>Revolution:</label><input type='text' id='planetRevolution' name='planetRevolution' required><br>";
      fillWithCenter += "<label for='planetRadius'>Radius:</label><input type='text' id='planetRadius' name='planetRadius' required><br>";
      fillWithCenter += "<label for='planetTemperature'>Temperature:</label><input type='text' id='planetTemperature' name='planetTemperature' required><br>";
      fillWithCenter += "<label for='planetOverview'>Overview:</label><textarea id='planetOverview' name='planetOverview' required></textarea><br>";
      fillWithCenter += "<label for='planetOverviewSource'>Overview Source:</label><input type='text' id='planetOverviewSource' name='planetOverviewSource' required><br>";
      fillWithCenter += "<label for='planetOverviewUrl'>Overview URL:</label><input type='text' id='planetOverviewUrl' name='planetOverviewUrl' required><br>";
      fillWithCenter += "<label for='planetInternal'>Internal:</label><textarea id='planetInternal' name='planetInternal' required></textarea><br>";
      fillWithCenter += "<label for='planetInternalSource'>Internal Source:</label><input type='text' id='planetInternalSource' name='planetInternalSource' required><br>";
      fillWithCenter += "<label for='planetInternalUrl'>Internal URL:</label><input type='text' id='planetInternalUrl' name='planetInternalUrl' required><br>";
      fillWithCenter += "<label for='planetSurface'>Surface:</label><textarea id='planetSurface' name='planetSurface' required></textarea><br>";
      fillWithCenter += "<label for='planetSurfaceSource'>Surface Source:</label><input type='text' id='planetSurfaceSource' name='planetSurfaceSource' required><br>";
      fillWithCenter += "<label for='planetSurfaceUrl'>Surface URL:</label><input type='text' id='planetSurfaceUrl' name='planetSurfaceUrl' required><br>";
      fillWithCenter += "<button type='submit' value='Submit' class='buttonAdmin'>Submit</button>&nbsp;&nbsp;<button type='button' id='resetPlanet' value='Reset' class='delete'>Reset</button>";
      fillWithCenter += "</form>";

      // The right side is filled with the last added planets, the if is necessary in case there's more than 5 planets.

      fillWithRight = "<div class='titleInfo'>Last Added Planets</div><div class='textInfo'>The last added planets are:</div><div class='textInfo objectLast'>";
      if (adminInfo[1].length <=5) {
        for (var i=0;i<adminInfo[1].length;i++) {
          fillWithRight += "<div class='row'><div class='rowTitle'>"+adminInfo[1][i][2]+"</div><div class='rowText'>"+adminInfo[1][i][8]+"</div><div class='rowFooter'>"+adminInfo[1][i][9]+"</div></div>";
        }
      } else {
        for (var i=adminInfo[1].length-5;i<adminInfo[1].length;i++) {
          fillWithRight += "<div class='row'><div class='rowTitle'>"+adminInfo[1][i][2]+"</div><div class='rowText'>"+adminInfo[1][i][8]+"</div><div class='rowFooter'>"+adminInfo[1][i][9]+"</div></div>";
        }
      }
      fillWithRight += "</div>";
      break;
    // IF user goes to NPO page
    case "npo":

      // We fill the left side with a NPO choice

      fillWithLeft = "<div class='titleInfo'>Select NPO</div><div class='textInfo' >Select a NPO to modify or delete it.</div><div class='textInfo'><div id='selectOutside'><select id='starPickerNPO' name='numStar'>";
      for (var i=0;i<adminInfo[0].length;i++) {
        fillWithLeft += "<option value='"+i+"'>"+adminInfo[0][i][1]+"</option>";
      }
      fillWithLeft += "</select></div>";
      fillWithLeft += "<select id='selectNPO' name='numNPO' class='selectTra'><option value='no'>Select A Star</option></select><button type='button' id='modifyNPO' class='buttonAdmin'>Modify Data</button><button type='button' class='delete' id='deleteNPO'>Delete NPO</button></div>"
      
      // In the centre we have the main data point and form, which on submit does a function instead of redirect

      fillWithCenter = "<div class='titleInfo' id='npoSubmitTitle'>Add New NPO</div><div class='textInfo' id='npoSubmitInfo'>Add a new NPO by filing the form down below.</div><div class='textInfo objectInfo'>";
      fillWithCenter += "<form onsubmit='event.preventDefault(); submitNPOs();'>";
      fillWithCenter += "<input type='hidden' id='npoExists' name='npoExists' value='no'>"
      fillWithCenter += "<label for='npoName'>NPO Name:</label><input type='text' id='npoName' name='npoName' required><br>";
      fillWithCenter += "<label for='starPickerNPOInner'>Star Name:</label><div id='selectInside'><select id='starPickerNPOInner' name='numStarInner'>";
      for (var i=0;i<adminInfo[0].length;i++) {
        fillWithCenter += "<option value='"+i+"'>"+adminInfo[0][i][1]+"</option>";
      }
      fillWithCenter += "</select></div>";
      fillWithCenter += "<label for='npoRotation'>Rotation:</label><input type='text' id='npoRotation' name='npoRotation' required><br>";
      fillWithCenter += "<label for='npoRevolution'>Revolution:</label><input type='text' id='npoRevolution' name='npoRevolution' required><br>";
      fillWithCenter += "<label for='npoRadius'>Radius:</label><input type='text' id='npoRadius' name='npoRadius' required><br>";
      fillWithCenter += "<label for='npoTemperature'>Temperature:</label><input type='text' id='npoTemperature' name='npoTemperature' required><br>";
      fillWithCenter += "<label for='npoOverview'>Overview:</label><textarea id='npoOverview' name='npoOverview' required></textarea><br>";
      fillWithCenter += "<label for='npoOverviewSource'>Overview Source:</label><input type='text' id='npoOverviewSource' name='npoOverviewSource' required><br>";
      fillWithCenter += "<label for='npoOverviewUrl'>Overview URL:</label><input type='text' id='npoOverviewUrl' name='npoOverviewUrl' required><br>";
      fillWithCenter += "<label for='npoInternal'>Internal:</label><textarea id='npoInternal' name='npoInternal' required></textarea><br>";
      fillWithCenter += "<label for='npoInternalSource'>Internal Source:</label><input type='text' id='npoInternalSource' name='npoInternalSource' required><br>";
      fillWithCenter += "<label for='npoInternalUrl'>Internal URL:</label><input type='text' id='npoInternalUrl' name='npoInternalUrl' required><br>";
      fillWithCenter += "<label for='npoSurface'>Surface:</label><textarea id='npoSurface' name='npoSurface' required></textarea><br>";
      fillWithCenter += "<label for='npoPlanetSurface'>Surface Source:</label><input type='text' id='npoPlanetSurface' name='npoPlanetSurface' required><br>";
      fillWithCenter += "<label for='npoSurfaceUrl'>Surface URL:</label><input type='text' id='npoSurfaceUrl' name='npoSurfaceUrl' required ><br>";
      fillWithCenter += "<button type='submit' value='Submit' class='buttonAdmin'>Submit</button>&nbsp;&nbsp;<button type='button' id='resetNPO' value='Reset' class='delete'>Reset</button>";
      fillWithCenter += "</form>";

      // The right side is filled with the last added npos, the if is necessary in case there's more than 5 npos.
      
      fillWithRight = "<div class='titleInfo'>Last Added NPOs</div><div class='textInfo'>The last added npos are:</div><div class='textInfo objectLast'>";
      if (adminInfo[2].length <=5) {
        for (var i=0;i<adminInfo[2].length;i++) {
          fillWithRight += "<div class='row'><div class='rowTitle'>"+adminInfo[2][i][2]+"</div><div class='rowText'>"+adminInfo[2][i][8]+"</div><div class='rowFooter'>"+adminInfo[2][i][9]+"</div></div>";
        }
      } else {
        for (var i=adminInfo[2].length-5;i<adminInfo[2].length;i++) {
          fillWithRight += "<div class='row'><div class='rowTitle'>"+adminInfo[2][i][2]+"</div><div class='rowText'>"+adminInfo[2][i][8]+"</div><div class='rowFooter'>"+adminInfo[2][i][9]+"</div></div>";
        }
      }
      fillWithRight += "</div>";
      break;
    // IF user goes to SATELLITE page
    case "satellite":

      // We fill the left side with a Satellite choice

      fillWithLeft = "<div class='titleInfo'>Select Satellite</div><div class='textInfo'>Select a Satellite to modify or delete it.</div><div class='textInfo'><div id='selectOutside'><select id='starPickerSatellite' name='numStar'>";
      for (var i=0;i<adminInfo[0].length;i++) {
        fillWithLeft += "<option value='"+i+"'>"+adminInfo[0][i][1]+"</option>";
      }
      fillWithLeft += "</select></div>";
      fillWithLeft += "<select id='selectSatellitePlanet' name='numSatellitePlanet' class='selectTra'><option value='no'>Select A Star</option></select><select id='selectSatellite' name='numSatellite' class='selectTra'><option value='no'>Select A Planet</option></select><button type='button' id='modifySatellite' class='buttonAdmin'>Modify Data</button><button type='button' class='delete' id='deleteSatellite'>Delete Satellite</button></div>"
      
      // In the centre we have the main data point and form, which on submit does a function instead of redirect

      fillWithCenter = "<div class='titleInfo' id='satelliteSubmitTitle'>Add New Satellite</div><div class='textInfo' id='satelliteSubmitInfo'>Add a new satellite by filing the form down below</div><div class='textInfo objectInfo'>";
      fillWithCenter += "<form onsubmit='event.preventDefault(); submitSatellites();'>";
      fillWithCenter += "<input type='hidden' id='satelliteExists' name='satelliteExists' value='no'>"
      fillWithCenter += "<label for='satelliteName'>NPO Name:</label><input type='text' id='satelliteName' name='satelliteName' required><br>";
      fillWithCenter += "<label for='starPickerSatelliteInner'>Star Name:</label><div id='selectInside'><select id='starPickerSatelliteInner' name='numStarInner'>";
      for (var i=0;i<adminInfo[0].length;i++) {
        fillWithCenter += "<option value='"+i+"'>"+adminInfo[0][i][1]+"</option>";
      }
      fillWithCenter += "</select></div>";
      fillWithCenter += "<label for='selectSatellitePlanetInner'>Planet:</label><select id='selectSatellitePlanetInner' name='selectSatellitePlanetInner' class='selectTra'><option value='no'>Select A Star</option></select>";
      fillWithCenter += "<label for='satellitePosition'>Position:</label><input type='text' id='satellitePosition' name='satellitePosition' required><br>";
      fillWithCenter += "<label for='satelliteRotation'>Rotation:</label><input type='text' id='satelliteRotation' name='satelliteRotation' required><br>";
      fillWithCenter += "<label for='satelliteRevolution'>Revolution:</label><input type='text' id='satelliteRevolution' name='satelliteRevolution' required><br>";
      fillWithCenter += "<label for='satelliteRadius'>Radius:</label><input type='text' id='satelliteRadius' name='satelliteRadius' required><br>";
      fillWithCenter += "<label for='satelliteTemperature'>Temperature:</label><input type='text' id='satelliteTemperature' name='satelliteTemperature' required><br>";
      fillWithCenter += "<label for='satelliteOverview'>Overview:</label><textarea id='satelliteOverview' name='satelliteOverview' required></textarea><br>";
      fillWithCenter += "<label for='satelliteOverviewSource'>Overview Source:</label><input type='text' id='satelliteOverviewSource' name='satelliteOverviewSource' required><br>";
      fillWithCenter += "<label for='satelliteOverviewUrl'>Overview URL:</label><input type='text' id='satelliteOverviewUrl' name='satelliteOverviewUrl' required><br>";
      fillWithCenter += "<label for='satelliteInternal'>Internal:</label><textarea id='satelliteInternal' name='satelliteInternal' required></textarea><br>";
      fillWithCenter += "<label for='satelliteInternalSource'>Internal Source:</label><input type='text' id='satelliteInternalSource' name='satelliteInternalSource' required><br>";
      fillWithCenter += "<label for='satelliteInternalUrl'>Internal URL:</label><input type='text' id='satelliteInternalUrl' name='satelliteInternalUrl' required><br>";
      fillWithCenter += "<label for='satelliteSurface'>Surface:</label><textarea id='satelliteSurface' name='satelliteSurface' required></textarea><br>";
      fillWithCenter += "<label for='satelliteSurfaceSource'>Surface Source:</label><input type='text' id='satelliteSurfaceSource' name='satelliteSurfaceSource' required><br>";
      fillWithCenter += "<label for='satelliteSurfaceUrl'>Surface URL:</label><input type='text' id='satelliteSurfaceUrl' name='satelliteSurfaceUrl' required><br>";
      fillWithCenter += "<button type='submit' value='Submit' class='buttonAdmin'>Submit</button>&nbsp;&nbsp;<button type='button' id='resetSatellite' value='Reset' class='delete'>Reset</button>";
      fillWithCenter += "</form>";

      // The right side is filled with the last added satellites, the if is necessary in case there's more than 5 satellites.

      fillWithRight = "<div class='titleInfo'>Last Added Satellites</div><div class='textInfo'>The last added satellites are:</div><div class='textInfo objectLast'>";
      if (adminInfo[3].length <=5) {
        for (var i=0;i<adminInfo[3].length;i++) {
          fillWithRight += "<div class='row'><div class='rowTitle'>"+adminInfo[3][i][2]+"</div><div class='rowText'>"+adminInfo[3][i][8]+"</div><div class='rowFooter'>"+adminInfo[3][i][9]+"</div></div>";
        }
      } else {
        for (var i=adminInfo[3].length-5;i<adminInfo[3].length;i++) {
          fillWithRight += "<div class='row'><div class='rowTitle'>"+adminInfo[3][i][2]+"</div><div class='rowText'>"+adminInfo[3][i][8]+"</div><div class='rowFooter'>"+adminInfo[3][i][9]+"</div></div>";
        }
      }
      fillWithRight += "</div>";
      break;
    // IF user goes to MESSAGE page
    case "message":
      fillWithLeft = "<div class='titleInfo'>Select Message</div><div class='textInfo'>Use the buttons to filter through the messages.</div><div class='textInfo'><button type='button' id='showHidden' class='buttonMessages'>Hidden</button><button type='button' id='showUnseen' class='buttonMessagesSecondary'>Unseen</button><button type='button' id='showFlagged' class='buttonMessagesSecondary'>Flagged</button></div><div id='messageRow' class='textInfo objectInfo'>";
      
      for (var i=0;i<adminInfo[5].length;i++) {
        // IF the message is still open
        if (adminInfo[5][i][5] == 0) {
          fillWithLeft += "<div class='row' onclick='loadMessage("+i+");'><div class='rowTitle'>"+adminInfo[5][i][1] + " / " + adminInfo[5][i][0];
          // IF the message is tagged / not tagged
          if (adminInfo[5][i][6] == 0) {
            fillWithLeft += "<img class='rowIcon' src='icons/notflagged.png'>";
          } else {
            fillWithLeft += "<img class='rowIcon' src='icons/flagged.png'>";
          }
          // IF the message has not been read / has been read
          if (adminInfo[5][i][4] == 0) {
            fillWithLeft += " <img class='rowIcon' src='icons/notread.png'>";
          } else {
            fillWithLeft += "<img class='rowIcon' src='icons/read.png'>";
          }
          fillWithLeft += "</div><div class='rowText'>"+adminInfo[5][i][2]+"</div><div class='rowFooter'>"+adminInfo[5][i][3]+"</div>";
          fillWithLeft += "</div>";
        }
      }

      fillWithLeft += "</div>";
      fillWithCenter = "<div class='titleInfo'>Handle Message</div><div class='textInfo'>Choose a message to check it's content.</div><div class='textInfo' id='infoMessages'></div>";
      fillWithRight = "<div class='titleInfo'>Message Comments</div><div class='textInfo'>Check the comments left under a message.</div><div class='textInfo' id='commentMessages'></div>";
      break;
    // IF user goes to USER page (requires superadmin priv)
    case "user":
      fillWithLeft = "<div class='titleInfo'>Select User</div><div class='textInfo'>Select an user to modify or delete it.</div><div class='textInfo'><div id='selectUser'><select id='userPicker' name='numUser'>";
      for (var i=0;i<adminInfo[7].length;i++) {
        fillWithLeft += "<option value='"+i+"'>"+adminInfo[7][i][0]+"</option>";
      }
      fillWithLeft += "</select></div><button type='button' id='modifyUser' class='buttonAdmin'>Modify Data</button><button type='button' class='delete' id='deleteUser'>Delete User</button></div>";

      fillWithCenter = "<div class='titleInfo'>Add New User</div><div class='textInfo'>Add a new user by filling the form down below.</div><div class='textInfo objectInfo'>";
      fillWithCenter += "<form onsubmit='event.preventDefault(); submitUser();'>";
      fillWithCenter += "<input type='hidden' id='userExists' name='userExists' value='no'>";
      fillWithCenter += "<label for='userEmail'>Email:</label><input type='text' id='userEmail' name='userEmail' required><br>";
      fillWithCenter += "<label for='userPasswd'>Password:</label><input type='password' id='userPasswd' name='userPasswd'><br>";
      fillWithCenter += "<label><input type='checkbox' id='adminPriv'><span>Admin Priviledge</span></label><br>";
      fillWithCenter += "<label><input type='checkbox' id='superadminPriv'><span>Superadmin Priviledge</span></label><br><br>";
      fillWithCenter += "<button type='submit' value='Submit' class='buttonAdmin'>Submit</button><button type='button' id='resetUser' value='Reset' class='delete'>Reset</button>";
      fillWithCenter += "</div>";
      fillWithRight = "<div class='titleInfo'>User Logs</div><div class='textInfo'>Only available for Admins and Super Admins</div><div class='textInfo logRow' id='userLogs'></div>";
      break;
    default:
      break;
  }

  // Here we will the HTML

  $("#infoleftInner").html(fillWithLeft);
  $("#infocentreInner").html(fillWithCenter);
  $("#inforightInner").html(fillWithRight);

  // Necessary editableselect assigning for the library to work
  $('#starPicker').editableSelect();
  $('#starPickerPlanet').editableSelect();
  $('#starPickerNPO').editableSelect();
  $('#starPickerSatellite').editableSelect();
  $('#starPickerPlanetInner').editableSelect();
  $('#starPickerNPOInner').editableSelect();
  $('#starPickerSatelliteInner').editableSelect();
  $('#userPicker').editableSelect();
}

// Fill admin homepage with basic data

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

// Function to wait for objects to load in, admin version

function waitForAdmin(){
  if(typeof adminInfo !== "undefined") {
      fillWithAdmin();
      fillWithDataAdmin("home");
  } else {
      setTimeout(waitForAdmin, 250);
  }
}

// Function to allow the dragging of the console across the screen, only in client side

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
        var result = (data);
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
                    var result = data;
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
              title: 'The Account Has Been Created Succesfully, An email has been sent in order to activate it!',
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
          case "err3":
            Swal.fire({
              icon: 'error',
              title: 'The account has not been activated yet!',
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

// function for forgotten password
function forgotPassword() {
  Swal.fire({
    title: "Enter your email address",
    input: 'textarea',
    inputPlaceholder: 'Type your email address here...',
    inputAttributes: {
      'aria-label': 'Type your email address here'
    },
    showCancelButton: true
  }).then((result) => {
    if(result.isConfirmed) {
      var formData = new FormData();
      formData.append('action', 'sendEmail');
      formData.append('data', result.value);
      fetch('php/forgotPassword.php', {
          method: "POST",
          body: formData
      })
          .then(response => response.text())
          .then(data => {
              if (data=="success") {
                Swal.fire('Sent!', 'An email to reset the password has been sent!', 'success');
              } else {
                Swal.fire('Error!', 'An unknown error has appeared!', 'error');
              }
          });
      
    } else {
      Swal.fire('Canceled!', 'The email has not been sent', 'info');
    }
  });
}

// function for forgotten password
function submitForgotten() {
  var passwd = $('#password_input').val();
  var passwd2 = $('#sec_password_input').val();;

  if (passwd == passwd2) {
    var formData = new FormData();
    formData.append('action','changePasswd');
    formData.append('data', passwd);
    fetch('php/forgotPassword.php', {
      method: "POST",
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        if(data == "success") {
          Swal.fire('Success!','The password has been changed','success').then((result) => {
            if(result.isConfirmed) {
              window.location.href = "login.php";
            }
          });
        } else {
          Swal.fire('Error!','This token has already been used!','error');
        }
      });
  } else {
      // This alert is pretty self-explanatory, it's when the client has typed two different passwords when creating his account
      Swal.fire('Passwords Not Matching!','error');
      Swal.fire({
        icon: 'error',
        title: 'Passwords Don\'t Match!',
      })
  }
}

function activateAccount() {
  var formData = new FormData();
    fetch('php/activateAccount.php', {
      method: "POST",
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        if(data == "success") {
          Swal.fire('Success!','The account has been activated','success').then((result) => {
            if(result.isConfirmed) {
              window.location.href = "login.php";
            }
          });
        } else {
          Swal.fire('Error!','This token has already been used!','error');
        }
      });
}

// Function to change between Log-in and Register

function changeLoginScope(createAcc) {
  var txtLogin = '<div class="row"><div class="input-field col s12"><input id="type_input" type="hidden" value="login"><input id="email_input" type="email" class="validate" required="" aria-required="true"><label for="email_input">Email</label></div></div><div class="row"><div class="input-field col s12"><input id="password_input" type="password" class="validate" required="" aria-required="true"><label for="password_input">Password</label><div class="forgotPass"><a href="" onclick="event.preventDefault(); forgotPassword();">Forgot password?</a></div></div></div><div class="row"></div><div class="row"><div class="col s6"><a href="#" onclick="changeLoginScope(false)">Create account</a></div><div class="col s6 right-align"><button class="waves-effect waves-light btn" type="submit" name="login">Login</button></div></div>';
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


// Message sent to team - Errors reported by mundane users
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
    // I wrote random stuff based on how this library works and it actually works
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

// When a Stellar object is submitted - Admin

function submitStars() {
  // assigning values
  var sendStar = [$("#starExists").val(),$("#starName").val(),$("#starRotation").val(),$("#starRevolution").val(),$("#starRadius").val(),$("#starTemperature").val(),
  $("#starOverview").val(),$("#starOverviewSource").val(),$("#starOverviewUrl").val(),$("#starInternal").val(),$("#starInternalSource").val(),$("#starInternalUrl").val(),
  $("#starSurface").val(),$("#starSurfaceSource").val(),$("#starSurfaceUrl").val(),$("#starType").val()];
  // sending query to php
  var formData = new FormData();
  formData.append('action','star');
  formData.append('objArray', JSON.stringify(sendStar));
  fetch('php/insertfromadmin.php', {
      method: "POST",
      body: formData
  })
      .then(response => response.text())
      .then(data => {
          if(data=="success") {
            Swal.fire('Submitted!', 'The form has been submitted!', 'success').then((result) => {
              if(result.isConfirmed) {
                location.reload();
              }
            });
          } else {
            Swal.fire('Error!', 'An unexpected error has appeared!', 'error');
            console.log(data);
          }
      });
}

// When a Planetary object is submitted - Admin

function submitPlanets() {
  // assigning values - slightly longer due to check if star was chosen
  var starID;
  var selectedStar = $("#selectInside .es-list .es-visible");
  if (selectedStar.length == 1) {
    var starPosition = selectedStar[0].value;
    starID = adminInfo[0][starPosition][0];
    var sendPlanet = [$("#planetExists").val(),starID,$("#planetName").val(),$("#planetPosition").val(),$("#planetRotation").val(),$("#planetRevolution").val(),$("#planetRadius").val(),
    $("#planetTemperature").val(),$("#planetOverview").val(),$("#planetOverviewSource").val(),$("#planetOverviewUrl").val(),$("#planetInternal").val(),$("#planetInternalSource").val(),
    $("#planetInternalUrl").val(),$("#planetSurface").val(),$("#planetSurfaceSource").val(),$("#planetSurfaceUrl").val()];
  } else {
    Swal.fire({
      icon: 'error',
      title: 'You need to choose a star before doing this!',
    })
  }

  // sending query to php
  var formData = new FormData();
  formData.append('action','planet');
  formData.append('objArray', JSON.stringify(sendPlanet));
  fetch('php/insertfromadmin.php', {
      method: "POST",
      body: formData
  })
      .then(response => response.text())
      .then(data => {
          if(data=="success") {
            Swal.fire('Submitted!', 'The form has been submitted!', 'success').then((result) => {
              if(result.isConfirmed) {
                location.reload();
              }
            });
          } else {
            Swal.fire('Error!', 'An unexpected error has appeared!', 'error');
          }
      });
}

// When a NPO object is submitted - Admin

function submitNPOs() {
  // assigning values - slightly longer due to check if star was chosen
  var starID;
  var selectedStar = $("#selectInside .es-list .es-visible");
  if (selectedStar.length == 1) {
    var starPosition = selectedStar[0].value;
    starID = adminInfo[0][starPosition][0];
    var sendNPO = [$("#npoExists").val(),starID,$("#npoName").val() ,$("#npoRotation").val(),$("#npoRevolution").val(),$("#npoRadius").val(),
    $("#npoTemperature").val(),$("#npoOverview").val(),$("#npoOverviewSource").val(),$("#npoOverviewUrl").val(),$("#npoInternal").val(),$("#npoInternalSource").val(),
    $("#npoInternalUrl").val(),$("#npoSurface").val(),$("#npoPlanetSurface").val(),$("#npoSurfaceUrl").val()];
  } else {
    Swal.fire({
      icon: 'error',
      title: 'You need to choose a star before doing this!',
    })
  }

  // sending query to php
  var formData = new FormData();
  formData.append('action','npo');
  formData.append('objArray', JSON.stringify(sendNPO));
  fetch('php/insertfromadmin.php', {
      method: "POST",
      body: formData
  })
      .then(response => response.text())
      .then(data => {
          if(data=="success") {
            Swal.fire('Submitted!', 'The form has been submitted!', 'success').then((result) => {
              if(result.isConfirmed) {
                location.reload();
              }
            });
          } else {
            Swal.fire('Error!', 'An unexpected error has appeared!', 'error');

          }
      });
}

// When a Satellite object is submitted - Admin

function submitSatellites() {
  // assigning values - slightly longer due to check if star was chosen
  var selectedStar = $("#selectInside .es-list .es-visible");
  if (selectedStar.length == 1) {
    // This one is slightly different, since a star needs to be chosen in order to get a planet, we don't need most of the variables used in the previous examples
    var sendSatellite = [$("#satelliteExists").val(),adminInfo[1][$("#selectSatellitePlanetInner").val()][0],$("#satelliteName").val(),$("#satellitePosition").val(),$("#satelliteRotation").val(),
    $("#satelliteRevolution").val(),$("#satelliteRadius").val(),$("#satelliteTemperature").val(),$("#satelliteOverview").val(),$("#satelliteOverviewSource").val(),$("#satelliteOverviewUrl").val(),
    $("#satelliteInternal").val(),$("#satelliteInternalSource").val(),$("#satelliteInternalUrl").val(),$("#satelliteSurface").val(),$("#satelliteSurfaceSource").val(),$("#satelliteSurfaceUrl").val()];
  } else {
    Swal.fire({
      icon: 'error',
      title: 'You need to choose a star before doing this!',
    })
  }

  // sending query to php
  var formData = new FormData();
  formData.append('action','satellite');
  formData.append('objArray', JSON.stringify(sendSatellite));
  fetch('php/insertfromadmin.php', {
      method: "POST",
      body: formData
  })
      .then(response => response.text())
      .then(data => {
          if(data=="success") {
            Swal.fire('Submitted!', 'The form has been submitted!', 'success').then((result) => {
              if(result.isConfirmed) {
                location.reload();
              }
            });
          } else {
            Swal.fire('Error!', 'An unexpected error has appeared!', 'error');
          }
      });
}

function loadMessage(messageID) {
  var fillWithCenter = "";
  var fillWithRight = "";
  // check if message has been read, if not, add read flag
  if (adminInfo[5][messageID][4] == 0) {
    var formData = new FormData();
    formData.append('action','read');
    formData.append('affectedID', adminInfo[5][messageID][0]);
    fetch('php/insertfrommessages.php', {
        method: "POST",
        body: formData
    })
        .then(response => response.text())
        .then(data => {
          adminInfo[5][messageID][4] = 1;
        });
  } else {
    var formData = new FormData();
    formData.append('action','readA'); 
    formData.append('affectedID', adminInfo[5][messageID][0]);
    fetch('php/insertfrommessages.php', {
        method: "POST",
        body: formData
    })
        .then(response => response.text())
        .then(data => {
        });
  }
  fillWithCenter += "<div class='row'><div class='rowTitle'>"+adminInfo[5][messageID][1] + " / <span id='messageId' value='"+messageID+"'>" + adminInfo[5][messageID][0] + "</span>";
  fillWithCenter += "</div><div class='rowTextFull'>"+adminInfo[5][messageID][2]+"</div><div class='rowFooter'>"+adminInfo[5][messageID][3]+"</div></div>";
  // if the message is hidden / closed
  if (adminInfo[5][messageID][5]==1) {
    fillWithCenter += "<div id='buttonHide'><button type='button' id='hideMessage' class='buttonAdmin handleMessage'>Unhide</button>";
  } else {
    fillWithCenter += "<div id='buttonHide'><button type='button' id='hideMessage' class='buttonAdmin handleMessage'>Hide</button>";
  }
  // if the message is flagged
  if (adminInfo[5][messageID][6]==1) {
    fillWithCenter += "<button type='button' class='delete handleMessage' id='flagMessage'>Unflag</button></div>";
  } else {
    fillWithCenter += "<button type='button' class='delete handleMessage' id='flagMessage'>Flag</button></div>";
  }

  // fadeout / fadein animations for the message information to load in

  if($("#infoMessages").html()=="") {
    $("#infoMessages").hide().html(fillWithCenter).fadeIn();
  } else {
    $("#infoMessages").fadeOut(function() {
      $("#infoMessages").html(fillWithCenter).fadeIn();
    });
  }
  
  // fill the comments
  fillWithRight += "<div class='textInfo'>";
  for (var i=0;i<adminInfo[8].length;i++) {
    if (adminInfo[8][i][1] == adminInfo[5][messageID][0]) {
      fillWithRight += "<div class='row'><div class='rowTitle'>" + adminInfo[8][i][2] + "</div><div class='rowTextFull'>" + adminInfo[8][i][3] + "</div><div class='rowFooter'>" + adminInfo[8][i][4] + "</div></div>";
    }
  }
  if (fillWithRight == "<div class='textInfo'>") {
    fillWithRight += "There are no comments as of yet!";
  }
  fillWithRight += "</div>";
  fillWithRight += "<input type='hidden' value='"+adminInfo[5][messageID][0]+"' id='commentMessageAso'>";
  fillWithRight += "<div class='textInfo'><textarea placeholder='Type your comment here...' id='commentText'></textarea>";
  fillWithRight += "<button type='submit' value='Submit' id='submitComment' class='buttonAdmin'>Submit</button></div>";

  // fadeout / fadein animations for the comment information to load in

  if($("#commentMessages").html()=="") {
    $("#commentMessages").hide().html(fillWithRight).fadeIn();
  } else {
    $("#commentMessages").fadeOut(function() {
      $("#commentMessages").html(fillWithRight).fadeIn();
    });
  }
  //$("#commentMessages").html(fillWithRight);
}

// function for filtering messages

function messageQuery() {
  var messageArray1 = [];
  var messageArray2 = [];
  var messageArrayFinal = [];

  if (showHidden == 1) {
    for (var i=0;i<adminInfo[5].length;i++) {
      // IF the message is hidden
      if (adminInfo[5][i][5] == 1) {
        if(adminInfo[5][i].length == 7) {
          adminInfo[5][i].push(i);
        }
        messageArray1.push(adminInfo[5][i]);
      }
    }
  } else {
    for (var i=0;i<adminInfo[5].length;i++) {
      // IF the message is not hidden
      if (adminInfo[5][i][5] == 0) {
        if(adminInfo[5][i].length == 7) {
          adminInfo[5][i].push(i);
        }
        messageArray1.push(adminInfo[5][i]);
      }
    }
  }

  if (showUnseen == 1) {
    for (var i=0;i<messageArray1.length;i++) {
      // IF the message is unread
      if (messageArray1[i][4] == 0) {
        messageArray2.push(messageArray1[i]);
      }
    }
  } else {
    for (var i=0;i<messageArray1.length;i++) {
      // ALL the messages no matter if read or not
        messageArray2.push(messageArray1[i]);
    }
  }

  if (showFlagged == 1) {
    for (var i=0;i<messageArray2.length;i++) {
      // IF the message is flagged
      if (messageArray2[i][6] == 1) {
        messageArrayFinal.push(messageArray2[i]);
      }
    }
  } else {
    for (var i=0;i<messageArray2.length;i++) {
      // ALL the messages no matter if flagged or not
      messageArrayFinal.push(messageArray2[i]);
    }
  }

  fillWithLeft = "";

  for (var i=0;i<messageArrayFinal.length;i++) {
    // IF the message is still open
      fillWithLeft += "<div class='row' onclick='loadMessage("+messageArrayFinal[i][7]+");'><div class='rowTitle'>"+messageArrayFinal[i][1] + " / " + messageArrayFinal[i][0];
      // IF the message is tagged / not tagged
      if (messageArrayFinal[i][0][6] == 0) {
        fillWithLeft += "<img class='rowIcon' src='icons/notflagged.png'>";
      } else {
        fillWithLeft += "<img class='rowIcon' src='icons/flagged.png'>";
      }
      // IF the message has not been read / has been read
      if (messageArrayFinal[i][4] == 0) {
        fillWithLeft += " <img class='rowIcon' src='icons/notread.png'>";
      } else {
        fillWithLeft += "<img class='rowIcon' src='icons/read.png'>";
      }
      fillWithLeft += "</div><div class='rowText'>"+messageArrayFinal[i][2]+"</div><div class='rowFooter'>"+messageArrayFinal[i][3]+"</div></div>";
  }
  $("#messageRow").fadeOut(function() {
    $("#messageRow").html(fillWithLeft);
    $("#messageRow").fadeIn();
  });
}

// When user is submitted in the admin page, does not require to be activated

function submitUser() {
  sendUser = [];
  sendUser.push($("#userExists").val());
  sendUser.push($("#userEmail").val());
  sendUser.push($("#userPasswd").val());
  if ($("#adminPriv").prop('checked')) {
    sendUser.push(1);
  } else {
    if ($("#superadminPriv").prop('checked')) {
      sendUser.push(1);
    } else {
      sendUser.push(0);
    }
  }
  if ($("#superadminPriv").prop('checked')) {
    sendUser.push(1);
  } else {
    sendUser.push(0);
  }
  var formData = new FormData();
  formData.append('objArray', JSON.stringify(sendUser));
  fetch('php/insertuser.php', {
      method: "POST",
      body: formData
  })
      .then(response => response.text())
      .then(data => {
          if(data=="success") {
            Swal.fire('Submitted!', 'The form has been submitted!', 'success').then((result) => {
              if(result.isConfirmed) {
                location.reload();
              }
            });
          } else {
            console.log(data);
            Swal.fire('Error!', 'An unexpected error has appeared!', 'error');
          }
      });
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}