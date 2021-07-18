// Make div disappear for screenshot capture ;)
var vis;
$('#logo').click(function(){
    $('.login-div').fadeOut(500);
    vis = true;
  });
  // And make it appear with a mouse move event
  $(document).mousemove(function(){
    if (vis) {
        $('.login-div').fadeIn(500);
        vis = false;
    }
    });