<?php 
ini_set('display_errors',1);
session_start();

# Database con
// Database for local
//$database = new mysqli('localhost', 'root', '', 'eravate');
// Database for ionos
$database = new mysqli('db5005997291.hosting-data.io','dbu1086761','Erawaito2021','dbs5024145');
mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_INDEX);
$database->stmt_init();

$actionDone = "";

$action=$_POST['action'];
$affectedID=$_POST['affectedID'];
$user=$_SESSION['admin'];
$zero = 0;

switch ($action) {
    // IF the submitted object is a star - FIRST IF IS FOR DETERMINING WHETHER IT'S A NEW STAR OR NOT
    case "read":
        $setRead = 1;
        $result = $database->prepare("UPDATE MessageToTeam SET hasBeenRead=? WHERE ID=?");
        $result->bind_param('ii',$setRead,$affectedID);
        $result->execute();
        $actionDone = "Read Message ".$affectedID;
        break;
    case "readA":
        $actionDone = "Read Message ".$affectedID;
        break;
    case "flag":
        $setFlag = 1;
        $result = $database->prepare("UPDATE MessageToTeam SET isTagged=? WHERE ID=?");
        $result->bind_param('ii',$setFlag,$affectedID);
        $result->execute();
        $actionDone = "Flagged Message ".$affectedID;
        break;
    case "unflag":
        $setFlag = 0;
        $result = $database->prepare("UPDATE MessageToTeam SET isTagged=? WHERE ID=?");
        $result->bind_param('ii',$setFlag,$affectedID);
        $result->execute();
        $actionDone = "Unflagged Message ".$affectedID;
        break;
    case "hide":
        $setHide = 1;
        $result = $database->prepare("UPDATE MessageToTeam SET closed=? WHERE ID=?");
        $result->bind_param('ii',$setHide,$affectedID);
        $result->execute();
        $actionDone = "Hidden Message ".$affectedID;
        break;
    case "unhide":
        $setHide = 0;
        $result = $database->prepare("UPDATE MessageToTeam SET closed=? WHERE ID=?");
        $result->bind_param('ii',$setHide,$affectedID);
        $result->execute();
        $actionDone = "Unhidden Message ".$affectedID;
        break;
}

// Inserting into admin logs to keep control

$result = $database->prepare("INSERT INTO AdminLogs(ID,user,action,objectAffected) VALUES (?,?,?,?)");
$result->bind_param('issi',$zero,$user,$actionDone,$affectedID);
$result->execute();

echo ("success");
?>
