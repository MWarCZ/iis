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
require_once './php/sql/reservations.php';

$out["error"] = NULL;
$out["data"] = NULL;

if(isset($input['request'])) {
    switch ($input['request']) {
        case "RESERVE" : 
            debug_print("RESERVE");
            //Check access level
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 1)) {
                $out["error"] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["tickets"])) {
                $out["error"] = "Missing some input";
                break;
            }
            
            if(!isset($input["data"]["idUser"])) $input["data"]["idUser"] = null;
            
            //Get data from inputs
            $idUser = htmlspecialchars($input["data"]["idUser"]);
            $tickets = $input["data"]["tickets"];
            
            if(($id = insert($db))) {
              $out["data"] = $id;
            } else $out["error"] = "SQL Error";
            
            //Add reservation
            if($idUser != null){                
                if(($id = insert($db, $idUser))) {
                    $out["data"] = $id;
                  } else $out["error"] = "SQL Error";
            } else {
                if(($id = insert_null($db))) {
                    $out["data"] = $id;
                  } else $out["error"] = "SQL Error";
            }
            
            
            //Add tickets 
            foreach ($tickets as $key => &$ticket) {
                //All input set check
                if( !isset($ticket["idDiscount"]) &&
                    !isset($ticket["idProjection"]) &&
                    !isset($ticket["seatNumber"])) {
                    
                    $out["error"] = "Missing some input";
                    continue;
                }
                
                //Get ticket data
                $idProjection = htmlspecialchars($ticket["idProjection"]);
                $idDiscount = htmlspecialchars($ticket["idDiscount"]);
                $price = projectionPrice($db, $id);
                $discount = dicount($db, $idDiscount);
                $seatNumber = htmlspecialchars($ticket["seatNumber"]);
                
                //Add ticket
                if(!addTicket($db, $price, $discount, $id, $idDiscount, $idProjection, $seatNumber)) $out["error"] = "SQL Error";
            }
            
            //Update totalPrice for reservation
            update_totalPrice($db, $id);
            
            break;
            
        case "CANCEL" : 
            debug_print("CANCEL");
            //Check access level
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 1)) {
                $out["error"] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["id"])) {
                $out["error"] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["id"]);
            
            //Delete tickets
            if(!delTicket_reservation($db, $id)) $out["error"] = "Delete tickets error";
            else $out["data"] = true;
            
            //Delete reservation
            if(!delete($db, $id)) $out["error"] = "Delete reservation error";
            else $out["data"] = true;
            
            break;
        
        case "CANCEL_ALL" : 
            debug_print("CANCEL_ALL");
            //Check access level
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 1)) {
                $out["error"] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["idUser"])) {
                $out["error"] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["idUser"]);
            
            //Delete tickets
            if(!delTicket_user($db, $id)) $out["error"] = "Delete tickets error";
            else $out["data"] = true;
            
            //Delete reservations
            if(delete_user($db, $id)) {
                $out["data"] = true;
            } else $out["error"] = "SQL Error";
            
            break;
            
        case "PAY" : 
            debug_print("PAY");
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 1)) {
                $out["error"] = "You don't have enough permissions";
                break;
            }
            
            if(pay($db, $id)) {
                $out["data"] = true;
            } else $out["error"] = "SQL Error";
            
            break;
        
        case "PICK" : 
            debug_print("PICK");
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 2)) {
                $out["error"] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["id"])) {
                $out["error"] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["id"]);
            
            if(($data = selectId($db, $id))) {
                $out["data"] = $data;
            } else $out["error"] = "Not found";
            
            break;
            
        case "SELECT" : 
            debug_print("SELECT");
            //Check access level
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 1)) {
                $out["error"] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["id"])) {
                $out["error"] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["id"]);
            
            if(($data = selectId($db, $id))) {
                $out["data"] = $data;
            } else $out["error"] = "Not found";
            
            break;
            
        case "SELECT_ALL" : 
            debug_print("SELECT_ALL");
            //Check access level
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 2)) {
                $out["error"] = "You don't have enough permissions";
                break;
            }
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["id"]);
            
            if(($data = selectAll($db, $id))) {
                $out["data"] = $data;
            } else $out["error"] = "Not found";
            
            break;
        
        case "SELECT_USER" : 
            debug_print("SELECT_USER");
            //Check access level
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 1)) {
                $out["error"] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["id"])) {
                $out["error"] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["id"]);
            
            if(($data = selectId($db, $id))) {
                $out["data"] = $data;
            } else $out["error"] = "Not found";
            
            break;
        
        default :
            $out["error"] = "Wrong request type";
            break;
    }
    
    //Data and error was not set -> error
    if(!isset($out["data"]) && !isset($out["error"])) $out["error"] = "Request wasn't fullfiled";
} else $out["error"] = "Wrong request";


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
