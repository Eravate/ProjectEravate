$("#loading").delay(1000).fadeOut(1000);
$("#content").delay(1000).queue(function(){
    $("#content").removeClass('invis');
});

if(getCookie('dnsagain')=='true') {
    $("#infoScreen").hide();
} else {
    $("#infoContent").hide().delay(2000).fadeIn(1000);
}

