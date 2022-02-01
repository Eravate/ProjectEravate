$("#loading").delay(1000).fadeOut(1000);
$("#content").css("display","flex").hide().fadeIn(1000, function(){
    initClouds();
});