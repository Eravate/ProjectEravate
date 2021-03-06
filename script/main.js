
 // Command needed to recognize Enter key on command prompt
 document.getElementById('consoleInput').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode == 'Enter'){
        var inputValue = $("#consoleInput").val().split(" ");
        var wordValue = inputValue[0];
        var type = inputValue[1];
        if (typeof type == "undefined") {
            type = '';
        }
        // SWITCH for the console inputs
        switch (wordValue.toLowerCase()) {
            // Command CLR clears the command
            case "clr":
                if (type.toLowerCase()=='help') {
                    $("#textArea").append("> " + $("#consoleInput").val() + "<br>");
                    $("#textArea").append("<span class='yellowall'>The CLR commands resets the console.<br>");
                } else { 
                    $("#textArea").html("");
                }
                break;
            // Command GOTO goes to a specific object
            case "goto":
                if (type.toLowerCase()=='help') {
                    $("#textArea").append("> " + $("#consoleInput").val() + "<br>");
                    $("#textArea").append("<span class='yellowall'>The GOTO commands allows you to move to a different solar system, or a system object directly.<br>");
                } else {
                    // Separate GOTO into two different searches: an easy one (inside actual array) and an extensive one (outside actual array) if the easy one fails.
                    $("#textArea").append("> " + $("#consoleInput").val() + "<br>");
                    var location = $("#consoleInput").val().substring(5);
                    var found = false;
                    var objectsTemp;
                    // FOR searching easy way inside actual array
                    for (var pos=0;pos<objects.length;pos++) {
                        // Needed to check if object has a moon, I know, this is getting complicating...
                        if (Array.isArray(objects[pos][0])) {
                            for (var posInn=0;posInn<objects[pos].length;posInn++) {
                                if (objects[pos][posInn][1].toLowerCase()==location.toLowerCase()) {
                                    found = true;
                                    $("#textArea").append("<span class='yellowall'>Going to object...</span><br>");
                                    numObject = pos;
                                    numSat = posInn;
                                    setTimeout(fillWithPlanet,500);
                                    var layerClass = ".top-layer";
                                    var layers = document.querySelectorAll(layerClass);
                                    for (const layer of layers) {
                                        layer.classList.toggle("active");
                                    }
                                    sfx.play();
                                }
                            }
                        } else {
                            if (objects[pos][1].toLowerCase()==location.toLowerCase()) {
                                found = true;
                                $("#textArea").append("<span class='yellowall'>Going to object...</span><br>");
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
                        
                    }
                    // IF not found, extensive search on the database (v complex), Sometimes I even wonder how I fucking wrote it
                    if (!found) {
                        var formData = new FormData();
                        formData.append('location', location);
                        fetch('php/advancedsearch.php', {
                            method: "POST",
                            body: formData
                        })
                            .then(response => response.text())
                            .then(data => {
                                objectsTemp = JSON.parse(data);
                            });
                        // Function to wait for the results of Advanced Search
                        function waitForAdvSearch(){
                            if(typeof objectsTemp !== "undefined") {
                                switch (objectsTemp) {
                                    case 1:
                                        $("#textArea").append("<span class='redall'>This object does not exists!</span><br>");
                                        break;
                                    case 2:
                                        $("#textArea").append("<span class='redall'>There has been an internal error!</span><br>");
                                        break;
                                    default:
                                        numSat = 0;
                                        objects = objectsTemp;
                                        for (var pos=0;pos<objects.length;pos++) {
                                            // Needed to check if object has a moon, I know, this is getting complicating...
                                            if (Array.isArray(objects[pos][0])) {
                                                for (var posInn=0;posInn<objects[pos].length;posInn++) {
                                                    if (objects[pos][posInn][1].toLowerCase()==location.toLowerCase()) {
                                                        found = true;
                                                        $("#textArea").append("<span class='yellowall'>Going to object...</span><br>");
                                                        numObject = pos;
                                                        numSat = posInn;
                                                        setTimeout(fillWithPlanet,500);
                                                        var layerClass = ".top-layer";
                                                        var layers = document.querySelectorAll(layerClass);
                                                        for (const layer of layers) {
                                                            layer.classList.toggle("active");
                                                        }
                                                        sfx.play();
                                                    }
                                                }
                                            } else {
                                                if (objects[pos][1].toLowerCase()==location.toLowerCase()) {
                                                    found = true;
                                                    $("#textArea").append("<span class='yellowall'>Going to object...</span><br>");
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
                                        }
                                        break;
                                }
                            } else {
                                setTimeout(waitForAdvSearch, 250);
                            }
                        }
                        waitForAdvSearch();
                    }
                }
                break;
            // LS, also known as List Systems
            case "ls":
                if (type.toLowerCase()=='help') {
                    $("#textArea").append("> " + $("#consoleInput").val() + "<br>");
                    $("#textArea").append("<span class='yellowall'>The LS command lists all of the solar systems currently available, handed in pages of 10 at a time.<br>");
                } else {
                    $("#textArea").append("> " + $("#consoleInput").val() + "<br>");
                    var formData = new FormData();
                    fetch('php/localizeSystem.php', {
                        method: "POST",
                        body: formData
                    })
                        .then(response => response.text())
                        .then(data => {
                            objectsTemp = JSON.parse(data);
                        });
                    function waitForLocalize(){
                        if(typeof objectsTemp !== "undefined") {
                            switch (objectsTemp) {
                                case 1:
                                    $("#textArea").append("<span class='redall'>There aren't any star systems!</span><br>");
                                    break;
                                default:
                                    // If a page number was specified
                                    if( type != '' && typeof Number(type) === 'number') {
                                        if (Number(type) > Math.ceil(objectsTemp.length/10)) {
                                            $("#textArea").append("<span class='redall'>The page you specified does not exists!</span><br>");
                                        } else {
                                            if (objectsTemp.length>10) {
                                                $("#textArea").append("<span class='yellowall'>Showing page "+Number(type)+" out of "+Math.ceil(objectsTemp.length/10)+"</span><br>");
                                                var startingPos = Number(type)*10-10;
                                                var endingPos = 0;
                                                if (Number(type)==Math.ceil(objectsTemp.length/10)) {
                                                    endingPos = objectsTemp.length;
                                                } else {
                                                    endingPos = Number(type)*10-1;
                                                }
                                                for (var pos=startingPos;pos<endingPos;pos++) {
                                                    $("#textArea").append("- "+objectsTemp[pos]+"<br>");
                                                }
                                            } else {
                                                $("#textArea").append("<span class='yellowall'>The following systems are available:</span><br>");
                                                for (var pos=0;pos<objectsTemp.length;pos++) {
                                                    $("#textArea").append("- "+objectsTemp[pos]+"<br>");
                                                }
                                            }
                                        }
                                        // If a page number wasn't specified
                                    } else {
                                        if (objectsTemp.length>10) {
                                            $("#textArea").append("<span class='yellowall'>Showing page 1 out of "+Math.ceil(objectsTemp.length/10)+"</span><br>");
                                            for (var pos=0;pos<10;pos++) {
                                                $("#textArea").append("- "+objectsTemp[pos]+"<br>");
                                            }
                                        } else {
                                            $("#textArea").append("<span class='yellowall'>The following systems are available:</span><br>");
                                            for (var pos=0;pos<objectsTemp.length;pos++) {
                                                $("#textArea").append("- "+objectsTemp[pos]+"<br>");
                                            }
                                        }
                                    }
                                    break;
                            }
                        } else {
                            setTimeout(waitForLocalize, 250);
                        }
                    }
                    waitForLocalize();
                } 
                break;
            // Command HELP gives help
            case "help":
                $("#textArea").append("> " + $("#consoleInput").val() + "<br>");
                $("#textArea").append("<span class='yellowall'>The following commands are available to choose from:</span><br>- clr: Clears the console.<br>- goto: Goes to specified object.<br>- ls: Shows objects that are available to explore.<br>");
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
/* Make menu and info disappear on click
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
});*/

// Function to check if arrows should disappear
function checkForArrows(){
    // LEFT
    if (numObject==0) {
        $("#arrowleft").hide();
        hiddenLeft = true;
    }
    if (numObject!=0 && hiddenLeft) {
        $("#arrowleft").show();
        hiddenLeft = false;
    }
    // RIGHT
    if (numObject==(objects.length-1)) {
        $("#arrowright").hide();
        hiddenRight = true;
    }
    if (numObject!=(objects.length-1) && hiddenRight) {
        $("#arrowright").show();
        hiddenRight = false;
    }
    // UP
    if (numSat==0) {
        $("#arrowup").hide();
        hiddenUp = true;
    }
    if (numSat!=0 && hiddenUp) {
        $("#arrowup").show();
        hiddenUp = false;
    }
    // DOWN
    if (Array.isArray(objects[numObject][0])) {
        if (numSat==(objects[numObject].length-1)) {
            $("#arrowdown").hide();
            hiddenDown = true;
        }
        if (numSat!=(objects[numObject].length-1) && hiddenDown) {
            $("#arrowdown").show();
            hiddenDown = false;
        }
    } else {
            $("#arrowdown").hide();
            hiddenDown = true;
    }
    
}

// Make left arrow disappear when there are no more objects
$("#arrowleft").click(function() {
    if (!clickDisabledLeft) {
        clickDisabledLeft = true;
        numSat = 0;
        numObject--;
        //checkForArrows();
        setTimeout(fillWithPlanet,500);
        var layerClass = ".top-layer";
        var layers = document.querySelectorAll(layerClass);
        for (const layer of layers) {
            layer.classList.toggle("active");
        }
        sfx.play();
    }
    setTimeout(function(){clickDisabledLeft = false;}, 1500);
});
// Make right arrow disappear when there are no more objects
$("#arrowright").click(function() {
    if (!clickDisabledRight) {
        clickDisabledRight = true;
        numSat = 0;
        numObject++;
        //checkForArrows();
        setTimeout(fillWithPlanet,500);
        var layerClass = ".top-layer";
        var layers = document.querySelectorAll(layerClass);
        for (const layer of layers) {
            layer.classList.toggle("active");
        }
        sfx.play();
    }
    setTimeout(function(){clickDisabledRight = false;}, 1500);
});
$("#arrowup").click(function() {
    if (!clickDisabledTop) {
        clickDisabledTop = true;
        numSat--;
        //checkForArrows();
        setTimeout(fillWithPlanet,500);
        var layerClass = ".top-layer";
        var layers = document.querySelectorAll(layerClass);
        for (const layer of layers) {
            layer.classList.toggle("active");
        }
        sfx.play();
    }
    setTimeout(function(){clickDisabledTop = false;}, 1500);
});
$("#arrowdown").click(function() {
    if (!clickDisabledBottom) {
        clickDisabledBottom = true;
        numSat++;
        //checkForArrows();
        setTimeout(fillWithPlanet,500);
        var layerClass = ".top-layer";
        var layers = document.querySelectorAll(layerClass);
        for (const layer of layers) {
            layer.classList.toggle("active");
        }
        sfx.play();
    }
    setTimeout(function(){clickDisabledBottom = false;}, 1500);
});


// Commands regarding on-click events

$("#overview").click(function(){
    $("#txt").fadeOut(function(){
        if (Array.isArray(objects[numObject][numSat])) {
            $("#txt").html(objects[numObject][numSat][6]).fadeIn();
        } else {
            $("#txt").html(objects[numObject][6]).fadeIn();
        }
    });
    $("#source").fadeOut(function(){
        if (Array.isArray(objects[numObject][0])) {
            $("#source").html('Source: &nbsp; <a href=\''+objects[numObject][numSat][8]+'\'>'+objects[numObject][numSat][7]+'</a>').fadeIn();
        } else {
            $("#source").html('Source: &nbsp; <a href=\''+objects[numObject][8]+'\'>'+objects[numObject][7]+'</a>').fadeIn();
        }
    });
});
$("#internal").click(function(){
    $("#txt").fadeOut(function(){
        if (Array.isArray(objects[numObject][numSat])) {
            $("#txt").html(objects[numObject][numSat][9]).fadeIn();
        } else {
            $("#txt").html(objects[numObject][9]).fadeIn();
        }
    });
    $("#source").fadeOut(function(){
        if (Array.isArray(objects[numObject][0])) {
            $("#source").html('Source: &nbsp; <a href=\''+objects[numObject][numSat][11]+'\'>'+objects[numObject][numSat][10]+'</a>').fadeIn();
        } else {
            $("#source").html('Source: &nbsp; <a href=\''+objects[numObject][11]+'\'>'+objects[numObject][10]+'</a>').fadeIn(); 
        }
    });
});
$("#surface").click(function(){
    $("#txt").fadeOut(function(){
        if (Array.isArray(objects[numObject][numSat])) {
            $("#txt").html(objects[numObject][numSat][12]).fadeIn();
        } else {
            $("#txt").html(objects[numObject][12]).fadeIn();
        }
    });
    $("#source").fadeOut(function(){
        if (Array.isArray(objects[numObject][numSat])) {
            $("#source").html('Source: &nbsp; <a href=\''+objects[numObject][numSat][14]+'\'>'+objects[numObject][numSat][13]+'</a>').fadeIn();
        } else {
            $("#source").html('Source: &nbsp; <a href=\''+objects[numObject][14]+'\'>'+objects[numObject][13]+'</a>').fadeIn();
        }
    });
});
waitForObjects();

$("#continueIndex").click(function(){
    $("#infoScreen").fadeOut(1000);
    if($("#dnsagain").is(":checked")){
        setCookie('dnsagain','true',365);
    }
});