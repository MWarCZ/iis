<?php
//Start buffering data
ob_start();

//Connect to db
require_once './php/db_connect.php';

//Genaral requires
require_once './php/debug.php';
require_once './php/validation.php';
require_once './php/parse_input.php';

//SQL specific reguires
require_once './php/sql/directors.php';

$out["error"] = NULL;
$out["data"] = NULL;

if(isset($input['request'])) {
    switch ($input['request']) {
        case "INSERT" : 
            debug_print("INSERT");
            //Check access level
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 3)) {
                $out["error"][] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["name"]) &&
                !isset($input["data"]["surname"]) &&
                !isset($input["data"]["birthday"])) {
                $out["error"][] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $name = htmlspecialchars($input["data"]["name"]);
            $surname = htmlspecialchars($input["data"]["surname"]);
            $birthday = date('Y-m-d', strtotime(htmlspecialchars($input["data"]["birthday"])));
            
            if(($id = insert($db, $name, $surname, $birthday))) {
              $out["data"] = $id;
            } else $out["error"][] = "SQL Error";
            
            break;
            
        case "UPDATE" : 
            debug_print("UPDATE");
            //Check access level
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 3)) {
                $out["error"][] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["id"]) &&
                !isset($input["data"]["name"]) &&
                !isset($input["data"]["surname"]) &&
                !isset($input["data"]["birthday"])) {
                $out["error"][] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["id"]);
            $name = htmlspecialchars($input["data"]["name"]);
            $surname = htmlspecialchars($input["data"]["surname"]);
            $birthday = date('Y-m-d', strtotime(htmlspecialchars($input["data"]["birthday"])));
            
            if(!update($db, $id, $name, $surname, $birthday)) $out["error"][] = "Update error";
            else $out["data"] = true;
            
            break;
        
        case "DELETE" : 
            debug_print("DELETE");
            //Check access level
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 3)) {
                $out["error"][] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["id"])) {
                $out["error"][] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["id"]);
            
            //unbind director from film
            if(!unbindDirector($db, $id)) $out["error"][] = "Wrong studio or director";
            
            //Delete hall
            if(delete($db, $id)) {
                $out["data"] = true;
            } else $out["error"][] = "SQL Error - Film exist with this director";
            
            break;
            
        case "SELECT_ALL" : 
            debug_print("SELECT_ALL");
            
            $data = selectAll($db);
            
            if($data) {
                $out["data"] = $data;
            } else $out["error"][] = "Not found";
            
            break;
        
        case "SELECT" : 
            debug_print("SELECT");
            //All input set check
            if( !isset($input["data"]["id"])) {
                $out["error"][] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["id"]);
            
            if(($data = selectId($db, $id))) {
                $out["data"] = $data;
            } else $out["error"][] = "Not found";
            
            break;
            
        default :
            $out["error"][] = "Wrong request type";
            break;
    }
    
    //Data and error was not set -> error
    if(!isset($out["data"]) && !isset($out["error"])) $out["error"][] = "Request wasn't fullfiled";
} else $out["error"][] = "Wrong request";


//Data output
header("Content-Type: application/json");
if(isset($out)) {
    debug_print("DATA");
    echo json_encode($out);    
}

//Debug outpu employee data if is logged in
debug_print("\nSESSION " . session_id());
if(isset($_SESSION["id"])) debug_print("id :" . $_SESSION["id"] . ",login :" . $_SESSION["login"] . ",name :" . $_SESSION["name"] . ",surname :" . $_SESSION["surname"] . ",access :" . $_SESSION["access"]);
 
//Disconnect from db
$db = null;
$querry = null;

//Flush out data
ob_end_flush();
