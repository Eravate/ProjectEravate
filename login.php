<?php
//ini_set('display_errors',0);
session_start();
if (isset($_POST['action'])) {
  session_destroy();
}
if (isset($_SESSION['user'])) {
  header("Location: index.php");
}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" type="text/css" href="css/login.css" />
    <link rel="icon" type="image/png" href="icons/logo.png"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <title>Eravate Project</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="script/jquery.js"></script>
    <script src="script/commands.js"></script>
    <link rel="stylesheet" type="text/css" href="css/dark.css">
    <script src="script/sweetalert2.min.js"></script>
  </head>
  <body>
    <main>
      <div class="login-div">
        <div class="row">
          <div class="logo" id="logo"></div>
        </div>
        <div class="row center-align">
          <h5>Sign in</h5>
        </div>
        <form id="formLogin" class="col s12" action='#' onsubmit="submitLogin();return false">
          <div class="row">
            <div class="input-field col s12">
              <input id="type_input" type="hidden" value="login">
              <input id="email_input" type="email" class="validate" required="" aria-required="true">
              <label for="email_input">Email</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="password_input" type="password" class="validate" required="" aria-required="true">
              <label for="password_input">Password</label>
              <div class="forgotPass"><a href="#">Forgot password?</a></div>
            </div>
          </div>
          <div class="row"></div>
          <div class="row">
            <div class="col s6"><a href="#" onclick="changeLoginScope(false)">Create account</a></div>
            <div class="col s6 right-align"><button class="waves-effect waves-light btn" type="submit" name="login">Login</button></div>
          </div>
        </form>
      </div>
    </main>
  </body>
  <script src="script/three.min.js"></script>
    <script src="script/postprocessing.min.js"></script>
    <script src="script/clouds.js">// all the script for loading the clouds is included there!</script>
    <script>
      // Make div disappear for screenshot capture ;)
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
    </script>
</html>
