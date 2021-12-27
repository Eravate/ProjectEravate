<?php
//ini_set('display_errors',0);
session_start();
if (isset($_POST['action'])) {
  session_destroy();
}
if (isset($_SESSION['user'])) {
  header("Location: index.php");
}
if (isset($_SESSION['admin'])) {
  header("Location: admin.php");
}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="icons/logo.png"/>
    <link rel="stylesheet" type="text/css" href="css/login.css" />
    <link rel="stylesheet" href="css/materialize.min.css">
    <link rel="stylesheet" type="text/css" href="css/dark.css">
    <link rel="stylesheet" type="text/css" href="css/swup.css"/>

    <script src="script/materialize.min.js"></script>
    
    <script src="script/jquery.js"></script>
    <script src="script/commands.js"></script>
    <script src="script/sweetalert2.min.js"></script>
    <script defer src="script/three.min.js"></script>
    <script defer src="script/postprocessing.min.js"></script>
    <script defer src="script/clouds.js">// all the script for loading the clouds is included there!</script>
    <script defer src="script/loginstart.js"></script>

    <script src="script/cookieconsent.min.js" defer></script><script>window.addEventListener("load",function(){window.wpcc.init({"border":"thin","corners":"small","colors":{"popup":{"background":"#ffe4e1","text":"#000000","border":"#c25e5e"},"button":{"background":"#c25e5e","text":"#ffffff"}},"position":"bottom","content":{"href":"https://eravate.es/cookiepolicy.php"}})});</script>

    <title>Eravate Project</title>

  </head>
  <body class="loader">
    <iframe id="loading" src="loader.php" name="targetframe" allowTransparency="true" scrolling="no" frameborder="0" ></iframe>
    <main id="content">
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
              <div class="forgotPass"><a href="" onclick="event.preventDefault(); forgotPassword();">Forgot password?</a></div>
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
  <script src="script/login.js"></script>
</html>