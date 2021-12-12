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

$action=$_POST['action'];
$objAffected=$_POST['objAffected'];
$zero = 0;
$user=$_SESSION['admin'];

$result = $database->prepare("INSERT INTO AdminLogs(ID,user,action,objectAffected) VALUES (?,?,?,?)");
$result->bind_param('issi',$zero,$user,$action,$objAffected);
$result->execute();
echo ("success");
?>