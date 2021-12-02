$("#loading").delay(1000).fadeOut(1000);
$("#content").delay(1000).queue(function(){
    $("#content").removeClass('invis');
});

