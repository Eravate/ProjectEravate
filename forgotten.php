<?php
//ini_set('display_errors',0);
session_start();
//if (isset($_POST['action'])) {
//  session_destroy();
//}
//if (isset($_SESSION['user'])) {
//  header("Location: index.php");
//}
//if (isset($_SESSION['admin'])) {
//  header("Location: admin.php");
//}
$_SESSION['restoken'] = $_GET['restoken'];
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="icons/logo.png"/>
    <link rel="stylesheet" type="text/css" href="css/login.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" type="text/css" href="css/dark.css">
    <link rel="stylesheet" type="text/css" href="css/swup.css"/>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    
    <script src="script/jquery.js"></script>
    <script src="script/commands.js"></script>
    <script src="script/sweetalert2.min.js"></script>
    <script defer src="script/three.min.js"></script>
    <script defer src="script/postprocessing.min.js"></script>
    <script defer src="script/clouds.js">// all the script for loading the clouds is included there!</script>
    <script defer src="script/loginstart.js"></script>

    <script src="https://cdn.websitepolicies.io/lib/cookieconsent/1.0.3/cookieconsent.min.js" defer></script><script>window.addEventListener("load",function(){window.wpcc.init({"border":"thin","corners":"small","colors":{"popup":{"background":"#ffe4e1","text":"#000000","border":"#c25e5e"},"button":{"background":"#c25e5e","text":"#ffffff"}},"position":"bottom","content":{"href":"https://eravate.es/cookiepolicy.php"}})});</script>

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
          <h5>Reestablish Password</h5>
        </div>
        <form id="formLogin" class="col s12" action='#' onsubmit="event.preventDefault(); submitForgotten();return false">
          <div class="row">
          <div class="input-field col s12">
              <input id="password_input" type="password" class="validate" required="" aria-required="true">
              <label for="password_input">New Password</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="sec_password_input" type="password" class="validate" required="" aria-required="true">
              <label for="sec_password_input">Repeat New Password</label>
            </div>
          </div>
          <div class="row"></div>
          <div class="row">
          <div class="col s6"><a href="#"></a></div>
            <div class="col s6 right-align"><button class="waves-effect waves-light btn" type="submit" name="login">Send</button></div>
          </div>
        </form>
      </div>
    </main>
  </body>
  <script src="script/login.js"></script>
</html>