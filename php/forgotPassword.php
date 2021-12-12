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
//$database = new mysqli('db5005997291.hosting-data.io','dbu1086761','Erawaito2021','dbs5024145');
mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_INDEX);
$database->stmt_init();

$actionDone = "";

$action=$_POST['action'];
$data=$_POST['data'];
$goAhead;

switch ($action) {
    // When the action is send email, first query is for determining whether such email exists in the DB
    case "sendEmail":
        $email = $data;
        $database->stmt_init();
        $result = $database->prepare("SELECT email FROM AppUser WHERE email=?");
        $result->bind_param('s',$email);
        $result->execute();
        $result->store_result();
        $result->bind_result($emailQ);

        $rowcount = $result->num_rows;
        switch ($rowcount) {
            case 0:
                $goAhead = false;
                break;
            default:
                $goAhead = true;
                break;
            }

        if ($goAhead) {
            //Generate a random string.
            $token = openssl_random_pseudo_bytes(16);

            //Convert the binary data into hexadecimal representation.
            $token = bin2hex($token);

            $result = $database->prepare("UPDATE AppUser SET tokenRes=? WHERE email=?");
            $result->bind_param('ss',$token,$email);
            $result->execute();

            // Here we send the EMAIL using PHPMailer
            $mail = new PHPMailer(true);

            try {
                //Server settings
                $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
                $mail->isSMTP();                                            //Send using SMTP
                $mail->Host       = 'smtp.ionos.es';                     //Set the SMTP server to send through
                $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                $mail->Username   = 'arkadiusz@eravate.es';                     //SMTP username
                $mail->Password   = '5aFMKt#!T7A5Qz#x';                               //SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
                $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

                //Recipients
                $mail->setFrom('arkadiusz@eravate.es', 'Project: Eravate!');
                $mail->addAddress($email);     //Add a recipient

                $mail->AddEmbeddedImage('../icons/mailer.jpg', 'mailer');

                //Content
                $mail->isHTML(true);                                  //Set email format to HTML
                $mail->Subject = 'Project: Eravate! Password Reset';
                $mail->Body    = 'In order to reset your password, you need to <a href="eravate.es/forgotten.php?restoken='.$token.'">click here!</a> to reset your password!';

                $mail->Body    = "
                                    <html><head></head>
                                    <body>
                                        <div style='width:500px;height:700px;color:black;display:flex;align-items:center;justify-content:center;'>
                                            <div style='position:absolute;text-align:center;'>
                                                <h1 style='font-size:40px'>Project: Eravate!</h1>
                                                <h3>Reset your password down below.</h3>
                                                <p><a href='eravate.es/forgotten.php?restoken=".$token."' style='text-decoration:none;color:black;font-weight:bold;'>Click Here!</a></p>
                                                <p style='font-size:10px'>Note: if you haven't requested this password change, make sure to change your password immediately.</p>
                                            </div>
                                        </div>
                                    </body>
                                    </html>
                ";

                $mail->send();
            } catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
        }
        break;
    case "changePasswd":
        $passwd = $data;
        $empty = "";
        $encpasswd = password_hash($passwd,PASSWORD_DEFAULT);
        $token = $_SESSION['restoken'];
        $database->stmt_init();
        $result = $database->prepare("UPDATE AppUser SET passwd=?, tokenRes=? WHERE tokenRes=?");
        $result->bind_param('sss',$encpasswd,$empty,$token);
        $result->execute();
        break;
}

// Inserting into admin logs to keep control

echo ("success");
?>
