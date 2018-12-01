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
require_once './php/sql/tickets.php';

$out["error"][] = NULL;
$out["data"] = NULL;

if(isset($input['request'])) {
    switch ($input['request']) {
        case "SELECT" : 
            debug_print("SELECT");
            //Check access level
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 1)) {
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
            
            if(($data = selectId($db, $id))) {
                $out["data"] = $data;
            } else $out["error"][] = "Not found";
            
            break;
            
        case "SELECT_PROJECTION" : 
            debug_print("SELECT_PROJECTION");            
            //Check access level
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 1)) {
                $out["error"][] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["idProjection"])) {
                $out["error"][] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["idProjection"]);
            
            if(($data = selectProjection($db, $id))) {
                $out["data"] = $data;
            } else $out["error"][] = "Not found";
            
            break;
            
        case "SELECT_RESERVATION" : 
            debug_print("SELECT_RESERVATION");            
            //Check access level
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 1)) {
                $out["error"][] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["idReservation"])) {
                $out["error"][] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["idReservation"]);
            
            if(($data = selectReservation($db, $id))) {
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
