 // Command needed to recognize Enter key on command prompt
 document.getElementById('consoleInput').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode == 'Enter'){
        var inputValue = $("#consoleInput").val().split(" ");
        var wordValue = inputValue[0];
        switch (wordValue.toLowerCase()) {
            case "clr":
                $("#textArea").html("");
                break;
            case "goto":
                // Separate GOTO into two different searches: an easy one (inside actual array) and an extensive one (outside actual array) if the easy one fails.
                $("#textArea").append("> " + $("#consoleInput").val() + "<br>");
                var location = $("#consoleInput").val().substring(5);
                var found = false;
                // FOR searching easy way inside actual array
                for (var pos=0;pos<objects.length;pos++) {
                    if (objects[pos][1].toLowerCase()==location.toLowerCase()) {
                        found = true;
                        numObject = pos;
                        setTimeout(fillWithPlanet,500);
                        var layerClass = ".top-layer";
                        var layers = document.querySelectorAll(layerClass);
                        for (const layer of layers) {
                            layer.classList.toggle("active");
                        }
                        sfx.play();
                    }
                }
                // IF not found, extensive search on the database (v complex)
                if (!found) {
                    
                }
                break;
            case "help":
                $("#textArea").append("> " + $("#consoleInput").val() + "<br>");
                $("#textArea").append("The following commands are available to choose from:<br>- clr: Clears the console<br>- goto: Goes to specified object<br>");
                break;
            default:
                $("#textArea").append("> " + $("#consoleInput").val() + "<br>");
                $("#textArea").append("Such command does not exist!<br>");
                break;
        }
        $("#consoleInput").val("");
    }
}
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
})
// Make menu and info disappear on click
$('#see').click(function(){
    $('#navbar').fadeOut(500);
    $('#infoleft').fadeOut(500);
    $('#inforight').fadeOut(500);
    $('#goleft').fadeOut(500);
    $('#goright').fadeOut(500);
    $('#music').fadeOut(500);
    audio.play();
    vis = true;
});
// Make menu and info come back after mouse moves
$(document).mousemove(function(){
    if (vis) {
        $('#navbar').fadeIn(500);
        $('#infoleft').fadeIn(500);
        $('#inforight').fadeIn(500);
        $('#goleft').fadeIn(500);
        $('#goright').fadeIn(500);
        $('#music').fadeIn(500);
        vis = false;
        audio.pause();
        audio.currentTime = 0;
    }
});

// Function to check if arrows should disappear
function checkForArrows(){
    if (numObject==0) {
        $("#arrowleft").toggle();
        hiddenLeft = true;
    }
    if (numObject!=0 && hiddenLeft) {
        $("#arrowleft").toggle();
        hiddenLeft = false;
    }

    if (numObject==(objects.length-1)) {
        $("#arrowright").toggle();
        hiddenRight = true;
    }
    if (numObject!=(objects.length-1) && hiddenRight) {
        $("#arrowright").toggle();
        hiddenRight = false;
    }
}

// Make left arrow disappear when there are no more objects
$("#arrowleft").click(function() {
    numObject--;
    //checkForArrows();
    setTimeout(fillWithPlanet,500);
    var layerClass = ".top-layer";
    var layers = document.querySelectorAll(layerClass);
    for (const layer of layers) {
        layer.classList.toggle("active");
    }
    sfx.play();
});
// Make right arrow disappear when there are no more objects
$("#arrowright").click(function() {
    numObject++;
    //checkForArrows();
    setTimeout(fillWithPlanet,500);
    var layerClass = ".top-layer";
    var layers = document.querySelectorAll(layerClass);
    for (const layer of layers) {
        layer.classList.toggle("active");
    }
    sfx.play();
});



// Commands regarding on-click events

$("#overview").click(function(){
    $("#txt").fadeOut(function(){
        $("#txt").html(objects[numObject][6]).fadeIn();
    });
    $("#source").fadeOut(function(){
        $("#source").html('Source: &nbsp; <a href=\''+objects[numObject][8]+'\'>'+objects[numObject][7]+'</a>').fadeIn();
    });
});
$("#internal").click(function(){
    $("#txt").fadeOut(function(){
        $("#txt").html(objects[numObject][9]).fadeIn();
    });
    $("#source").fadeOut(function(){
        $("#source").html('Source: &nbsp; <a href=\''+objects[numObject][11]+'\'>'+objects[numObject][10]+'</a>').fadeIn();
    });
});
$("#surface").click(function(){
    $("#txt").fadeOut(function(){
        $("#txt").html(objects[numObject][12]).fadeIn();
    });
    $("#source").fadeOut(function(){
        $("#source").html('Source: &nbsp; <a href=\''+objects[numObject][14]+'\'>'+objects[numObject][13]+'</a>').fadeIn();
    });
});
  


waitForObjects();