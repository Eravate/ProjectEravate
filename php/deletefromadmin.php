<?php 
ini_set('display_errors',1);
session_start();

# Database con
// Database for local
$database = new mysqli('localhost', 'root', '', 'eravate');
// Database for ionos
//$database = new mysqli('db5005997291.hosting-data.io','dbu1086761','Erawaito2021','dbs5024145');
mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_INDEX);
$database->stmt_init();

$actionDone = "";

$action=$_POST['action'];
$affObject=json_decode($_POST['affObject']);
$user=$_SESSION['admin'];

switch ($action) {
    // IF the submitted object is a star - FIRST IF IS FOR DETERMINING WHETHER IT'S A NEW STAR OR NOT
    case "star":
        $result = $database->prepare("DELETE FROM Star WHERE ID=?");
        $result->bind_param('i',$affObject[0]);
        $actionDone = "Removed Star ".$affObject[1];
        $result->execute();
        break;
    case "planet":
    // IF the submitted object is a planet - FIRST IF IS FOR DETERMINING WHETHER IT'S A NEW PLANET OR NOT
        $result = $database->prepare("DELETE FROM Planet WHERE ID=?");
        $result->bind_param('i',$affObject[0]);
        $actionDone = "Removed Planet ".$affObject[1];
        $result->execute();
        break;
    case "npo":
    // IF the submitted object is a NPO - FIRST IF IS FOR DETERMINING WHETHER IT'S A NEW NPO OR NOT
        $result = $database->prepare("DELETE FROM NPO WHERE ID=?");
        $result->bind_param('i',$affObject[0]);
        $actionDone = "Removed NPO ".$affObject[1];
        $result->execute();
        break;
    case "satellite":
    // IF the submitted object is a satellite - FIRST IF IS FOR DETERMINING WHETHER IT'S A NEW SATELLITE OR NOT
        $result = $database->prepare("DELETE FROM Satellite WHERE ID=?");
        $result->bind_param('i',$affObject[0]);
        $actionDone = "Removed Satellite ".$affObject[1];
        $result->execute();
        break;
    case "user":
        $result = $database->prepare("DELETE FROM AppUser WHERE email=?");
        $result->bind_param('s',$affObject[0]);
        $actionDone = "Removed User ".$affObject[0];
        $result->execute();
        break;
}

// Inserting into admin logs to keep control

$result = $database->prepare("INSERT INTO AdminLogs(ID,user,action,objectAffected) VALUES (?,?,?,?)");
$result->bind_param('issi',$zero,$user,$actionDone,$affObject[0]);
$result->execute();

echo ("success");
?>
