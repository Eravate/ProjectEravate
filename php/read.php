<?php 
ini_set('display_errors',1);
session_start();
# Database Con
$database = new mysqli('localhost', 'root', '', 'eravate');
mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_INDEX);


$database->stmt_init();
$result = $database->prepare("SELECT * FROM planet");

$result->execute();
$result->store_result();
$result->bind_result($id,$planet,$mass,$radius,$gravity,$temperature,$pressure,$orbital,$axis,$tilt,$speed,$type,
                     $volcanism,$atmosphere,$atmosphere1,$atmosphere2,$atmosphere3,$composition1,$composition2);

$rowcount = $result->num_rows;
$planets = array();
switch ($rowcount) {
    case 0:
        break;
    default:
        while ($result->fetch()) {
            $planet = array($id,$planet,$mass,$radius,$gravity,$temperature,$pressure,$orbital,$axis,$tilt,$speed,$type,
                            $volcanism,$atmosphere,$atmosphere1,$atmosphere2,$atmosphere3,$composition1,$composition2);
            array_push($planets, $planet);
        }
        break;
    }
echo json_encode($planets);
?>
