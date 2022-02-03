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

$action=$_POST['action'];
$objArray=json_decode($_POST['objArray']);
$user=$_SESSION['adminMail'];
$zero = 0;

switch ($action) {
    // IF the submitted object is a star - FIRST IF IS FOR DETERMINING WHETHER IT'S A NEW STAR OR NOT
    case "star":
        if ($objArray[0]=="no") {
            $result = $database->prepare("INSERT INTO Star(ID,name,rotation,revolution,radius,temp,overviewTXT,overviewSor,overviewURL,internalTXT,internalSor,
                                        internalURL,surfaceTXT,surfaceSor,surfaceURL,startype) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
            $result->bind_param('isssssssssssssss',$zero,$objArray[1],$objArray[2],$objArray[3],$objArray[4],$objArray[5],$objArray[6],$objArray[7],$objArray[8],
                                $objArray[9],$objArray[10],$objArray[11],$objArray[12],$objArray[13],$objArray[14],$objArray[15]);
            $actionDone = "Added Star ".$objArray[1];
            $objAffected = 0;
        } else {
            $result = $database->prepare("UPDATE Star SET name=?, rotation=?, revolution=?, radius=?, temp=?, overviewTXT=?, overviewSor=?, overviewURL=?, 
                                        internalTXT=?, internalSor=?, internalURL=?, surfaceTXT=?, surfaceSor=?, surfaceURL=?, startype=? WHERE ID=?");
            $result->bind_param('sssssssssssssssi',$objArray[1],$objArray[2],$objArray[3],$objArray[4],$objArray[5],$objArray[6],$objArray[7],$objArray[8],
                                $objArray[9],$objArray[10],$objArray[11],$objArray[12],$objArray[13],$objArray[14],$objArray[15],$objArray[0]);
            $actionDone = "Modified Star ".$objArray[1];
            $objAffected = $objArray[0];
        }
        $result->execute();
        break;
    case "planet":
    // IF the submitted object is a planet - FIRST IF IS FOR DETERMINING WHETHER IT'S A NEW PLANET OR NOT
        if ($objArray[0]=="no") {
            $result = $database->prepare("INSERT INTO Planet(ID,star,name,position,rotation,revolution,radius,temp,overviewTXT,overviewSor,overviewURL,internalTXT,internalSor,
                                        internalURL,surfaceTXT,surfaceSor,surfaceURL) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
            $result->bind_param('issssssssssssssss',$zero,$objArray[1],$objArray[2],$objArray[3],$objArray[4],$objArray[5],$objArray[6],$objArray[7],$objArray[8],
                                $objArray[9],$objArray[10],$objArray[11],$objArray[12],$objArray[13],$objArray[14],$objArray[15],$objArray[16]);
            $actionDone = "Added Planet ".$objArray[2];
            $objAffected = 0;
        } else {
            $result = $database->prepare("UPDATE Planet SET star=?, name=?, position=?, rotation=?, revolution=?, radius=?, temp=?, overviewTXT=?, overviewSor=?, overviewURL=?, 
                                        internalTXT=?, internalSor=?, internalURL=?, surfaceTXT=?, surfaceSor=?, surfaceURL=? WHERE ID=?");
            $result->bind_param('ssssssssssssssssi',$objArray[1],$objArray[2],$objArray[3],$objArray[4],$objArray[5],$objArray[6],$objArray[7],$objArray[8],
                                $objArray[9],$objArray[10],$objArray[11],$objArray[12],$objArray[13],$objArray[14],$objArray[15],$objArray[16],$objArray[0]);
            $actionDone = "Modified Planet ".$objArray[2];
            $objAffected = $objArray[0];
        }
        $result->execute();
        break;
    case "npo":
    // IF the submitted object is a NPO - FIRST IF IS FOR DETERMINING WHETHER IT'S A NEW NPO OR NOT
        if ($objArray[0]=="no") {
            $result = $database->prepare("INSERT INTO NPO(ID,star,name,rotation,revolution,radius,temp,overviewTXT,overviewSor,overviewURL,internalTXT,internalSor,
                                        internalURL,surfaceTXT,surfaceSor,surfaceURL) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
            $result->bind_param('isssssssssssssss',$zero,$objArray[1],$objArray[2],$objArray[3],$objArray[4],$objArray[5],$objArray[6],$objArray[7],$objArray[8],
                                $objArray[9],$objArray[10],$objArray[11],$objArray[12],$objArray[13],$objArray[14],$objArray[15]);
            $actionDone = "Added NPO ".$objArray[2];
            $objAffected = 0;
        } else {
            $result = $database->prepare("UPDATE NPO SET star=?, name=?, rotation=?, revolution=?, radius=?, temp=?, overviewTXT=?, overviewSor=?, overviewURL=?, 
                                        internalTXT=?, internalSor=?, internalURL=?, surfaceTXT=?, surfaceSor=?, surfaceURL=? WHERE ID=?");
            $result->bind_param('sssssssssssssssi',$objArray[1],$objArray[2],$objArray[3],$objArray[4],$objArray[5],$objArray[6],$objArray[7],$objArray[8],
                                $objArray[9],$objArray[10],$objArray[11],$objArray[12],$objArray[13],$objArray[14],$objArray[15],$objArray[0]);
            $actionDone = "Modified NPO ".$objArray[2];
            $objAffected = $objArray[0];
        }
        $result->execute();
        break;
    case "satellite":
    // IF the submitted object is a satellite - FIRST IF IS FOR DETERMINING WHETHER IT'S A NEW SATELLITE OR NOT
        if ($objArray[0]=="no") {
            $result = $database->prepare("INSERT INTO Satellite(ID,planet,name,position,rotation,revolution,radius,temp,overviewTXT,overviewSor,overviewURL,internalTXT,internalSor,
                                        internalURL,surfaceTXT,surfaceSor,surfaceURL) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
            $result->bind_param('issssssssssssssss',$zero,$objArray[1],$objArray[2],$objArray[3],$objArray[4],$objArray[5],$objArray[6],$objArray[7],$objArray[8],
                                $objArray[9],$objArray[10],$objArray[11],$objArray[12],$objArray[13],$objArray[14],$objArray[15],$objArray[16]);
            $actionDone = "Added Satellite ".$objArray[2];
            $objAffected = 0;
        } else {
            $result = $database->prepare("UPDATE Satellite SET planet=?, name=?, position=?, rotation=?, revolution=?, radius=?, temp=?, overviewTXT=?, overviewSor=?, overviewURL=?, 
                                        internalTXT=?, internalSor=?, internalURL=?, surfaceTXT=?, surfaceSor=?, surfaceURL=? WHERE ID=?");
            $result->bind_param('ssssssssssssssssi',$objArray[1],$objArray[2],$objArray[3],$objArray[4],$objArray[5],$objArray[6],$objArray[7],$objArray[8],
                                $objArray[9],$objArray[10],$objArray[11],$objArray[12],$objArray[13],$objArray[14],$objArray[15],$objArray[16],$objArray[0]);
            $actionDone = "Modified Satellite ".$objArray[2];
            $objAffected = $objArray[0];
        }
        $result->execute();
        break;
}

// Inserting into admin logs to keep control

$result = $database->prepare("INSERT INTO AdminLogs(ID,user,action,objectAffected) VALUES (?,?,?,?)");
$result->bind_param('issi',$zero,$user,$actionDone,$objAffected);
$result->execute();

echo ("success");
?>
