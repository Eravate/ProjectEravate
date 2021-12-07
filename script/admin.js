// Wait for ADMIN Data to load in -- Available in COMMANDS.JS

waitForAdmin();

// Load STELLAR Data

$("#add1").click(function() {
    $("#infoleftInner").fadeOut();
    $("#infocentreInner").fadeOut();
    $("#inforightInner").fadeOut(function() {
        fillWithDataAdmin("sun");
        $("#infoleftInner").fadeIn();
        $("#infocentreInner").fadeIn();
        $("#inforightInner").fadeIn();
    });
});

// Load PLANETARY Data

$("#add2").click(function() {
    $("#infoleftInner").fadeOut();
    $("#infocentreInner").fadeOut();
    $("#inforightInner").fadeOut(function() {
        fillWithDataAdmin("planet");
        $("#infoleftInner").fadeIn();
        $("#infocentreInner").fadeIn();
        $("#inforightInner").fadeIn();
    });
});

// Load NPO Data

$("#add3").click(function() {
    $("#infoleftInner").fadeOut();
    $("#infocentreInner").fadeOut();
    $("#inforightInner").fadeOut(function() {
        fillWithDataAdmin("npo");
        $("#infoleftInner").fadeIn();
        $("#infocentreInner").fadeIn();
        $("#inforightInner").fadeIn();
    });
});

// Load SATELLITE Data

$("#add4").click(function() {
    $("#infoleftInner").fadeOut();
    $("#infocentreInner").fadeOut();
    $("#inforightInner").fadeOut(function() {
        fillWithDataAdmin("satellite");
        $("#infoleftInner").fadeIn();
        $("#infocentreInner").fadeIn();
        $("#inforightInner").fadeIn();
    });
});

// Load MESSAGES Data

$("#messages").click(function() {
    $("#infoleftInner").fadeOut();
    $("#infocentreInner").fadeOut();
    $("#inforightInner").fadeOut(function() {
        fillWithDataAdmin("message");
        $("#infoleftInner").fadeIn();
        $("#infocentreInner").fadeIn();
        $("#inforightInner").fadeIn();
    });
})

// Load USER Data (Natively only available to superadmins)

$("#users").click(function() {
    $("#infoleftInner").fadeOut();
    $("#infocentreInner").fadeOut();
    $("#inforightInner").fadeOut(function() {
        fillWithDataAdmin("user");
        $("#infoleftInner").fadeIn();
        $("#infocentreInner").fadeIn();
        $("#inforightInner").fadeIn();
    });
})

// Load HOME data

$("#pagetitle1").click(function() {
    $("#infoleftInner").fadeOut();
    $("#infocentreInner").fadeOut();
    $("#inforightInner").fadeOut(function() {
        fillWithDataAdmin("home");
        $("#infoleftInner").fadeIn();
        $("#infocentreInner").fadeIn();
        $("#inforightInner").fadeIn();
    });
})

// On Key Presses for Stars

// When a star is chosen, and the modify button is pressed, load in the star data

$("body").on("click", "#modifyStar", function() {
    var selectedStar = document.getElementsByClassName("es-visible");
    // If a star is not selected (Courtesy of JQuery Editable Select)
    if (selectedStar.length > 1) {
        Swal.fire({
            icon: 'error',
            title: 'You need to choose a star before doing this!',
          })
    } else {
        var starPosition = selectedStar[0].value;
        $("#starExists").val(adminInfo[0][starPosition][0]);
        $("#starName").val(adminInfo[0][starPosition][1]);
        $("#starRotation").val(adminInfo[0][starPosition][2]);
        $("#starRevolution").val(adminInfo[0][starPosition][3]);
        $("#starRadius").val(adminInfo[0][starPosition][4]);
        $("#starTemperature").val(adminInfo[0][starPosition][5]);
        $("#starOverview").val(adminInfo[0][starPosition][6]);
        $("#starOverviewSource").val(adminInfo[0][starPosition][7]);
        $("#starOverviewUrl").val(adminInfo[0][starPosition][8]);
        $("#starInternal").val(adminInfo[0][starPosition][9]);
        $("#starInternalSource").val(adminInfo[0][starPosition][10]);
        $("#starInternalUrl").val(adminInfo[0][starPosition][11]);
        $("#starSurface").val(adminInfo[0][starPosition][12]);
        $("#starSurfaceSource").val(adminInfo[0][starPosition][13]);
        $("#starSurfaceUrl").val(adminInfo[0][starPosition][14]);
        $("#starType").val(adminInfo[0][starPosition][15]);
        $("#starSubmitTitle").html("Modify Star");
    }
})

