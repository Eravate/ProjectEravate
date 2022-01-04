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
    $("#infocentreInner").fadeOut(function() {
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
            $("#starSubmitInfo").html("Modify "+adminInfo[0][starPosition][1]+" by altering the form down below");
        }
        $("#infocentreInner").fadeIn();
    });
})

// When the reset button is pressed in Star

$("body").on("click", "#resetStar", function() {
    $("#infocentreInner").fadeOut(function() {
        $("#starName").val("");
        $("#starRotation").val("");
        $("#starRevolution").val("");
        $("#starRadius").val("");
        $("#starTemperature").val("");
        $("#starOverview").val("");
        $("#starOverviewSource").val("");
        $("#starOverviewUrl").val("");
        $("#starInternal").val("");
        $("#starInternalSource").val("");
        $("#starInternalUrl").val("");
        $("#starSurface").val("");
        $("#starSurfaceSource").val("");
        $("#starSurfaceUrl").val("");
        $("#starType").val(1);
        $("#starExists").val("no");
        $("#starSubmitTitle").html("Add New Star");
        $("#starSubmitInfo").html("Add a new star by filling the form down below");
        $("#infocentreInner").fadeIn();
    });
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
    $("#infocentreInner").fadeOut(function() {
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
            $("#planetSubmitInfo").html("Modify "+adminInfo[1][selectedValue][2]+" by altering the form down below");
        }
        $("#infocentreInner").fadeIn();
    });
})

// When the reset button is pressed in Planet

$("body").on("click", "#resetPlanet", function() {
    $("#infocentreInner").fadeOut(function() {
        var etwo = jQuery.Event("keydown");
        etwo.which = 50;
        etwo.keyCode = 50;

        $("#planetName").val("");
        $("#planetPosition").val("");
        $("#planetRotation").val("");
        $("#planetRevolution").val("");
        $("#planetRadius").val("");
        $("#planetTemperature").val("");
        $("#planetOverview").val("");
        $("#planetOverviewSource").val("");
        $("#planetOverviewUrl").val("");
        $("#planetInternal").val("");
        $("#planetInternalSource").val("");
        $("#planetInternalUrl").val("");
        $("#planetSurface").val("");
        $("#planetSurfaceSource").val("");
        $("#planetSurfaceUrl").val("");

        $("#starPickerPlanetInner").val("");
        $("#starPickerPlanetInner").trigger(etwo);
        $("#selectInside .es-list").css("display","none");

        $("#planetExists").val("no");
        $("#planetSubmitTitle").html("Add New Planet");
        $("#planetSubmitInfo").html("Add a new planet by filling the form down below");
        $("#infocentreInner").fadeIn();
    });
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
    $("#infocentreInner").fadeOut(function() {
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
            $("#npoSubmitInfo").html("Modify "+adminInfo[2][selectedValue][2]+" by altering the form down below");
        }
        $("#infocentreInner").fadeIn();
    });
})

// When the reset button is pressed in NPO

$("body").on("click", "#resetNPO", function() {
    $("#infocentreInner").fadeOut(function() {
        var etwo = jQuery.Event("keydown");
        etwo.which = 50;
        etwo.keyCode = 50;

        $("#npoName").val("");
        $("#npoPosition").val("");
        $("#npoRotation").val("");
        $("#npoRevolution").val("");
        $("#npoRadius").val("");
        $("#npoTemperature").val("");
        $("#npoOverview").val("");
        $("#npoOverviewSource").val("");
        $("#npoOverviewUrl").val("");
        $("#npoInternal").val("");
        $("#npoInternalSource").val("");
        $("#npoInternalUrl").val("");
        $("#npoSurface").val("");
        $("#npoSurfaceSource").val("");
        $("#npoSurfaceUrl").val("");

        $("#starPickerNPOInner").val("");
        $("#starPickerNPOInner").trigger(etwo);
        $("#selectInside .es-list").css("display","none");

        $("#npoExists").val("no");
        $("#npoSubmitTitle").html("Add New NPO");
        $("#npoSubmitInfo").html("Add a new planet by filling the form down below");
        $("#infocentreInner").fadeIn();
    });
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
    $("#infocentreInner").fadeOut(function() {
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
            $("#satelliteSubmitInfo").html("Modify "+adminInfo[3][selectedValue][2]+" by altering the form down below");
        }
        $("#infocentreInner").fadeIn();
    });
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
    $("#infocentreInner").fadeOut(function() {
        var etwo = jQuery.Event("keydown");
        etwo.which = 50;
        etwo.keyCode = 50;

        $("#satelliteName").val("");
        $("#satellitePosition").val("");
        $("#satelliteRotation").val("");
        $("#satelliteRevolution").val("");
        $("#satelliteRadius").val("");
        $("#satelliteTemperature").val("");
        $("#satelliteOverview").val("");
        $("#satelliteOverviewSource").val("");
        $("#satelliteOverviewUrl").val("");
        $("#satelliteInternal").val("");
        $("#satelliteInternalSource").val("");
        $("#satelliteInternalUrl").val("");
        $("#satelliteSurface").val("");
        $("#satelliteSurfaceSource").val("");
        $("#satelliteSurfaceUrl").val("");

        $("#starPickerSatelliteInner").val("");
        $("#starPickerSatelliteInner").trigger(etwo);
        $("#selectInside .es-list").css("display","none");
        $("#selectSatellitePlanetInner").html("<option value='no'>Select A Star</option>");

        $("#satelliteExists").val("no");
        $("#satelliteSubmitTitle").html("Add New Satellite");
        $("#satelliteSubmitInfo").html("Add a new satellite by filling the form down below");
        $("#infocentreInner").fadeIn();
    });
})

