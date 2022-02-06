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
$textureExists = 0;

$result = $database->prepare("SELECT ID FROM Star WHERE name = ? UNION SELECT ID FROM Planet WHERE name = ? UNION SELECT ID FROM NPO WHERE name = ? UNION SELECT ID FROM Satellite WHERE name = ?");
$result->bind_param('ssss',$objArray[1],$objArray[2],$objArray[2],$objArray[2]);
$result->execute();
$result->store_result();
$result->bind_result($idExistsObject);

$rowcount = $result->num_rows;
if ($rowcount==0) {
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
    
                // If a texture is uploaded
                if (isset($_FILES['texture'])) {
                    $dir = '../models/';
                    $uploadfile = $dir . $objArray[2] . '.jpg';
                    if (move_uploaded_file($_FILES['texture']['tmp_name'], $uploadfile)) {
                        $textureExists = 1;
                    } else {
                        echo "Error";
                        break;
                    }
                }
    
                $result = $database->prepare("INSERT INTO Planet(ID,star,name,position,rotation,revolution,radius,temp,overviewTXT,overviewSor,overviewURL,internalTXT,internalSor,
                                            internalURL,surfaceTXT,surfaceSor,surfaceURL,3D) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
                $result->bind_param('issssssssssssssssi',$zero,$objArray[1],$objArray[2],$objArray[3],$objArray[4],$objArray[5],$objArray[6],$objArray[7],$objArray[8],
                                    $objArray[9],$objArray[10],$objArray[11],$objArray[12],$objArray[13],$objArray[14],$objArray[15],$objArray[16],$textureExists);
                $actionDone = "Added Planet ".$objArray[2];
                $objAffected = 0;
    
            } else {
    
                $result = $database->prepare("SELECT 3D, name FROM Planet WHERE ID=?");
                $result->bind_param('i',$objArray[0]);
                $result->execute();
                $result->store_result();
                $result->bind_result($textureExists,$nameExists);
                $result->fetch();
    
                //If it has a texture, we have to either rename it or delete it and update it
    
                if ($textureExists == 1) {
                    if (isset($_FILES['texture'])) {
                        if (file_exists('../models/'.$nameExists.'.jpg')) {
                            unlink('../models/'.$nameExists.'.jpg');
                        }
                    } else {
                        if (file_exists('../models/'.$nameExists.'.jpg')) {
                            rename('../models/'.$nameExists.'.jpg','../models/'.$objArray[2].'.jpg');
                        }
                    }
                    
                }
    
                // If a texture is uploaded
    
                if (isset($_FILES['texture'])) {
                    $dir = '../models/';
                    $uploadfile = $dir . $objArray[2] . '.jpg';
                    if (move_uploaded_file($_FILES['texture']['tmp_name'], $uploadfile)) {
                        $textureExists = 1;
                    } else {
                        echo "Error";
                        break;
                    }
                }
                $result = $database->prepare("UPDATE Planet SET star=?, name=?, position=?, rotation=?, revolution=?, radius=?, temp=?, overviewTXT=?, overviewSor=?, overviewURL=?, 
                                            internalTXT=?, internalSor=?, internalURL=?, surfaceTXT=?, surfaceSor=?, surfaceURL=?, 3D=? WHERE ID=?");
                $result->bind_param('ssssssssssssssssii',$objArray[1],$objArray[2],$objArray[3],$objArray[4],$objArray[5],$objArray[6],$objArray[7],$objArray[8],
                                    $objArray[9],$objArray[10],$objArray[11],$objArray[12],$objArray[13],$objArray[14],$objArray[15],$objArray[16],$textureExists,$objArray[0]);
                $actionDone = "Modified Planet ".$objArray[2];
                $objAffected = $objArray[0];
            }
            $result->execute();
            break;
        case "npo":
        // IF the submitted object is a NPO - FIRST IF IS FOR DETERMINING WHETHER IT'S A NEW NPO OR NOT
            if ($objArray[0]=="no") {
    
                // If a texture is uploaded
    
                if (isset($_FILES['texture'])) {
                    $dir = '../models/';
                    $uploadfile = $dir . $objArray[2] . '.jpg';
                    if (move_uploaded_file($_FILES['texture']['tmp_name'], $uploadfile)) {
                        $textureExists = 1;
                    } else {
                        echo "Error";
                        break;
                    }
                }
                $result = $database->prepare("INSERT INTO NPO(ID,star,name,rotation,revolution,radius,temp,overviewTXT,overviewSor,overviewURL,internalTXT,internalSor,
                                            internalURL,surfaceTXT,surfaceSor,surfaceURL,3D) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
                $result->bind_param('isssssssssssssssi',$zero,$objArray[1],$objArray[2],$objArray[3],$objArray[4],$objArray[5],$objArray[6],$objArray[7],$objArray[8],
                                    $objArray[9],$objArray[10],$objArray[11],$objArray[12],$objArray[13],$objArray[14],$objArray[15],$textureExists);
                $actionDone = "Added NPO ".$objArray[2];
                $objAffected = 0;
            } else {
    
                $result = $database->prepare("SELECT 3D, name FROM NPO WHERE ID=?");
                $result->bind_param('i',$objArray[0]);
                $result->execute();
                $result->store_result();
                $result->bind_result($textureExists,$nameExists);
                $result->fetch();
                
                //If it has a texture, we have to either rename it or delete it and update it
    
                if ($textureExists == 1) {
                    if (isset($_FILES['texture'])) {
                        if (file_exists('../models/'.$nameExists.'.jpg')) {
                            unlink('../models/'.$nameExists.'.jpg');
                        }
                    } else {
                        if (file_exists('../models/'.$nameExists.'.jpg')) {
                            rename('../models/'.$nameExists.'.jpg','../models/'.$objArray[2].'.jpg');
                        }
                    }
                    
                }
    
                // If a texture is uploaded
    
                if (isset($_FILES['texture'])) {
                    $dir = '../models/';
                    $uploadfile = $dir . $objArray[2] . '.jpg';
                    if (move_uploaded_file($_FILES['texture']['tmp_name'], $uploadfile)) {
                        $textureExists = 1;
                    } else {
                        echo "Error";
                        break;
                    }
                }
                $result = $database->prepare("UPDATE NPO SET star=?, name=?, rotation=?, revolution=?, radius=?, temp=?, overviewTXT=?, overviewSor=?, overviewURL=?, 
                                            internalTXT=?, internalSor=?, internalURL=?, surfaceTXT=?, surfaceSor=?, surfaceURL=?, 3D=? WHERE ID=?");
                $result->bind_param('sssssssssssssssii',$objArray[1],$objArray[2],$objArray[3],$objArray[4],$objArray[5],$objArray[6],$objArray[7],$objArray[8],
                                    $objArray[9],$objArray[10],$objArray[11],$objArray[12],$objArray[13],$objArray[14],$objArray[15],$textureExists,$objArray[0]);
                $actionDone = "Modified NPO ".$objArray[2];
                $objAffected = $objArray[0];
            }
            $result->execute();
            break;
        case "satellite":
        // IF the submitted object is a satellite - FIRST IF IS FOR DETERMINING WHETHER IT'S A NEW SATELLITE OR NOT
            if ($objArray[0]=="no") {
    
                // If a texture is uploaded
    
                if (isset($_FILES['texture'])) {
                    $dir = '../models/';
                    $uploadfile = $dir . $objArray[2] . '.jpg';
                    if (move_uploaded_file($_FILES['texture']['tmp_name'], $uploadfile)) {
                        $textureExists = 1;
                    } else {
                        echo "Error";
                        break;
                    }
                }
                $result = $database->prepare("INSERT INTO Satellite(ID,planet,name,position,rotation,revolution,radius,temp,overviewTXT,overviewSor,overviewURL,internalTXT,internalSor,
                                            internalURL,surfaceTXT,surfaceSor,surfaceURL,3D) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
                $result->bind_param('issssssssssssssssi',$zero,$objArray[1],$objArray[2],$objArray[3],$objArray[4],$objArray[5],$objArray[6],$objArray[7],$objArray[8],
                                    $objArray[9],$objArray[10],$objArray[11],$objArray[12],$objArray[13],$objArray[14],$objArray[15],$objArray[16],$textureExists);
                $actionDone = "Added Satellite ".$objArray[2];
                $objAffected = 0;
            } else {
    
                $result = $database->prepare("SELECT 3D, name FROM Satellite WHERE ID=?");
                $result->bind_param('i',$objArray[0]);
                $result->execute();
                $result->store_result();
                $result->bind_result($textureExists,$nameExists);
                $result->fetch();
                
                //If it has a texture, we have to either rename it or delete it and update it
    
                if ($textureExists == 1) {
                    if (isset($_FILES['texture'])) {
                        if (file_exists('../models/'.$nameExists.'.jpg')) {
                            unlink('../models/'.$nameExists.'.jpg');
                        }
                    } else {
                        if (file_exists('../models/'.$nameExists.'.jpg')) {
                            rename('../models/'.$nameExists.'.jpg','../models/'.$objArray[2].'.jpg');
                        }
                    }
                    
                }
    
                // If a texture is uploaded
    
                if (isset($_FILES['texture'])) {
                    $dir = '../models/';
                    $uploadfile = $dir . $objArray[2] . '.jpg';
                    if (move_uploaded_file($_FILES['texture']['tmp_name'], $uploadfile)) {
                        $textureExists = 1;
                    } else {
                        echo "Error";
                        break;
                    }
                }
                $result = $database->prepare("UPDATE Satellite SET planet=?, name=?, position=?, rotation=?, revolution=?, radius=?, temp=?, overviewTXT=?, overviewSor=?, overviewURL=?, 
                                            internalTXT=?, internalSor=?, internalURL=?, surfaceTXT=?, surfaceSor=?, surfaceURL=?, 3D=? WHERE ID=?");
                $result->bind_param('ssssssssssssssssii',$objArray[1],$objArray[2],$objArray[3],$objArray[4],$objArray[5],$objArray[6],$objArray[7],$objArray[8],
                                    $objArray[9],$objArray[10],$objArray[11],$objArray[12],$objArray[13],$objArray[14],$objArray[15],$objArray[16],$textureExists,$objArray[0]);
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
} else {
    echo ('errName');
}

?>