// When the reset button is pressed in Star

$("body").on("click", "#resetStar", function() {
    $("#starExists").val("no");
    $("#starSubmitTitle").html("Add New Star");
})

// On Key Presses for Planetary Objects

// When a star is chosen, load in the Planets

$("body").on("keypress focusout", "#starPickerPlanet", function() {
    var selectedStar = $("#selectOutside .es-list .es-visible");
    var fillSelectWithPlanets = "";
    if (selectedStar.length == 1) {
        var starPosition = selectedStar[0].value;
        for (var i=0;i<adminInfo[1].length;i++) {
            if (adminInfo[1][i][1] == adminInfo[0][starPosition][0]) {
                fillSelectWithPlanets += "<option value='"+i+"'>"+adminInfo[1][i][2]+"</option>"; 
            }
        }
    } else {
        fillSelectWithPlanets = "<option value='no'>Select A Star</option>";
    }
    $("#selectPlanet").html(fillSelectWithPlanets);
})

// When a Planet is chosen, and modify key is pressed, load in the Planetary data

$("body").on("click", "#modifyPlanet", function() {
    var etwo = jQuery.Event("keydown");
    etwo.which = 50;
    etwo.keyCode = 50;

    var selectedValue = $("#selectPlanet").val();
    // If a planet is not chosen
    if (selectedValue == "no") {
        Swal.fire({
            icon: 'error',
            title: 'You need to choose a planet before doing this!',
          })
    } else {
        var selectedStar = $("#selectOutside .es-list .es-visible");
        var starPosition = selectedStar[0].value;
        $("#planetExists").val(adminInfo[1][selectedValue][0]);
        $("#planetName").val(adminInfo[1][selectedValue][2]);
        $("#planetPosition").val(adminInfo[1][selectedValue][3]);
        $("#planetRotation").val(adminInfo[1][selectedValue][4]);
        $("#planetRevolution").val(adminInfo[1][selectedValue][5]);
        $("#planetRadius").val(adminInfo[1][selectedValue][6]);
        $("#planetTemperature").val(adminInfo[1][selectedValue][7]);
        $("#planetOverview").val(adminInfo[1][selectedValue][8]);
        $("#planetOverviewSource").val(adminInfo[1][selectedValue][9]);
        $("#planetOverviewUrl").val(adminInfo[1][selectedValue][10]);
        $("#planetInternal").val(adminInfo[1][selectedValue][11]);
        $("#planetInternalSource").val(adminInfo[1][selectedValue][12]);
        $("#planetInternalUrl").val(adminInfo[1][selectedValue][13]);
        $("#planetSurface").val(adminInfo[1][selectedValue][14]);
        $("#planetSurfaceSource").val(adminInfo[1][selectedValue][15]);
        $("#planetSurfaceUrl").val(adminInfo[1][selectedValue][16]);
        $("#starPickerPlanetInner").val(adminInfo[0][starPosition][1]);
        $("#starPickerPlanetInner").trigger(etwo);
        $("#selectInside .es-list").css("display","none");
        //$("#starType").val(adminInfo[0][selectedValue][15]);
        $("#planetSubmitTitle").html("Modify Planet");
    }
})

// When the reset button is pressed in Planet

$("body").on("click", "#resetPlanet", function() {
    $("#planetExists").val("no");
    $("#planetSubmitTitle").html("Add New Planet");
})

// On Key Presses for NPO Objects

// When a star is chosen, load in the NPO's

$("body").on("keypress focusout", "#starPickerNPO", function() {
    var selectedStar = $("#selectOutside .es-list .es-visible");
    var fillSelectWithNPOs = "";
    // If a star is selected (Courtesy of JQuery Editable Select)
    if (selectedStar.length == 1) {
        var starPosition = selectedStar[0].value;
        for (var i=0;i<adminInfo[2].length;i++) {
            if (adminInfo[2][i][1] == adminInfo[0][starPosition][0]) {
                fillSelectWithNPOs += "<option value='"+i+"'>"+adminInfo[2][i][2]+"</option>"; 
            }
        }
    } else {
        fillSelectWithNPOs = "<option value='no'>Select A Star</option>";
    }
    $("#selectNPO").html(fillSelectWithNPOs);
})