// DELETE BUTTON ACTIONS

// Delete Star on click

$("body").on("click", "#deleteStar", function() { 
    var selectedStar = $("#selectOutside .es-list .es-visible");
    if (selectedStar.length == 1) { 
        var starPosition = selectedStar[0].value;
        var starToDelete = [adminInfo[0][starPosition][0],adminInfo[0][starPosition][1]];
        // sending query to php
        Swal.fire({
            title: "Careful!",
            icon: "warning",
            text: "This action is irreversible, do you wish to continue?",
            showCancelButton: true
        }).then((result) => {
            if(result.isConfirmed) {
                var formData = new FormData();
                formData.append('action','star');
                formData.append('affObject', JSON.stringify(starToDelete));
                fetch('php/deletefromadmin.php', {
                    method: "POST",
                    body: formData
                })
                    .then(response => response.text())
                    .then(data => {
                        if(data=="success") {
                        Swal.fire('Deleted!', 'The Star has been deleted!', 'success').then((result) => {
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
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'You need to choose a Star before doing this!',
          })
    }
});

// Delete Planet on click

$("body").on("click", "#deletePlanet", function() { 
    if ($("#selectPlanet").val() !== "no") {
        var planetToDelete = [adminInfo[1][$("#selectPlanet").val()][0],adminInfo[1][$("#selectPlanet").val()][2]];
        // sending query to php
        Swal.fire({
            title: "Careful!",
            icon: "warning",
            text: "This action is irreversible, do you wish to continue?",
            showCancelButton: true
        }).then((result) => {
            if(result.isConfirmed) {
                var formData = new FormData();
                formData.append('action','planet');
                formData.append('affObject', JSON.stringify(planetToDelete));
                fetch('php/deletefromadmin.php', {
                    method: "POST",
                    body: formData
                })
                    .then(response => response.text())
                    .then(data => {
                        if(data=="success") {
                        Swal.fire('Submitted!', 'The Planet has been deleted!', 'success').then((result) => {
                            if(result.isConfirmed) {
                                location.reload();
                            }
                        });
                        } else {
                            Swal.fire('Error!', 'An unexpected error has appeared!', 'error');
                        }
                    });
            }
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'You need to choose a Planet before doing this!',
      })
    }
});

// Delete NPO on click

$("body").on("click", "#deleteNPO", function() { 
    if ($("#selectNPO").val() !== "no") {
        var npoToDelete = [adminInfo[2][$("#selectNPO").val()][0],adminInfo[2][$("#selectNPO").val()][2]];
        // sending query to php
        Swal.fire({
            title: "Careful!",
            icon: "warning",
            text: "This action is irreversible, do you wish to continue?",
            showCancelButton: true
        }).then((result) => {
            if(result.isConfirmed) {
                var formData = new FormData();
                formData.append('action','npo');
                formData.append('affObject', JSON.stringify(npoToDelete));
                fetch('php/deletefromadmin.php', {
                    method: "POST",
                    body: formData
                })
                    .then(response => response.text())
                    .then(data => {
                        if(data=="success") {
                        Swal.fire('Submitted!', 'The NPO has been deleted!', 'success').then((result) => {
                            if(result.isConfirmed) {
                                location.reload();
                            }
                        });
                        } else {
                            Swal.fire('Error!', 'An unexpected error has appeared!', 'error');
                        }
                    });
            }
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'You need to choose a NPO before doing this!',
      })
    }
});

// Delete Satellite on click

$("body").on("click", "#deleteSatellite", function() { 
    if ($("#selectSatellite").val() !== "no") {
        var satelliteToDelete = [adminInfo[3][$("#selectSatellite").val()][0],adminInfo[3][$("#selectSatellite").val()][2]];
        // sending query to php
        Swal.fire({
            title: "Careful!",
            icon: "warning",
            text: "This action is irreversible, do you wish to continue?",
            showCancelButton: true
        }).then((result) => {
            if(result.isConfirmed) {
                var formData = new FormData();
                formData.append('action','satellite');
                formData.append('affObject', JSON.stringify(satelliteToDelete));
                fetch('php/deletefromadmin.php', {
                    method: "POST",
                    body: formData
                })
                    .then(response => response.text())
                    .then(data => {
                        if(data=="success") {
                        Swal.fire('Submitted!', 'The Satellite has been deleted!', 'success').then((result) => {
                            if(result.isConfirmed) {
                                location.reload();
                            }
                        });
                        } else {
                            Swal.fire('Error!', 'An unexpected error has appeared!', 'error');
                        }
                    });
            }
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'You need to choose a satellite before doing this!',
      })
    }
});

// If a message is hidden by the admin / closed
$("body").on("click", "#hideMessage", function() { 
    var currentScope = $("#hideMessage").html();
    var objPos = $("#messageId").attr('value');
    if (currentScope=="Unhide") {
        var formData = new FormData();
        formData.append('action','unhide');
        formData.append('affectedID', $("#messageId").html());
        fetch('php/insertfrommessages.php', {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                if (data=="success") {
                    adminInfo[5][objPos][5] = 0;
                    Swal.fire('Unhidden!', 'The message has been Unhidden!', 'success');
                    messageQuery();
                } else {
                    Swal.fire('Error!', 'An unexpected error has appeared!', 'error');
                }
            });
        $("#hideMessage").html("Hide");
    } else {
        var formData = new FormData();
        formData.append('action','hide');
        formData.append('affectedID', $("#messageId").html());
        fetch('php/insertfrommessages.php', {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                if (data=="success") {
                    adminInfo[5][objPos][5] = 1;
                    Swal.fire('Hidden!', 'The message has been hidden!', 'success');
                    messageQuery();
                } else {
                    Swal.fire('Error!', 'An unexpected error has appeared!', 'error');
                }
            });
        $("#hideMessage").html("Unhide");
    }
});

// If a message is flagged by the admin
$("body").on("click", "#flagMessage", function() { 
    var currentScope = $("#flagMessage").html();
    var objPos = $("#messageId").attr('value');
    if (currentScope=="Unflag") {
        var formData = new FormData();
        formData.append('action','unflag');
        formData.append('affectedID', $("#messageId").html());
        fetch('php/insertfrommessages.php', {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                if (data=="success") {
                    adminInfo[5][objPos][6] = 0;
                    Swal.fire('Unflagged!', 'The message has been unflagged!', 'success');
                    messageQuery();
                } else {
                    Swal.fire('Error!', 'An unexpected error has appeared!', 'error');
                }
            });
        $("#flagMessage").html("Flag");
    } else {
        var formData = new FormData();
        formData.append('action','flag');
        formData.append('affectedID', $("#messageId").html());
        fetch('php/insertfrommessages.php', {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                if (data=="success") {
                    adminInfo[5][objPos][6] = 1;
                    Swal.fire('Flagged!', 'The message has been flagged!', 'success');
                    messageQuery();
                } else {
                    Swal.fire('Error!', 'An unexpected error has appeared!', 'error');
                }
            });
        $("#flagMessage").html("Unflag");
    }
});

$("body").on("click", "#showHidden", function() { 
    var currentScope = $("#showHidden").css("background-color");
    if (currentScope == "rgba(0, 0, 0, 0)") {
        // Show the hidden ones
        $("#showHidden").css("background-color","#ff6e00");
        showHidden = 1;
        messageQuery();
    } else {
        // Don't show the hidden ones
        $("#showHidden").css("background-color","rgba(0, 0, 0, 0)");
        showHidden = 0;
        messageQuery();
    }
});

$("body").on("click", "#showUnseen", function() { 
    var currentScope = $("#showUnseen").css("background-color");
    if (currentScope == "rgba(0, 0, 0, 0)") {
        // Show the unseen ones
        $("#showUnseen").css("background-color","#ff6e00");
        showUnseen = 1;
        messageQuery();
    } else {
        // Show all the ones
        $("#showUnseen").css("background-color","rgba(0, 0, 0, 0)");
        showUnseen = 0;
        messageQuery();
    }
});

$("body").on("click", "#showFlagged", function() { 
    var currentScope = $("#showFlagged").css("background-color");
    if (currentScope == "rgba(0, 0, 0, 0)") {
        // Show the flagged ones
        $("#showFlagged").css("background-color","#ff6e00");
        showFlagged = 1;
        messageQuery();
    } else {
        // Show all the ones
        $("#showFlagged").css("background-color","rgba(0, 0, 0, 0)");
        showFlagged = 0;
        messageQuery();
    }
});

$("body").on("click", "#submitComment", function() { 
    var commentMessageAso = $("#commentMessageAso").val();
    var commentText = $("#commentText").val();

    var formData = new FormData();
        formData.append('message',commentMessageAso);
        formData.append('comment', commentText);
        fetch('php/insertcomment.php', {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                if (data=="success") {
                    Swal.fire('Sent!', 'The comment has been sent!', 'success').then((result) => {
                        if(result.isConfirmed) {
                            location.reload();
                        }
                    });
                } else {
                    console.log(data);
                    Swal.fire('Error!', 'An unexpected error has appeared!', 'error');
                }
            });
});

// For loading user logs
$("body").on("keypress focusout", "#userPicker", function() {
    var selectedUser = $("#selectUser .es-list .es-visible");
    var fillUserLogs = "";
    if ($("#userLogs").html() == "") {
        if (selectedUser.length == 1) {
            $("#userLogs").hide();
            var userPosition = selectedUser[0].value;
            // FILL LOGS HERE
            for (var i=0;i<adminInfo[4].length;i++) {
                if (adminInfo[4][i][1] == adminInfo[7][userPosition][0]) {
                    fillUserLogs += "<div class='row'><div class='rowTitle'>"+adminInfo[4][i][1]+"</div><div class='rowText'>"+adminInfo[4][i][2]+"</div><div class='rowFooter'>"+adminInfo[4][i][4]+"</div></div>";
                }
            }
            if (fillUserLogs == "") {
                fillUserLogs += "This user has no logs.";
            }
        }
        $("#userLogs").html(fillUserLogs);
        $("#userLogs").fadeIn();
    } else {
        $("#userLogs").fadeOut(function() {
            if (selectedUser.length == 1) {
                var userPosition = selectedUser[0].value;
                // FILL LOGS HERE
                for (var i=0;i<adminInfo[4].length;i++) {
                    if (adminInfo[4][i][1] == adminInfo[7][userPosition][0]) {
                        fillUserLogs += "<div class='row'><div class='rowTitle'>"+adminInfo[4][i][1]+"</div><div class='rowText'>"+adminInfo[4][i][2]+"</div><div class='rowFooter'>"+adminInfo[4][i][4]+"</div></div>";
                    }
                }
                if (fillUserLogs == "") {
                    fillUserLogs += "This user has no logs.";
                }
            }
            $("#userLogs").html(fillUserLogs);
            $("#userLogs").fadeIn();
        });
    }
    
})

// When MODIFY DATA is pressed on user part of page

$("body").on("click", "#modifyUser", function() {
    $("#infocentreInner").fadeOut(function() {
        var selectedUser = $("#selectUser .es-list .es-visible");
        if (selectedUser.length == 1) {
            var userPosition = selectedUser[0].value;
            adminInfo[7][userPosition][0]
            $("#userExists").val("yes");
            $("#userEmail").val(adminInfo[7][userPosition][0]);
            $("#userEmail").prop("readonly",true);
            $("#userPasswd").hide();
            if (adminInfo[7][userPosition][1] == 1) {
                $("#adminPriv").prop('checked',true);
            } else {
                $("#adminPriv").prop('checked',false);
            }
            if (adminInfo[7][userPosition][2] == 1) {
                $("#superadminPriv").prop('checked',true);
            } else {
                $("#superadminPriv").prop('checked',false);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'You need to choose an user before doing this!',
            })
        }
        $("#infocentreInner").fadeIn();
    });
})

// When the reset button is pressed in user

$("body").on("click","#resetUser", function() {

    $("#infocentreInner").fadeOut(function() {
        $("#userPasswd").show();
        $("#userEmail").prop("readonly",false);

        $("#userEmail").val("");
        $("#userPasswd").val("");
        $("#adminPriv").prop('checked',false);
        $("#superadminPriv").prop('checked',false);
        $("#userExists").val("no");

        $("#infocentreInner").fadeIn();
    });
})


// Delete User on click

$("body").on("click", "#deleteUser", function() { 
    var selectedUser = $("#selectUser .es-list .es-visible");
    if (selectedUser.length == 1) { 
        var userPosition = selectedUser[0].value;
        var userToDelete = [adminInfo[7][userPosition][0]];
        // sending query to php
        Swal.fire({
            title: "Careful!",
            icon: "warning",
            text: "This action is irreversible, do you wish to continue?",
            showCancelButton: true
        }).then((result) => {
            if(result.isConfirmed) {
                var formData = new FormData();
                formData.append('action','user');
                formData.append('affObject', JSON.stringify(userToDelete));
                fetch('php/deletefromadmin.php', {
                    method: "POST",
                    body: formData
                })
                    .then(response => response.text())
                    .then(data => {
                        if(data=="success") {
                        Swal.fire('Deleted!', 'The User has been deleted!', 'success').then((result) => {
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
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'You need to choose an user before doing this!',
          })
    }
});

$("body").on("click", ".messageMain", function() {
    $("#infoleftInner").fadeOut();
    $("#infocentreInner").fadeOut();
    var id = $(this).attr('value');
    $("#inforightInner").fadeOut(function() {
        fillWithDataAdmin("message");
        loadMessage(id);
        $("#infoleftInner").fadeIn();
        $("#infocentreInner").fadeIn();
        $("#inforightInner").fadeIn();
    });
});

// Allows the dragging of the command prompt
dragElement(document.getElementById("consoleDiv"));
// Make console invisible at the beginning
$("#consoleDiv").toggle();
// Make console toggle on click
$("#console").click(function(){
    $("#consoleDiv").fadeToggle(500);
    $("#consoleInput").focus();
    $("#consoleInput").val("");
});
$("#reddot").click(function(){
    $("#consoleDiv").fadeToggle(500);
});

 // Command needed to recognize Enter key on command prompt
 document.getElementById('consoleInput').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode == 'Enter'){
        var inputValue = $("#consoleInput").val().split(" ");
        var wordValue = inputValue[0];
        // SWITCH for the console inputs
        switch (wordValue.toLowerCase()) {
            // Command CLR clears the command
            case "clr":
                $("#textArea").html("");
                break;
            // Command PERFORMTEST to perform a system-wide test
            case "performtest":
                // Separate PERFORMTEST into different tests.
                $("#textArea").append("> " + $("#consoleInput").val() + "<br>");
                var performTestText = $("#consoleInput").val();
                if (performTestText.length > 12) {
                    var testType = $("#consoleInput").val().substring(12);
                    switch (testType) {
                        case "stellar":
                        case "messages":
                        case "comments":
                        case "users":
                        case "logs":
                        case "full":
                            var formData = new FormData();
                            formData.append('type', testType);
                            fetch('php/test.php', {
                                method: "POST",
                                body: formData
                            })
                                .then(response => response.text())
                                .then(data => {
                                    if (data="success"){
                                        $("#textArea").append("<span class='yellowall'>"+testType+" test has been successful, no errors found.</span><br>");
                                    } else {
                                        $("#textArea").append("<span class='redall'>"+testType+" test has failed, check the console for more information.</span><br>");
                                        console.log(data);
                                    }
                                });
                            break;
                        case "help":
                            $("#textArea").append("<span class='yellowall'>Does a system-wide test, possible parameters:<br>- stellar: Performs a test on stellar objects<br>- messages: Performs a test on messages<br>- comments: Performs a test on comments<br>- users: Performs a test on users<br>- logs: Performs a test on logs<br>- full: Performs a complete test</span><br>");
                            break;
                        default:
                            $("#textArea").append("<span class='redall'>Invalid use of command!</span><br>");
                            break;
                    }
                } else {
                    var formData = new FormData();
                    formData.append('type', "full");
                    fetch('php/test.php', {
                        method: "POST",
                        body: formData
                    })
                        .then(response => response.text())
                        .then(data => {
                            if (data="success"){
                                $("#textArea").append("<span class='yellowall'>full test has been successful, no errors found.</span><br>");
                            } else {
                                $("#textArea").append("<span class='redall'>full test has failed, check the console for more information.</span><br>");
                                console.log(data);
                            }
                        });
                }
                break;
            // Command HELP gives help
            case "help":
                $("#textArea").append("> " + $("#consoleInput").val() + "<br>");
                $("#textArea").append("<span class='yellowall'>The following commands are available to choose from:</span><br>- clr: Clears the console<br>- performtest: Performs a system-wide test<br>");
                break;
            // Any other command does not exist
            default:
                $("#textArea").append("> " + $("#consoleInput").val() + "<br>");
                $("#textArea").append("<span class='redall'>Such command does not exist!</span><br>");
                break;
        }
        //$("#textarea").scrollTop($('#textarea').prop("scrollHeight"));
        $("#consoleInput").val("");
        $('#textArea').animate({scrollTop: 9999});
    }
}