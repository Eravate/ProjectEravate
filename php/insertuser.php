<?php 
ini_set('display_errors',1);
session_start();

# Database con
// Database for local
$database = new mysqli('localhost', 'root', '', 'eravate');
// Database for ionos
mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_INDEX);
$database->stmt_init();

$actionDone = "";
$objAffected = 0;

$objArray=json_decode($_POST['objArray']);
$user=$_SESSION['adminMail'];
$zero = 0;

if ($objArray[0]=="no") {
    $encpasswd = password_hash($objArray[2],PASSWORD_DEFAULT);
    $result = $database->prepare("INSERT INTO AppUser(email,passwd,isAdmin,isSuperAdmin) VALUES (?,?,?,?)");
    $result->bind_param('ssii',$objArray[1],$encpasswd,$objArray[3],$objArray[4]);
    $result->execute();
    $actionDone = "Added User ".$objArray[1];
    $objAffected = $objArray[1];
} else {
    $result = $database->prepare("UPDATE AppUser SET isAdmin=?,isSuperAdmin=? WHERE email=?");
    $result->bind_param('sss',$objArray[3],$objArray[4],$objArray[1]);
    $result->execute();
    $actionDone = "Modified User ".$objArray[1];
    $objAffected = $objArray[1];
}


// Inserting into admin logs to keep control

$result = $database->prepare("INSERT INTO AdminLogs(ID,user,action,objectAffected) VALUES (?,?,?,?)");
$result->bind_param('issi',$zero,$user,$actionDone,$objAffected);
$result->execute();

echo ("success");
?>
