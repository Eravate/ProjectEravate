<?php 
ini_set('display_errors',1);
session_start();
# Database Con
// Database for local
$database = new mysqli('localhost', 'root', '', 'eravate');
// Database for ionos

$queryname = $_POST['location'];
$objects = array();
$idSun;

mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_INDEX);

$database->stmt_init();
$result = $database->prepare("SELECT 'star', ID, name FROM Star WHERE name = ? UNION SELECT 'planet', ID, name FROM Planet WHERE name = ? UNION SELECT 'npo', ID, name FROM NPO WHERE name = ? UNION SELECT 'satellite', ID, name FROM Satellite WHERE name = ?");
$result->bind_param('ssss',$queryname,$queryname,$queryname,$queryname);
$result->execute();
$result->store_result();
$result->bind_result($typeRes,$idRes,$nameRes);

$rowcount = $result->num_rows;
switch ($rowcount) {
    case 0:
        $objects = 1;
        break;
    case 1:
        $result->fetch();
        switch ($typeRes) {
            // If the object that was searched for was a Star, It is starting to get extremely complicated y'know
            case "star":
                $database->stmt_init();
                $result = $database->prepare("SELECT s.ID, s.name, s.rotation, s.revolution, s.radius, s.temp, s.overviewTXT, s.overviewSor, s.overviewURL, s.internalTXT, s.internalSor, s.internalURL, s.surfaceTXT, s.surfaceSor, s.surfaceURL, t.name FROM Star s, StarType t WHERE s.ID=? AND s.startype = t.ID");
                $result->bind_param('i',$idRes);
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
                $result->bind_param('i',$idRes);
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
                break;
            // If the object that was searched for was a Star - Uses subquery to determine ID
            case "planet":
                $database->stmt_init();
                $result = $database->prepare("SELECT s.ID, s.name, s.rotation, s.revolution, s.radius, s.temp, s.overviewTXT, s.overviewSor, s.overviewURL, s.internalTXT, s.internalSor, s.internalURL, s.surfaceTXT, s.surfaceSor, s.surfaceURL, t.name FROM Star s, StarType t WHERE s.ID=(SELECT Star FROM Planet WHERE ID=?) AND s.startype = t.ID");
                $result->bind_param('i',$idRes);
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
                            $idSun = $id;
                            $sun = array($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                                            $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);
                            array_push($objects, $sun);
                        }
                        break;
                    }

                $database->stmt_init();
                $result = $database->prepare("SELECT ID, name, rotation, revolution, radius, temp, overviewTXT, overviewSor, overviewURL, internalTXT, internalSor, internalURL, surfaceTXT, surfaceSor, surfaceURL, 3d FROM Planet WHERE Star=? ORDER BY position ASC");
                $result->bind_param('i',$idSun);
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
                break;
            // If the object that was searched for was a Star
            case "npo":
                $database->stmt_init();
                $result = $database->prepare("SELECT s.ID, s.name, s.rotation, s.revolution, s.radius, s.temp, s.overviewTXT, s.overviewSor, s.overviewURL, s.internalTXT, s.internalSor, s.internalURL, s.surfaceTXT, s.surfaceSor, s.surfaceURL, t.name FROM Star s, StarType t WHERE s.ID=(SELECT Star FROM NPO WHERE ID=?) AND s.startype = t.ID");
                $result->bind_param('i',$idRes);
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
                            $idSun = $id;
                            $sun = array($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                                            $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);
                            array_push($objects, $sun);
                        }
                        break;
                    }

                $database->stmt_init();
                $result = $database->prepare("SELECT ID, name, rotation, revolution, radius, temp, overviewTXT, overviewSor, overviewURL, internalTXT, internalSor, internalURL, surfaceTXT, surfaceSor, surfaceURL, 3d FROM NPO WHERE Star=?");
                $result->bind_param('i',$idSun);
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
                            $npo = array($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                                            $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);
                            array_push($objects, $npo);
                        }
                        break;
                    }
                break;
            // If the object that was searched for was a Star, This one's boutta have so much code fml
            case "satellite":
                $database->stmt_init();
                $result = $database->prepare("SELECT s.ID, s.name, s.rotation, s.revolution, s.radius, s.temp, s.overviewTXT, s.overviewSor, s.overviewURL, s.internalTXT, s.internalSor, s.internalURL, s.surfaceTXT, s.surfaceSor, s.surfaceURL, t.name FROM Star s, StarType t WHERE s.ID=(SELECT Star FROM Planet WHERE ID=(SELECT Planet FROM Satellite WHERE ID=?)) AND s.startype = t.ID");
                $result->bind_param('i',$idRes);
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
                            $idSun = $id;
                            $sun = array($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                                            $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);
                            array_push($objects, $sun);
                        }
                        break;
                    }

                $database->stmt_init();
                $result = $database->prepare("SELECT ID, name, rotation, revolution, radius, temp, overviewTXT, overviewSor, overviewURL, internalTXT, internalSor, internalURL, surfaceTXT, surfaceSor, surfaceURL, 3d FROM Planet WHERE Star=? ORDER BY position ASC");
                $result->bind_param('i',$idSun);
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
                break;
        }
        break;
    default:
        $objects = 2;
        break;
    };

echo json_encode($objects);
?>
