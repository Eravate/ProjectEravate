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

$type=$_POST['type'];
$email=$_POST['email'];
$passwd=$_POST['passwd'];
$encpasswd = password_hash($passwd,PASSWORD_DEFAULT);

$encemail = password_hash($email,PASSWORD_DEFAULT);

# Handy dandy array that allows email verification to take place
# This few lines are for verification ONLY
#$arrayHash = ['Dust','Rhapsody','Stop','Pressure','Rock','Champions','Break','Radio','Love','Somebody','Innuendo'];
#$numObject = array_rand($arrayHash,1);
#$object = $arrayHash[$numObject];
#$encobject = password_hash($object,PASSWORD_DEFAULT);

if($type=="create") {
    $result = $database->prepare("SELECT * FROM AppUser WHERE email=?");
    $result->bind_param('s',$email);
    $result->execute();
    $result->store_result();
    $rowcount = $result->num_rows;
    if($rowcount == 0) {
        $result = $database->prepare("INSERT INTO AppUser(email,passwd) VALUES (?,?)");
        $result->bind_param('ss',$email,$encpasswd);
        $result->execute();
        echo ("succ");
        #sendVerificationEmail($email, $encobject);
    } else {
        echo ("err1");
    }
} else {
    $result = $database->prepare("SELECT passwd, isAdmin, isSuperAdmin FROM AppUser WHERE email=?");
    $result->bind_param('s',$email);
    $result->execute();
    $result->store_result();
    $result->bind_result($passwdHash,$isAdmin,$isSuperAdmin);
    $rowcount = $result->num_rows;
    if($rowcount==1) {
        $result->fetch();
        if (password_verify($passwd,$passwdHash)){
            if($isAdmin) {
                $_SESSION['admin'] = $email;
                $_SESSION['sadmin'] = $isSuperAdmin;
                echo ("suca");
            } else {
                $_SESSION['user'] = $email;
                echo ("sucl");
            }
        } else {
            echo ("err2");
        }
    } else {
        echo ("err2");
    }
}
?>