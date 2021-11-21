<?php 
ini_set('display_errors',1);
session_start();
# Database Con
$database = new mysqli('localhost', 'root', '', 'eravate');

$queryname = $_POST['solar'];
$objects = array();

mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_INDEX);

$database->stmt_init();
$result = $database->prepare("SELECT 'star', ID, name FROM Star WHERE name = ? UNION SELECT 'planet', ID, name FROM Planet WHERE name = ? UNION SELECT 'npo', ID, name FROM NPO WHERE name = ? UNION SELECT 'satellite', ID, name FROM Satellite WHERE name = ?");
$result->bind_param('ssss',$queryname,$queryname,$queryname,$queryname);
$result->execute();
$result->store_result();
$result->bind_result($type,$id,$name);

$rowcount = $result->num_rows;
switch ($rowcount) {
    case 0:
        $sun = 1
        break;
    case 1:
        $result->fetch();
        switch ($type):
            // If the object that was searched for was a Star
            case "star":
                $database->stmt_init();
                $result = $database->prepare("SELECT s.ID, s.name, s.rotation, s.revolution, s.radius, s.temp, s.overviewTXT, s.overviewSor, s.overviewURL, s.internalTXT, s.internalSor, s.internalURL, s.surfaceTXT, s.surfaceSor, s.surfaceURL, t.name FROM Star s, Startype t WHERE s.ID=? AND s.startype = t.ID
                                            UNION SELECT p.ID, p.name, p.rotation, p.revolution, p.radius, p.temp, p.overviewTXT, p.overviewSor, p.overviewURL, p.internalTXT, p.internalSor, p.internalURL, p.surfaceTXT, p.surfaceSor, p.surfaceURL, p.3D FROM Planet p WHERE Star=?");
                $result->bind_param('ii',$id,$id);
                $result->execute();
                $result->store_result();
                $result->bind_result($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                                    $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);

                $rowcount = $result->num_rows;
                switch ($rowcount) {
                    case 0:
                        break;
                    default:
                        while ($result->fetch()) {
                            $sun = array($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                                            $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);
                            array_push($objects, $sun);
                        }
                        break;
                    }
                break;
            // If the object that was searched for was a Star - Uses subquery to determine ID
            case "planet":
                $database->stmt_init();
                $result = $database->prepare("SELECT s.ID, s.name, s.rotation, s.revolution, s.radius, s.temp, s.overviewTXT, s.overviewSor, s.overviewURL, s.internalTXT, s.internalSor, s.internalURL, s.surfaceTXT, s.surfaceSor, s.surfaceURL, t.name FROM Star s, Startype t WHERE s.ID=(SELECT Star FROM Planet Where ID=?) AND s.startype = t.ID
                                            UNION SELECT p.ID, p.name, p.rotation, p.revolution, p.radius, p.temp, p.overviewTXT, p.overviewSor, p.overviewURL, p.internalTXT, p.internalSor, p.internalURL, p.surfaceTXT, p.surfaceSor, p.surfaceURL, p.3D FROM Planet p WHERE Star=?");
                $result->bind_param('ii',$id,$id);
                $result->execute();
                $result->store_result();
                $result->bind_result($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                                    $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);

                $rowcount = $result->num_rows;
                switch ($rowcount) {
                    case 0:
                        break;
                    default:
                        while ($result->fetch()) {
                            $sun = array($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                                            $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);
                            array_push($objects, $sun);
                        }
                        break;
                    }
                break;
            // If the object that was searched for was a Star
            case: "npo":
                $database->stmt_init();
                $result = $database->prepare("SELECT s.ID, s.name, s.rotation, s.revolution, s.radius, s.temp, s.overviewTXT, s.overviewSor, s.overviewURL, s.internalTXT, s.internalSor, s.internalURL, s.surfaceTXT, s.surfaceSor, s.surfaceURL, t.name FROM Star s, Startype t WHERE s.ID=(SELECT Star FROM NPO Where ID=?) AND s.startype = t.ID
                                            UNION SELECT n.ID, n.name, n.rotation, n.revolution, n.radius, n.temp, n.overviewTXT, n.overviewSor, n.overviewURL, n.internalTXT, n.internalSor, n.internalURL, n.surfaceTXT, n.surfaceSor, n.surfaceURL, n.3D FROM NPO n WHERE Star=?");
                $result->bind_param('ii',$id,$id);
                $result->execute();
                $result->store_result();
                $result->bind_result($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                                    $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);

                $rowcount = $result->num_rows;
                switch ($rowcount) {
                    case 0:
                        break;
                    default:
                        while ($result->fetch()) {
                            $sun = array($id,$name,$rotation,$revolution,$radius,$temp,$overviewTXT,$overviewSor,$overviewURL,
                                            $internalTXT,$internalSor,$internalURL,$surfaceTXT,$surfaceSor,$surfaceURL,$threed);
                            array_push($objects, $sun);
                        }
                        break;
                    }
                break;
            // If the object that was searched for was a Star, This one's where it get tricky, since it uses subqueries within subqueries.
            case: "satellite":
                break;
        break;
    default:
        $sun = 2
        break;
    }

echo json_encode($objects);
?>
