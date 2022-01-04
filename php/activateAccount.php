<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require './Exception.php';
require './PHPMailer.php';
require './SMTP.php';
ini_set('display_errors',1);
session_start();

# Database con
// Database for local
$database = new mysqli('localhost', 'root', '', 'eravate');
// Database for ionos
mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_INDEX);
$database->stmt_init();

$actionDone = "";

$goAhead;


$empty = "";

$token = $_SESSION['actoken'];

$database->stmt_init();
$result = $database->prepare("UPDATE AppUser SET token=? WHERE token=?");
$result->bind_param('ss',$empty,$token);
$result->execute();

// Inserting into admin logs to keep control

echo ("success");
?>
