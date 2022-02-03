<?php
ini_set('display_errors',1);

$database = new mysqli('localhost', 'root', '', 'eravate');

if (isset($_COOKIE['user'])) {
    $found=false;
    $result = $database->prepare("SELECT email, passwd, isAdmin, isSuperAdmin FROM AppUser");
    $result->execute();
    $result->store_result();
    $result->bind_result($email, $passwdHash,$isAdmin,$isSuperAdmin);
    $rowcount = $result->num_rows;
    while ($result->fetch()) {
        if ($_COOKIE['user'] == $passwdHash){
            if ($isAdmin) {
                $_SESSION['admin'] = $passwdHash;
                $_SESSION['adminMail'] = $email;
                $_SESSION['sadmin'] = $isSuperAdmin;
                setcookie('user','',time() - 3600);
                setcookie('admin',$passwdHash,time()+31556926,'/');
                switch ($location) {
                    case 'login': case 'index':
                        header("Location: admin.php");
                        break;
                }
            } else {
                $_SESSION['user'] = $passwdHash;
                switch ($location) {
                    case 'login': case 'admin':
                        header("Location: index.php");
                        break;
                }
            }
            $found=true;
            break;
        }
    }
    if($found==false) {
        setcookie('user','',time() - 3600);
        switch ($location) {
            case 'admin': case 'index':
                header("Location: login.php");
                break;
        }
    }
} else {
    if (isset($_COOKIE['admin'])) { 
        $found=false;
        $result = $database->prepare("SELECT email, passwd, isAdmin, isSuperAdmin FROM AppUser");
        $result->execute();
        $result->store_result();
        $result->bind_result($email, $passwdHash,$isAdmin,$isSuperAdmin);
        $rowcount = $result->num_rows;
        while ($result->fetch()) {
            if ($_COOKIE['admin'] == $passwdHash){
                if ($isAdmin) {
                    $_SESSION['admin'] = $passwdHash;
                    $_SESSION['adminMail'] = $email;
                    $_SESSION['sadmin'] = $isSuperAdmin;
                    
                    switch ($location) {
                        case 'login': case 'index':
                            header("Location: admin.php");
                            break;
                    }
                } else {
                    $_SESSION['user'] = $passwdHash;
                    setcookie('admin','',time() - 3600);
                    setcookie('user',$passwdHash,time()+31556926,'/');
                    switch ($location) {
                        case 'login': case 'admin':
                            header("Location: index.php");
                            break;
                    }
                }
                $found=true;
                break;
            }
        }
        if($found==false) {
            setcookie('admin','',time() - 3600);
            switch ($location) {
                case 'admin': case 'index':
                    header("Location: login.php");
                    break;
            }
        }
    } else {
        switch ($location) {
            case 'admin': case 'index':
                header("Location: login.php");
                break;
        }
    }
}
?>