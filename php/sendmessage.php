<?php
ini_set('display_errors',1);
session_start();

# Database con
// Database for local
$database = new mysqli('localhost', 'root', '', 'eravate');
// Database for ionos

mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_INDEX);
$database->stmt_init();

$message=$_POST['message'];
$user=$_SESSION['user'];
$userTemp=$_SESSION['userTemp'];
$zero = 0;

$result = $database->prepare("SELECT a.email FROM AppUser a, SessionID s WHERE a.email = s.user AND s.ID=?");
$result->bind_param('s',$user);
$result->execute();
$result->store_result();
$result->bind_result($email);
$rowcount = $result->num_rows;

switch ($rowcount) {
    case 0:
        $result = $database->prepare("INSERT INTO MessageToTeam(ID,sentBy,message) VALUES (?,?,?)");
        $result->bind_param('iss',$zero,$userTemp,$message);
        $result->execute();
        echo ("success");
        break;
    case 1:
        $result->fetch();
        $result = $database->prepare("INSERT INTO MessageToTeam(ID,sentBy,message) VALUES (?,?,?)");
        $result->bind_param('iss',$zero,$email,$message);
        $result->execute();
        echo ("success");
    default:
        break;
}


?>