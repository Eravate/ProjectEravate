<?php 
ini_set('display_errors',1);
session_start();
# Database Con
$database = new mysqli('localhost', 'root', '', 'eravate');
$databaseS = new mysqli('localhost', 'root', '', 'eravate');

$solar = $_POST['solar'];
$objects = array();


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
$result = $database->prepare("SELECT ID, name, rotation, revolution, radius, temp, overviewTXT, overviewSor, overviewURL, internalTXT, internalSor, internalURL, surfaceTXT, surfaceSor, surfaceURL, 3d FROM Planet WHERE Star=? ORDER BY position ASC");
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
            $objectsSmaller = array();
            $planet = array($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                            $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);
            array_push($objectsSmaller, $planet);
            $database->stmt_init();
            $resultS = $database->prepare("SELECT ID, name, rotation, revolution, radius, temp, overviewTXT, overviewSor, overviewURL, internalTXT, internalSor, internalURL, surfaceTXT, surfaceSor, surfaceURL, 3d FROM Satellite WHERE Planet=? ORDER BY position ASC");
            $resultS->bind_param('i',$id);
            $resultS->execute();
            $resultS->store_result();
            $resultS->bind_result($idS,$nameS,$rotationS,$revolutionS,$radiusS,$tempS,$overviewTXTS,$overviewSorS,$overviewURLS,
                                $internalTXTS,$internalSorS,$internalURLS,$surfaceTXTS,$surfaceSorS,$surfaceURLS,$threedS);

            $rowcountS = $resultS->num_rows;
            switch ($rowcountS) {
                case 0:
                    break;
                default:
                    while ($resultS->fetch()) {
                        $satellite = array($idS,$nameS,$rotationS,$revolutionS,$radiusS,$tempS,$overviewTXTS,$overviewSorS,$overviewURLS,
                                        $internalTXTS,$internalSorS,$internalURLS,$surfaceTXTS,$surfaceSorS,$surfaceURLS,$threedS);
                        array_push($objectsSmaller, $satellite);
                    }
                    break;
                }
            if (sizeof($objectsSmaller)>1) {
                array_push($objects, $objectsSmaller);
            } else {
                array_push($objects, $planet);
            }
        }
        break;
    }

echo json_encode($objects);
?>
