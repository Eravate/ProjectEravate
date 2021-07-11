 // Command needed to recognize Enter key
 document.getElementById('consoleInput').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode == 'Enter'){
        $("#textArea").append($("#consoleInput").val() + "<br>");
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
    setTimeout(clearTextArea,500);
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
// Make left arrow disappear when there are no more planets
$("#arrowleft").click(function() {
    numPlanet--;
    if (numPlanet==0) {
        $("#arrowleft").toggle();
    }
    if (numPlanet==7) {
        $("#arrowright").toggle();
    }

    var layerClass = ".top-layer";
    var layers = document.querySelectorAll(layerClass);
    for (const layer of layers) {
        layer.classList.toggle("active");
    }
    sfx.play();
    setTimeout(fillWithPlanet,500);
});
// Make right arrow disappear when there are no more planets
$("#arrowright").click(function() {
    numPlanet++;
    if (numPlanet==1) {
        $("#arrowleft").toggle();
    }
    if (numPlanet==8) {
        $("#arrowright").toggle();
    }

    var layerClass = ".top-layer";
    var layers = document.querySelectorAll(layerClass);
    for (const layer of layers) {
        layer.classList.toggle("active");
    }
    sfx.play();
    setTimeout(fillWithPlanet,500);
});
waitForPlanets();