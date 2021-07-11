<?php
ini_set('display_errors',0);
session_start();
if (!isset($_SESSION['user'])) {
  header("Location: login.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="icon" type="image/png" href="icons/logo.png"/>
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" type="text/css" href="css/swup.css"/>

    <script src="script/jquery.js"></script>
    <script src="script/commands.js"></script>
    <script src="script/three.js"></script>
    <script defer src="script/planets.js"></script>
    <script src="script/mainstart.js"></script>
    <script defer src="script/swup.min.js"></script>
    <script defer src="script/swupinit.js"></script>

    <script src="https://cdn.websitepolicies.io/lib/cookieconsent/1.0.3/cookieconsent.min.js" defer></script><script>window.addEventListener("load",function(){window.wpcc.init({"border":"thin","corners":"small","colors":{"popup":{"background":"#ffe4e1","text":"#000000","border":"#c25e5e"},"button":{"background":"#c25e5e","text":"#ffffff"}},"position":"bottom","content":{"href":"https://eravate.es/cookiepolicy.php"}})});</script>

    <title>Eravate Project</title>

</head>
<body class="loader">
    <iframe id="loading" src="loader.php" name="targetframe" allowTransparency="true" scrolling="no" frameborder="0" ></iframe>
    <main>
        <div id="landscape">
            <!-- All the Content -->
            <div id="content">

                <!-- Title Layer -->
                <img id="planet" alt="Planet">
                <div id="navbar"><span id="planetname"></span>
                <div id="imgnav"><img src="icons/threed.png" id="threed" alt="3D"><img src="icons/console.png" id="console" alt="Console"><img src="icons/eye.png" id="see" alt="See"><img src="icons/logout.png" onclick="logout();" id="logout" alt="Log Out"><form id="logoutForm" method="POST" action="login.php"><input type="hidden" name="action" value="true"></form></div></div>

                <!-- Information Layer -->
                <div id="consoleDiv">
                    <div id="consoleDivheader"><img src="icons/reddot.png" id="reddot" alt="Close"></div>
                    <div id="textArea"></div>
                    <!--<div id="consoleInfo">Eravate@EravateProject:</div>--><input id="consoleInput" type="text">
                </div>
                <!-- Information Left -->
                <div id="infoleft">
                    <p class="lefttitle">Mass:</p><p class="leftinfo" id="mass"></p><br>
                    <p class="lefttitle">Radius:</p><p class="leftinfo" id="radius"></p><br>
                    <p class="lefttitle">Gravity:</p><p class="leftinfo" id="gravity"></p><br>
                    <p class="lefttitle">Surface Temp:</p><p class="leftinfo" id="temperature"></p><br>
                    <p class="lefttitle">Surface Press:</p><p class="leftinfo" id="pressure"></p><br>
                    <p class="lefttitle">Orbital Period:</p><p class="leftinfo" id="period"></p><br>
                    <p class="lefttitle">Semi Major Axis:</p><p class="leftinfo" id="axis"></p><br>
                    <p class="lefttitle">Axial Tilt:</p><p class="leftinfo" id="tilt"></p><br>
                    <p class="lefttitle">Orbital Speed:</p><p class="leftinfo" id="speed"></p><br>
                </div>
                <!-- Information Right -->
                <div id="inforight">
                    <p class="righttitle">Type:</p><p class="rightinfo" id="type"></p><br>
                    <p class="righttitle">Volcanism:</p><p class="rightinfo" id="volcanism"></p><br>
                    <p class="righttitle">Atmosphere Type:</p><p class="rightinfo" id="atmosphere"></p><br>
                    <p class="righttitle">Atmosphere:</p><p class="rightinfo" id="atmosphere1"></p><br>
                    <p class="righttitle"></p><p class="rightinfo" id="atmosphere2"></p><br>
                    <p class="righttitle"></p><p class="rightinfo" id="atmosphere3"></p><br>
                    <p class="righttitle">Composition:</p><p class="rightinfo" id="composition1"></p><br>
                    <p class="righttitle"></p><p class="rightinfo" id="composition2"></p><br>
                </div>

                <!-- Navigation Layer -->
                <div id="goleft"><img src="icons/left.png" id="arrowleft"></div>
                <div id="goright"><img src="icons/right.png" id="arrowright"></div>
                
                <!-- Music Layer -->
                <div id="music">
                    <div id="musictitle">Now Playing...</div>
                    <div id="musicname">Gato by Nowhere Voyage</div>
                    <div id="musiccontrols">
                        <img src="icons/skipleft.png" id="previous">
                        <img src="icons/pause.png" id="pauseplay">
                        <img src="icons/skipright.png" id="next">
                        <input type="range" id="volume" min="0" max="100">
                    </div>
                </div>

                <!-- Transition Layer -->
                <div class="top-layer"></div>
                <div class="top-layer top-layer--1"></div>
                <div class="top-layer top-layer--2"></div>
                <div class="top-layer top-layer--3"></div>
                <div class="top-layer top-layer--4"></div>
                <div class="top-layer top-layer--5">ERAVATE</div>
            </div>
        </div>
        <div id="portrait">
            <img src="icons/ptl.gif" id="ctl" alt="Switch to Portrait">
        </div>
    </main>
</body>
    <script src="script/mainend.js"></script>
</html>