// When a NPO is chosen, and modify key is pressed, load in the NPO data

$("body").on("click", "#modifyNPO", function() {
    var etwo = jQuery.Event("keydown");
    etwo.which = 50;
    etwo.keyCode = 50;

    var selectedValue = $("#selectNPO").val();
    // If an NPO is not chosen
    if (selectedValue == "no") {
        Swal.fire({
            icon: 'error',
            title: 'You need to choose a npo before doing this!',
          })
    } else {
        var selectedStar = $("#selectOutside .es-list .es-visible");
        var starPosition = selectedStar[0].value;
        $("#npoExists").val(adminInfo[2][selectedValue][0]);
        $("#npoName").val(adminInfo[2][selectedValue][2]);
        $("#npoRotation").val(adminInfo[2][selectedValue][4]);
        $("#npoRevolution").val(adminInfo[2][selectedValue][5]);
        $("#npoRadius").val(adminInfo[2][selectedValue][6]);
        $("#npoTemperature").val(adminInfo[2][selectedValue][7]);
        $("#npoOverview").val(adminInfo[2][selectedValue][8]);
        $("#npoOverviewSource").val(adminInfo[2][selectedValue][9]);
        $("#npoOverviewUrl").val(adminInfo[2][selectedValue][10]);
        $("#npoInternal").val(adminInfo[2][selectedValue][11]);
        $("#npoInternalSource").val(adminInfo[2][selectedValue][12]);
        $("#npoInternalUrl").val(adminInfo[2][selectedValue][13]);
        $("#npoSurface").val(adminInfo[2][selectedValue][14]);
        $("#npoPlanetSurface").val(adminInfo[2][selectedValue][15]);
        $("#npoSurfaceUrl").val(adminInfo[2][selectedValue][16]);
        $("#starPickerNPOInner").val(adminInfo[0][starPosition][1]);
        $("#starPickerNPOInner").trigger(etwo);
        $("#selectInside .es-list").css("display","none");
        //$("#starType").val(adminInfo[0][selectedValue][15]);
        $("#npoSubmitTitle").html("Modify NPO");
    }
})

// When the reset button is pressed in NPO

$("body").on("click", "#resetNPO", function() {
    $("#npoExists").val("no");
    $("#npoSubmitTitle").html("Add New NPO");
})

// On Key Presses for Satellites Objects, longer than usual because of the sheer amount of checks needed to be done

// When a star is chosen, load in the Planets

$("body").on("keypress focusout", "#starPickerSatellite", function() {
    var selectedStar = $("#selectOutside .es-list .es-visible");
    var fillSelectWithPlanets = "";
    // If a star is selected (Courtesy of JQuery Editable Select)
    if (selectedStar.length == 1) {
        var starPosition = selectedStar[0].value;
        for (var i=0;i<adminInfo[1].length;i++) {
            if (adminInfo[1][i][1] == adminInfo[0][starPosition][0]) {
                fillSelectWithPlanets += "<option value='"+i+"'>"+adminInfo[1][i][2]+"</option>"; 
            }
        }
    } else {
        fillSelectWithPlanets = "<option value='no'>Select A Star</option>";
    }
    $("#selectSatellitePlanet").html(fillSelectWithPlanets);

    // Load in the satellites of the first planet
    var fillSelectWithSatellites = "";
    for (var i=0;i<adminInfo[3].length;i++) {
        var pos = $("#selectSatellitePlanet").val();
        if (adminInfo[3][i][1] == adminInfo[1][pos][0]) {
            fillSelectWithSatellites += "<option value='"+i+"'>"+adminInfo[3][i][2]+"</option>"; 
        }
    }
    if (fillSelectWithSatellites == "") {
        fillSelectWithSatellites = "<option value='no'>Select A Planet</option>"
    }
    $("#selectSatellite").html(fillSelectWithSatellites);
})

// When a planet is chosen, load in the Satellites

