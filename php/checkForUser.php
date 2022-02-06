<?php
ini_set('display_errors',1);

# Database con
// Database for local
$database = new mysqli('localhost', 'root', '', 'eravate');
// Database for ionos

if (isset($_COOKIE['user'])) {
    $result = $database->prepare("SELECT a.email, s.ID, a.isAdmin, a.isSuperAdmin FROM AppUser a, SessionID s WHERE a.email = s.user AND s.ID=?");
    $result->bind_param('s',$_COOKIE['user']);
    $result->execute();
    $result->store_result();
    $result->bind_result($email,$sessionID,$isAdmin,$isSuperAdmin);
    $rowcount = $result->num_rows;
    switch ($rowcount) {
        case 0:
            setcookie('user','',time() - 3600);
            switch ($location) {
                case 'admin': case 'index':
                    header("Location: login.php");
                    break;
            }
            break;
        default:
            $result->fetch();
            if ($_COOKIE['user'] == $sessionID){
                if ($isAdmin) {
                    $_SESSION['admin'] = $sessionID;
                    $_SESSION['adminMail'] = $email;
                    $_SESSION['sadmin'] = $isSuperAdmin;
                    setcookie('user','',time() - 3600);
                    setcookie('admin',$sessionID,time()+31556926,'/');
                    switch ($location) {
                        case 'login': case 'index':
                            header("Location: admin.php");
                            break;
                    }
                } else {
                    $_SESSION['user'] = $sessionID;
                    switch ($location) {
                        case 'login': case 'admin':
                            header("Location: index.php");
                            break;
                    }
                }
                break;
            }
            break;
    }
} else {
    if (isset($_COOKIE['admin'])) { 
        $result = $database->prepare("SELECT a.email, s.ID, a.isAdmin, a.isSuperAdmin FROM AppUser a, SessionID s WHERE a.email = s.user AND s.ID=?");
        $result->bind_param('s',$_COOKIE['admin']);
        $result->execute();
        $result->store_result();
        $result->bind_result($email,$sessionID,$isAdmin,$isSuperAdmin);
        $rowcount = $result->num_rows;
        switch ($rowcount) {
            case 0:
                setcookie('admin','',time() - 3600);
                switch ($location) {
                    case 'admin': case 'index':
                        header("Location: login.php");
                        break;
                }
                break;
            default:
                $result->fetch();
                if ($_COOKIE['admin'] == $sessionID){
                    if ($isAdmin) {
                        $_SESSION['admin'] = $sessionID;
                        $_SESSION['adminMail'] = $email;
                        $_SESSION['sadmin'] = $isSuperAdmin;
                        
                        switch ($location) {
                            case 'login': case 'index':
                                header("Location: admin.php");
                                break;
                        }
                    } else {
                        $_SESSION['user'] = $sessionID;
                        setcookie('admin','',time() - 3600);
                        setcookie('user',$sessionID,time()+31556926,'/');
                        switch ($location) {
                            case 'login': case 'admin':
                                header("Location: index.php");
                                break;
                        }
                    }
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

