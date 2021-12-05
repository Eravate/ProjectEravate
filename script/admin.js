waitForAdmin();

$("#pagetitle").click(function() {
    fillWithDataAdmin("home");
});

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

$("body").on("click", "#modifyStar", function() {
    var selectedStar = document.getElementsByClassName("es-visible");
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

$("body").on("click", "#resetStar", function() {
    $("#starExists").val("no");
    $("#starSubmitTitle").html("Add New Star");
})

$("body").on("keypress focusout", ".planetPicker", function() {
    var selectedStar = document.getElementsByClassName("es-visible");
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

$("body").on("click", "#modifyPlanet", function() {
    var selectedValue = $("#selectPlanet").val();
    if (selectedValue == "no") {
        Swal.fire({
            icon: 'error',
            title: 'You need to choose a planet before doing this!',
          })
    } else {
        $("#planetExists").val(adminInfo[1][selectedValue][1]);
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
        //$("#starType").val(adminInfo[0][selectedValue][15]);
        $("#planetSubmitTitle").html("Modify Planet");
    }
})

$("body").on("click", "#resetPlanet", function() {
    $("#planetExists").val("no");
    $("#planetSubmitTitle").html("Add New Planet");
})

$("body").on("keypress focusout", ".npoPicker", function() {
    var selectedStar = document.getElementsByClassName("es-visible");
    var fillSelectWithPlanets = "";
    if (selectedStar.length == 1) {
        var starPosition = selectedStar[0].value;
        for (var i=0;i<adminInfo[2].length;i++) {
            if (adminInfo[2][i][1] == adminInfo[0][starPosition][0]) {
                fillSelectWithPlanets += "<option value='"+i+"'>"+adminInfo[2][i][2]+"</option>"; 
            }
        }
    } else {
        fillSelectWithPlanets = "<option value='no'>Select A Star</option>";
    }
    $("#selectPlanet").html(fillSelectWithPlanets);
})

$("body").on("click", "#modifyNPO", function() {
    var selectedValue = $("#selectNPO").val();
    if (selectedValue == "no") {
        Swal.fire({
            icon: 'error',
            title: 'You need to choose a npo before doing this!',
          })
    } else {
        $("#npoExists").val(adminInfo[1][selectedValue][1]);
        $("#npoName").val(adminInfo[1][selectedValue][2]);
        $("#npoPosition").val(adminInfo[1][selectedValue][3]);
        $("#npoRotation").val(adminInfo[1][selectedValue][4]);
        $("#npoRevolution").val(adminInfo[1][selectedValue][5]);
        $("#npoRadius").val(adminInfo[1][selectedValue][6]);
        $("#npoTemperature").val(adminInfo[1][selectedValue][7]);
        $("#npoOverview").val(adminInfo[1][selectedValue][8]);
        $("#npoOverviewSource").val(adminInfo[1][selectedValue][9]);
        $("#npoOverviewUrl").val(adminInfo[1][selectedValue][10]);
        $("#npoInternal").val(adminInfo[1][selectedValue][11]);
        $("#npoInternalSource").val(adminInfo[1][selectedValue][12]);
        $("#npoInternalUrl").val(adminInfo[1][selectedValue][13]);
        $("#npoSurface").val(adminInfo[1][selectedValue][14]);
        $("#npoPlanetSurface").val(adminInfo[1][selectedValue][15]);
        $("#npoSurfaceUrl").val(adminInfo[1][selectedValue][16]);

        //$("#starType").val(adminInfo[0][selectedValue][15]);
        $("#npoSubmitTitle").html("Modify NPO");
    }
})

$("body").on("click", "#resetNPO", function() {
    $("#npoExists").val("no");
    $("#npoSubmitTitle").html("Add New NPO");
})