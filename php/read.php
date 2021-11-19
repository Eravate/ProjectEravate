<?php 
ini_set('display_errors',1);
session_start();
# Database Con
$database = new mysqli('localhost', 'root', '', 'eravate');

$solar = $_POST['solar'];
$objects = array();

mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_INDEX);

$database->stmt_init();
$result = $database->prepare("SELECT * FROM Star WHERE ID=?");
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
$result = $database->prepare("SELECT ID, name, rotation, revolution, radius, temp, overviewTXT, overviewSor, overviewURL, internalTXT, internalSor, internalURL, surfaceTXT, surfaceSor, surfaceURL, 3D FROM Planet WHERE ID=? ORDER BY position ASC");
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
    }

echo json_encode($objects);
?>