$("body").on("click", "#selectSatellitePlanet", function() {
    var fillSelectWithSatellites = "";
    for (var i=0;i<adminInfo[3].length;i++) {
        var pos = $("#selectSatellitePlanet").val();
        if (adminInfo[3][i][1] == adminInfo[1][pos][0]) {
            fillSelectWithSatellites += "<option value='"+i+"'>"+adminInfo[3][i][2]+"</option>"; 
        }
    }
    if (fillSelectWithSatellites == "") {
        fillSelectWithSatellites = "<option value='no'>Select A Planet</option>"
    }
    $("#selectSatellite").html(fillSelectWithSatellites);
})

// If the user desides to modify a satellite

$("body").on("click", "#modifySatellite", function() {
    var etwo = jQuery.Event("keydown");
    etwo.which = 50;
    etwo.keyCode = 50;

    var selectedValue = $("#selectSatellite").val();
    // if a satellite is not chosen
    if (selectedValue == "no") {
        Swal.fire({
            icon: 'error',
            title: 'You need to choose a satellite before doing this!',
          })
    } else {
        var selectedStar = $("#selectOutside .es-list .es-visible");
        var starPosition = selectedStar[0].value;
        var fillSelectWithPlanets;
        $("#satelliteExists").val(adminInfo[3][selectedValue][0]);
        $("#satelliteName").val(adminInfo[3][selectedValue][2]);
        $("#satellitePosition").val(adminInfo[3][selectedValue][3]);
        $("#satelliteRotation").val(adminInfo[3][selectedValue][4]);
        $("#satelliteRevolution").val(adminInfo[3][selectedValue][5]);
        $("#satelliteRadius").val(adminInfo[3][selectedValue][6]);
        $("#satelliteTemperature").val(adminInfo[3][selectedValue][7]);
        $("#satelliteOverview").val(adminInfo[3][selectedValue][8]);
        $("#satelliteOverviewSource").val(adminInfo[3][selectedValue][9]);
        $("#satelliteOverviewUrl").val(adminInfo[3][selectedValue][10]);
        $("#satelliteInternal").val(adminInfo[3][selectedValue][11]);
        $("#satelliteInternalSource").val(adminInfo[3][selectedValue][12]);
        $("#satelliteInternalUrl").val(adminInfo[3][selectedValue][13]);
        $("#satelliteSurface").val(adminInfo[3][selectedValue][14]);
        $("#satelliteSurfaceSource").val(adminInfo[3][selectedValue][15]);
        $("#satelliteSurfaceUrl").val(adminInfo[3][selectedValue][16]);
        $("#starPickerSatelliteInner").val(adminInfo[0][starPosition][1]);
        $("#starPickerSatelliteInner").trigger(etwo);
        $("#selectInside .es-list").css("display","none");
        for (var i=0;i<adminInfo[1].length;i++) {
            if (adminInfo[1][i][1] == adminInfo[0][starPosition][0]) {
                fillSelectWithPlanets += "<option value='"+i+"'>"+adminInfo[1][i][2]+"</option>"; 
            }
        }
        $("#selectSatellitePlanetInner").html(fillSelectWithPlanets);
        $("#selectSatellitePlanetInner").val($("#selectSatellitePlanet").val());
        //$("#starType").val(adminInfo[0][selectedValue][15]);
        $("#satelliteSubmitTitle").html("Modify Satellite");
    }
})

// When a star is chosen, load in the Planets, but inner

$("body").on("keypress focusout", "#starPickerSatelliteInner", function() {
    var selectedStar = $("#selectInside .es-list .es-visible");
    var fillSelectWithPlanets = "";
    if (selectedStar.length == 1) {
        var starPosition = selectedStar[0].value;
        for (var i=0;i<adminInfo[1].length;i++) {
            if (adminInfo[1][i][1] == adminInfo[0][starPosition][0]) {
                fillSelectWithPlanets += "<option value='"+i+"'>"+adminInfo[1][i][2]+"</option>"; 
            }
        }
    } else {
        fillSelectWithPlanets = "<option value='no'>Select A Star</option>";
    }
    $("#selectSatellitePlanetInner").html(fillSelectWithPlanets);
})

// When the reset button is pressed on the satellite form

$("body").on("click", "#resetSatellite", function() {
    $("#satelliteExists").val("no");
    $("#satelliteSubmitTitle").html("Add New Satellite");
    $("#selectSatellitePlanetInner").html("<option value='no'>Select A Star</option>");
})
