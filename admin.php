<?php
ini_set('display_errors',0);
session_start();
if (!isset($_SESSION['admin'])) {
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
    <link rel="stylesheet" href="css/materialize.min.css">
    <link rel="stylesheet" type="text/css" href="css/admin.css">
    <link rel="stylesheet" type="text/css" href="css/dark.css">
    <link rel="stylesheet" type="text/css" href="css/swup.css"/>
    <link rel="stylesheet" type="text/css" href="css/jqueryeditableselect.min.css"/>

    <script src="script/jquery.js"></script>
    <script src="script/sweetalert2.min.js"></script>
    <script src="script/commands.js"></script>
    <script src="script/adminstart.js"></script>
    <script src="script/materialize.min.js"></script>
    <script defer src="script/admin.js"></script>
    <script src="script/jqueryeditableselect.min.js"></script>
    
    
    <!--<script defer src="script/clouds.js">// all the script for loading the clouds is included there!</script>-->


    <script src="script/cookieconsent.min.js" defer></script><script>window.addEventListener("load",function(){window.wpcc.init({"border":"thin","corners":"small","colors":{"popup":{"background":"#ffe4e1","text":"#000000","border":"#c25e5e"},"button":{"background":"#c25e5e","text":"#ffffff"}},"position":"bottom","content":{"href":"https://eravate.es/cookiepolicy.php"}})});</script>

    <title>Project: Eravate - Admin</title>

</head>
<body class="loader">
    <iframe id="loading" src="loader.php" name="targetframe" allowTransparency="true" scrolling="no" frameborder="0" ></iframe>
    <main>
        <div id="landscape">
            <!-- All the Content -->
            <div id="content" class="invis">

                <!-- Title Layer -->
                <div id="navbar"><span id="pagetitle1">ADMIN</span>
                <div id="imgnav">
                    <?php 
                    if (isset($_SESSION['sadmin']) && $_SESSION['sadmin']==1) {
                      echo ("<img src='icons/user.png' id='users' alt='Users'>");
                    };
                    ?>
                    <img src="icons/console.png" id="console" alt="Console">
                    <img src="icons/messages.png" id="messages" alt="Messages">
                    <img src="icons/fulls.png" id="fulls" alt="FS" onclick="gofullscreen();">
                    <img src="icons/logout.png" onclick="logout();" id="logout" alt="Log Out">
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
                    <div id="infoleft"><div id="infoleftInner"></div></div>
                    <div id="infocentre"><div id="infocentreInner"></div></div>
                    <div id="inforight"><div id="inforightInner"></div></div>
                </div>

                <!-- Navigation Layer -->
                
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
                        <div class="addtit" id="addtit1">0 STARS</div>
                        <div class="addtxt">STARS</div>
                    </div>
                    <div id="add2" class="additionalComp">
                        <div class="addtit" id="addtit2">0 PLANETS</div>
                        <div class="addtxt">PLANETS</div>
                    </div>
                    <div id="add3" class="additionalComp">
                        <div class="addtit" id="addtit3">0 NPOS</div>
                        <div class="addtxt">NPOS</div>
                    </div>
                    <div id="add4" class="additionalComp">
                        <div class="addtit" id="addtit4">0 SATELLITES</div>
                        <div class="addtxt">SATELLITES</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Used Previously 
        <div id="portrait">
            <img src="icons/ptl.gif" id="ctl" alt="Switch to Portrait">
        </div>-->
    </main>
    <script src="script/adminend.js"></script>
</body>
</html>