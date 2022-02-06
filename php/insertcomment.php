<?php 
ini_set('display_errors',1);
session_start();

# Database con
// Database for local
$database = new mysqli('localhost', 'root', '', 'eravate');
// Database for ionos

mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_INDEX);
$database->stmt_init();

$comment=$_POST['comment'];
$message=$_POST['message'];
$action="Added Comment on message ".$message;
$user=$_SESSION['adminMail'];
$zero = 0;


// Inserting into admin logs to keep control

$result = $database->prepare("INSERT INTO CommentsOnMessage(ID,message,sentBy,comment) VALUES (?,?,?,?)");
$result->bind_param('isss',$zero,$message,$user,$comment);
$result->execute();

echo ("success");
?>
