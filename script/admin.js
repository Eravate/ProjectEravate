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