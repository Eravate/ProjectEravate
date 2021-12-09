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

$comment=$_POST['comment'];
$message=$_POST['message'];
$action="Added Comment on message ".$message;
$user=$_SESSION['admin'];
$zero = 0;


// Inserting into admin logs to keep control

$result = $database->prepare("INSERT INTO CommentsOnMessage(ID,message,sentBy,comment) VALUES (?,?,?,?)");
$result->bind_param('isss',$zero,$message,$user,$comment);
$result->execute();

echo ("success");
?>
