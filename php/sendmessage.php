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
$zero = 0;

$result = $database->prepare("INSERT INTO MessageToTeam(ID,sentBy,message) VALUES (?,?,?)");
$result->bind_param('iss',$zero,$user,$message);
$result->execute();
echo ("success");
?>