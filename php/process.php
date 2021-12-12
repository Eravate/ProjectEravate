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
        //Generate a random string.
        $token = openssl_random_pseudo_bytes(16);

        //Convert the binary data into hexadecimal representation.
        $token = bin2hex($token);

        $result = $database->prepare("INSERT INTO AppUser(email,passwd,token) VALUES (?,?,?)");
        $result->bind_param('sss',$email,$encpasswd,$token);
        $result->execute();
        echo ("succ");

        $mail = new PHPMailer(true);

            try {
                //Server settings
                $mail->SMTPDebug = 0;                      //Enable verbose debug output
                $mail->isSMTP();                                            //Send using SMTP
                $mail->Host       = 'smtp.ionos.es';                     //Set the SMTP server to send through
                $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                $mail->Username   = 'arkadiusz@eravate.es';                     //SMTP username
                $mail->Password   = 'secret';                               //SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
                $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

                //Recipients
                $mail->setFrom('arkadiusz@eravate.es', 'Project: Eravate!');
                $mail->addAddress($email);     //Add a recipient

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
                                                <h3>Activate your account down below.</h3>
                                                <p><a href='eravate.es/activation.php?actoken=".$token."' style='text-decoration:none;color:black;font-weight:bold;'>Click Here!</a></p>
                                                <p style='font-size:10px'>If you haven't registered in our app, simply ignore this message.</p>
                                            </div>
                                        </div>
                                    </body>
                                    </html>
                ";

                $mail->send();
            } catch (Exception $e) {
            }
        #sendVerificationEmail($email, $encobject);
    } else {
        echo ("err1");
    }
} else {
    $result = $database->prepare("SELECT passwd, isAdmin, isSuperAdmin, token FROM AppUser WHERE email=?");
    $result->bind_param('s',$email);
    $result->execute();
    $result->store_result();
    $result->bind_result($passwdHash,$isAdmin,$isSuperAdmin,$token);
    $rowcount = $result->num_rows;
    if($rowcount==1) {
        $result->fetch();
        if (password_verify($passwd,$passwdHash)){
            if ($token == "") {
                if($isAdmin) {
                    $_SESSION['admin'] = $email;
                    $_SESSION['sadmin'] = $isSuperAdmin;
                    echo ("suca");
                } else {
                    $_SESSION['user'] = $email;
                    echo ("sucl");
                }
            } else {
                echo ("err3");
            }
        } else {
            echo ("err2");
        }
    } else {
        echo ("err2");
    }
}
?>