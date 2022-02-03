<?php 
ini_set('display_errors',1);
session_start();
# Database Con
// Database for local
$database = new mysqli('localhost', 'root', '', 'eravate');

$objects = array();


mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_INDEX);

$database->stmt_init();
$result = $database->prepare("SELECT name FROM Star");
$result->execute();
$result->store_result();
$result->bind_result($starName);


$rowcount = $result->num_rows;

switch ($rowcount) {
    case 0:
        $objects = 1;
        break;
    default:
        while ($result->fetch()) {
            array_push($objects, $starName);
        }
        break;
};

echo json_encode($objects);
?>
