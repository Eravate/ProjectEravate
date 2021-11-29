<?php 
ini_set('display_errors',1);
session_start();
# Database Con
$database = new mysqli('localhost', 'root', '', 'eravate');
$databaseS = new mysqli('localhost', 'root', '', 'eravate');

$objects = array();
$suns = array();
$planets = array();
$npos = array();
$satellites = array();
$logs = array();
$messages = array();


mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_INDEX);

/* PREVIOUSLY USED DOUBLE QUERY - SAVING RESOURCES

$database->stmt_init();
$result = $database->prepare("SELECT s.ID, s.name, s.rotation, s.revolution, s.radius, s.temp, s.overviewTXT, s.overviewSor, s.overviewURL, s.internalTXT, s.internalSor, s.internalURL, s.surfaceTXT, s.surfaceSor, s.surfaceURL, t.name FROM Star s, Startype t WHERE s.ID=? AND s.startype = t.ID");
$result->bind_param('i',$solar);
$result->execute();
$result->store_result();
$result->bind_result($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                    $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);

$rowcount = $result->num_rows;
switch ($rowcount) {
    case 0:
        break;
    default:
        while ($result->fetch()) {
            $sun = array($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                            $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);
            array_push($objects, $sun);
        }
        break;
    }

$database->stmt_init();
$result = $database->prepare("SELECT ID, name, rotation, revolution, radius, temp, overviewTXT, overviewSor, overviewURL, internalTXT, internalSor, internalURL, surfaceTXT, surfaceSor, surfaceURL, 3d FROM Planet WHERE ID=? ORDER BY position ASC");
$result->bind_param('i',$solar);
$result->execute();
$result->store_result();
$result->bind_result($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                    $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);

$rowcount = $result->num_rows;
switch ($rowcount) {
    case 0:
        break;
    default:
        while ($result->fetch()) {
            $planet = array($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                            $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);
            array_push($objects, $planet);
        }
        break;
    }*/

/* PROTOTYPE DATABASE SINGLE QUERY USING UNION - OUTSOURCED DUE TO LACK OF MOONS 

$database->stmt_init();
$result = $database->prepare("SELECT s.ID, s.name, s.rotation, s.revolution, s.radius, s.temp, s.overviewTXT, s.overviewSor, s.overviewURL, s.internalTXT, s.internalSor, s.internalURL, s.surfaceTXT, s.surfaceSor, s.surfaceURL, t.name FROM Star s, Startype t WHERE s.ID=? AND s.startype = t.ID
                            UNION SELECT p.ID, p.name, p.rotation, p.revolution, p.radius, p.temp, p.overviewTXT, p.overviewSor, p.overviewURL, p.internalTXT, p.internalSor, p.internalURL, p.surfaceTXT, p.surfaceSor, p.surfaceURL, p.3D FROM Planet p WHERE Star=?");
$result->bind_param('ii',$solar,$solar);
$result->execute();
$result->store_result();
$result->bind_result($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                    $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);

$rowcount = $result->num_rows;
switch ($rowcount) {
    case 0:
        break;
    default:
        while ($result->fetch()) {
            $sun = array($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                            $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);
            array_push($objects, $sun);
        }
        break;
    }*/

/* CURRENTLY IN-DEVELOPMENT W/ MOONS*/

$database->stmt_init();
$result = $database->prepare("SELECT s.ID, s.name, s.rotation, s.revolution, s.radius, s.temp, s.overviewTXT, s.overviewSor, s.overviewURL, s.internalTXT, s.internalSor, s.internalURL, s.surfaceTXT, s.surfaceSor, s.surfaceURL, s.startype FROM Star s");
$result->execute();
$result->store_result();
$result->bind_result($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                    $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);

$rowcount = $result->num_rows;
switch ($rowcount) {
    case 0:
        break;
    default:
        while ($result->fetch()) {
            $sun = array($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                            $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);
            array_push($suns, $sun);
        }
        break;
    }

$database->stmt_init();
$result = $database->prepare("SELECT ID, Star, name, position, rotation, revolution, radius, temp, overviewTXT, overviewSor, overviewURL, internalTXT, internalSor, internalURL, surfaceTXT, surfaceSor, surfaceURL, 3d FROM Planet");
$result->execute();
$result->store_result();
$result->bind_result($id,$star,$name,$position,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                    $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);

$rowcount = $result->num_rows;

switch ($rowcount) {
    case 0:
        break;
    default:
        while ($result->fetch()) {
            $planet = array($id,$star,$name,$position,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                        $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);
            array_push($planets, $planet);
        }
        break;
    }

$database->stmt_init();
$result = $database->prepare("SELECT ID, Star, name, rotation, revolution, radius, temp, overviewTXT, overviewSor, overviewURL, internalTXT, internalSor, internalURL, surfaceTXT, surfaceSor, surfaceURL, 3d FROM NPO");
$result->execute();
$result->store_result();
$result->bind_result($id,$star,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                    $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);

$rowcount = $result->num_rows;

switch ($rowcount) {
    case 0:
        break;
    default:
        while ($result->fetch()) {
            $npo = array($id,$star,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                        $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);
            array_push($npos, $npo);
        }
        break;
    }

$database->stmt_init();
$result = $database->prepare("SELECT ID, Planet, name, position, rotation, revolution, radius, temp, overviewTXT, overviewSor, overviewURL, internalTXT, internalSor, internalURL, surfaceTXT, surfaceSor, surfaceURL, 3d FROM Satellite");
$result->execute();
$result->store_result();
$result->bind_result($id,$planet,$name,$position,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                    $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);

$rowcount = $result->num_rows;

switch ($rowcount) {
    case 0:
        break;
    default:
        while ($result->fetch()) {
            $satellite = array($id,$planet,$name,$position,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                        $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);
            array_push($satellites, $satellite);
        }
        break;
    }

$database->stmt_init();
$result = $database->prepare("SELECT * FROM AdminLogs");
$result->execute();
$result->store_result();
$result->bind_result($id,$user,$action,$objectAffected,$done);

$rowcount = $result->num_rows;

switch ($rowcount) {
    case 0:
        break;
    default:
        while ($result->fetch()) {
            $log = array($id,$user,$action,$objectAffected,$done);
            array_push($logs, $log);
        }
        break;
    }

$database->stmt_init();
$result = $database->prepare("SELECT * FROM MessageToTeam");
$result->execute();
$result->store_result();
$result->bind_result($id,$sentBy,$message,$sentOn,$hasBeenRead,$closed,$isTagged);

$rowcount = $result->num_rows;

switch ($rowcount) {
    case 0:
        break;
    default:
        while ($result->fetch()) {
            $message = array($id,$sentBy,$message,$sentOn,$hasBeenRead,$closed,$isTagged);
            array_push($messages, $message);
        }
        break;
    }

array_push($objects,$suns);
array_push($objects,$planets);
array_push($objects,$npos);
array_push($objects,$satellites);
array_push($objects,$logs);
array_push($objects,$messages);


echo json_encode($objects);
?>
