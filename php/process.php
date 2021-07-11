<?php
    ini_set('display_errors',1);
    session_start();

    # Database con
    $database = new mysqli('localhost', 'root', '', 'eravate');
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
            echo json_encode("succ");
            #sendVerificationEmail($email, $encobject);
        } else {
            echo json_encode("err1");
        }
    } else {
        $result = $database->prepare("SELECT passwd FROM AppUser WHERE email=?");
        $result->bind_param('s',$email);
        $result->execute();
        $result->store_result();
        $result->bind_result($passwdHash);
        $rowcount = $result->num_rows;
        if($rowcount==1) {
            $result->fetch();
            if (password_verify($passwd,$passwdHash)){
                $_SESSION['user'] = $encemail;
                echo json_encode("sucl");
            } else {
                echo json_encode("err3");
            }
        } else {
            echo json_encode("err2");
        }
    }
?>