<?php
ini_set('display_errors',0);
session_start();
if (!isset($_SESSION['user'])) {
    $location = 'index';
    include 'php/checkForUser.php';
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
    <link rel="stylesheet" href="css/materialize.min.css">
    <link rel="stylesheet" type="text/css" href="css/dark.css">
    <link rel="stylesheet" type="text/css" href="css/swup.css"/>

    <script src="script/jquery.js"></script>
    <script src="script/sweetalert2.min.js"></script>
    <script type="module" src="script/3dplanets.js"></script>
    <script src="script/commands.js"></script>
    <script src="script/three.js"></script>
    <script defer src="script/main.js"></script>
    <script src="script/mainstart.js"></script>
    <script defer src="script/three.min.js"></script>
    <script defer src="script/postprocessing.min.js"></script>
    <script type="module" src="script/GLTFLoader.js"></script>
    <script type="module" src="script/OrbitControls.js"></script>
    
    <!--<script defer src="script/clouds.js">// all the script for loading the clouds is included there!</script>-->

    <script src="script/cookieconsent.min.js" defer></script><script>window.addEventListener("load",function(){window.wpcc.init({"border":"thin","corners":"small","colors":{"popup":{"background":"#ffe4e1","text":"#000000","border":"#c25e5e"},"button":{"background":"#c25e5e","text":"#ffffff"}},"position":"bottom","content":{"href":"https://eravate.es/cookiepolicy.php"}})});</script>

    <title>Project: Eravate</title>

</head>
<body class="loader">
    <iframe id="loading" src="loader.php" name="targetframe" allowTransparency="true" scrolling="no" frameborder="0" ></iframe>
    <div id="infoScreen">
        <div id="infoContent">
            <h2>Welcome to Project: Eravate!</h2>
            <p>Before we let you jump into the action, We'll explain you a couple of things.</p>
            <p>For improved experience, make sure that you are running on fullscreen, that can be achieved by pressing F11 on your keyboard or using our navigation panel to click on full-screen mode.</p>
            <p>If you are on your phone, make sure you are in landscape mode.</p>
            <p>To move to a different system, use the command prompt in the navigation bar. Use the help command to be guided through.</p>
            <p>If you have to report any error, you can do so by clicking on the exclamation mark on the navigational panel. You can also write me on twitter @Erawaito.</p>
            <label><input id="dnsagain" type="checkbox" name="dnsagain"><span>Do not show again</span></label><br><br>
            <button id="continueIndex" class="waves-effect waves-light btn" type="submit" name="continue">Continue</button>
        </div>
    </div>
    <main>
        <div id="landscape">
            <!-- All the Content -->
            <div id="content" class="invis">

                <!-- Title Layer -->

                <div id="object" alt="Object"><canvas id="objectCanvas"></canvas></div>
                <div id="navbar"><span id="solarsystem"></span>
                <div id="imgnav">
                    <div class="tooltip"><img src="icons/exclamation.png" id="exclamation" alt="Notif" onclick="reportError();"><span class="tooltiptext tooltiptextTop">Report Error</span></div>
                    <div class="tooltip tooltipMargin"><img src="icons/fulls.png" id="fulls" alt="FS" onclick="gofullscreen();"><span class="tooltiptext tooltiptextTop">Fullscreen</span></div>
                    <div class="tooltip tooltipMarginConsole"><img src="icons/console.png" id="console" alt="Console"><span class="tooltiptext tooltiptextTop">Console</span></div>
                    <div class="tooltip tooltipMargin"><img src="icons/logout.png" onclick="logout();" id="logout" alt="Log Out"><span class="tooltiptext tooltiptextTop">Logout</span></div>
                    <form id="logoutForm" method="POST" action="login.php"><input type="hidden" name="action" value="true"></form>
                </div></div>

                <!-- Information Layer -->

                <div id="consoleDiv">
                    <div id="consoleDivheader"><img src="icons/x.png" id="reddot" alt="Close"></div>
                    <div id="textArea"></div>
                    <!--<div id="consoleInfo">Eravate@EravateProject:</div>--><input id="consoleInput" type="text">
                </div>

                <!-- Information Left, obsolete as of now -->
                <!--
                <div id="infoleft">
                    <div id="titleLeft"><img src="icons/minimize.png" id="minimize" alt="Minimize" onclick="retractInfoLeft()"><span id="about">ABOUT</span></div>
                    <div id="contentLeft"></div>
                </div>-->

                <!-- Information Right -->

                <div id="info">
                    <div class="tooltip"><div id='name'></div><span class="tooltiptext tooltiptextTop" id='nameTooltip'></span></div>
                    <div id='txt'></div>
                    <div id="source">Source: </div>
                    <div class="seldiv" id="overview"><div class='selnumber'>01</div><div class='seltxt'>OVERVIEW</div></div>
                    <div class="seldiv" id="internal"><div class='selnumber'>02</div><div class='seltxt'>INTERNAL STRUCTURE</div></div>
                    <div class="seldiv" id="surface"><div class='selnumber'>03</div><div class='seltxt'>SURFACE GEOLOGY</div></div>
                </div>

                <!-- Navigation Layer -->

                <div id="goleft" class="tooltip"><img src="icons/left.png" id="arrowleft"><span class="tooltiptext tooltiptextTop">Previous Object</span></div>
                <div id="goright" class="tooltip"><img src="icons/right.png" id="arrowright"><span class="tooltiptext tooltiptextTop">Next Object</span></div>
                <div id="goup" class="tooltip"><img src="icons/up.png" id="arrowup"><span class="tooltiptext tooltiptextBottom">Previous Satellite/Object</span></div>
                <div id="godown" class="tooltip"><img src="icons/down.png" id="arrowdown"><span class="tooltiptext tooltiptextTop">Next Satellite</span></div>
                
                <!-- Layer previously used for music, now used for info below. -->

                <!-- This is the music part, previously used
                <div id="music">
                    <div id="musictitle">Now Playing...</div>
                    <div id="musicname">Gato by Nowhere Voyage</div>
                    <div id="musiccontrols">
                        <img src="icons/skipleft.png" id="previous">
                        <img src="icons/pause.png" id="pauseplay">
                        <img src="icons/skipright.png" id="next">
                        <input type="range" id="volume" min="0" max="100">
                    </div>
                </div>-->

                <div id="additional">
                    <div id="add1" class="additionalComp">
                        <div class="addtit">ROTATION TIME</div>
                        <div class="addtxt" id="rottime"></div>
                    </div>
                    <div id="add2" class="additionalComp">
                        <div class="addtit">REVOLUTION TIME</div>
                        <div class="addtxt" id="revtime"></div>
                    </div>
                    <div id="add3" class="additionalComp">
                        <div class="addtit">RADIUS</div>
                        <div class="addtxt" id="radius"></div>
                    </div>
                    <div id="add4" class="additionalComp">
                        <div class="addtit">AVERAGE TEMP.</div>
                        <div class="addtxt" id="temp"></div>
                    </div>
                </div>
                <!-- Transition Layer, used to ensure smooth transitions between objects, may be subject to a lot of changes depending on how the app ends up working -->
            </div>
            <div class="top-layer"></div>
            <div class="top-layer top-layer--1"></div>
            <div class="top-layer top-layer--2"></div>
            <div class="top-layer top-layer--3"></div>
            <div class="top-layer top-layer--4"></div>
            <div class="top-layer top-layer--5">ERAVATE</div>
        </div>
        <!-- Used Previously 
        <div id="portrait">
            <img src="icons/ptl.gif" id="ctl" alt="Switch to Portrait">
        </div>-->
    </main>
</body>
    <script src="script/mainend.js"></script>
</html>