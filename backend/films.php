<?php
//Start buffering data
ob_start();
  
//Start session
session_start();

//Connect to db
require_once './php/db_connect.php';

//Genaral requires
require_once './php/debug.php';
require_once './php/validation.php';
require_once './php/parse_input.php';

//SQL specific reguires
require_once './php/sql/films.php';

$out["error"] = NULL;
$out["data"] = NULL;

if(isset($input['request'])) {
    switch ($input['request']) {
        case "INSERT" : 
            debug_print("INSERT");
            //Check acces level
            if(!(isset($_SESSION["acces"]) && $_SESSION["acces"] >= 3)) {
                $out["error"] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["name"]) &&
                !isset($input["data"]["duration"]) &&
                !isset($input["data"]["released"]) &&
                !isset($input["data"]["rating"]) ) {
                $out["error"] = "Missing some input";
                break;
            }
            
            if(!isset($input["data"]["idDirector"])) $input["data"]["idDirector"] = null;
            if(!isset($input["data"]["idStudio"])) $input["data"]["idStudio"] = null;
            
            //Get data from inputs
            $name = htmlspecialchars($input["data"]["name"]);
            $duration = intval(htmlspecialchars($input["data"]["duration"]));
            $released = date('Y-m-d', strtotime(htmlspecialchars($input["data"]["released"])));
            $rating = htmlspecialchars($input["data"]["rating"]);
            $idDirector = htmlspecialchars($input["data"]["idDirector"]);
            $idStudio = htmlspecialchars($input["data"]["idStudio"]);
            
            if(($id = insert($db, $name, $duration, $released, $rating))) {
              $out["data"] = $id;
            } else $out["error"] = "SQL Error";
            
            //Bind Studio
            if($idStudio != null){                
                if(!bindStudio($db, $id, $idStudio)) $out["error"] = "Wrong studio or director";
            } else if(!unbindStudio($db, $id)) $out["error"] = "Wrong studio or director";
            
            //Bind director
            if($idDirector != null){                
                if(!bindDirector($db, $id, $idDirector)) $out["error"] = "Wrong studio or director";
            } else if(!unbindDirector($db, $id)) $out["error"] = "Wrong studio or director";
            
            break;
            
        case "UPDATE" : 
            debug_print("UPDATE");
            //Check acces level
            if(!(isset($_SESSION["acces"]) && $_SESSION["acces"] >= 3)) {
                $out["error"] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["name"]) &&
                !isset($input["data"]["duration"]) &&
                !isset($input["data"]["released"]) &&
                !isset($input["data"]["rating"]) ) {
                $out["error"] = "Missing some input";
                break;
            }
            
            if(!isset($input["data"]["idDirector"])) $input["data"]["idDirector"] = null;
            if(!isset($input["data"]["idStudio"])) $input["data"]["idStudio"] = null;
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["id"]);
            $name = htmlspecialchars($input["data"]["name"]);
            $duration = intval(htmlspecialchars($input["data"]["duration"]));
            $released = date('Y-m-d', strtotime(htmlspecialchars($input["data"]["released"])));
            $rating = htmlspecialchars($input["data"]["rating"]);
            $idDirector = htmlspecialchars($input["data"]["idDirector"]);
            $idStudio = htmlspecialchars($input["data"]["idStudio"]);
            
            if(!update($db, $id, $name, $duration, $released, $rating)) $out["error"] = "Update error";
            else $out["data"] = true;
            
            //Bind Sstudio
            if($idStudio != null){                
                if(!bindStudio($db, $id, $idStudio)) $out["error"] = "Wrong studio or director";
            } else unbindStudio($db, $id);
            
            //Bind director
            if($idDirector != null){                
                if(!bindDirector($db, $id, $idDirector)) $out["error"] = "Wrong studio or director";
            } else unbindDirector($db, $id);
            
            break;
        
        case "DELETE" : 
            debug_print("DELETE");
            //Check acces level
            if(!(isset($_SESSION["acces"]) && $_SESSION["acces"] >= 3)) {
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
            
            //Delete all actors in film
            if(delActors($db, $id)) {
                $out["data"] = true;
            } else $out["error"] = "SQL Error";
            
            //Delete all genres in film
            if(delGenres($db, $id)) {
                $out["data"] = true;
            } else $out["error"] = "SQL Error";
            
            //Delete films
            if(delete($db, $id)) {
                $out["data"] = true;
            } else $out["error"] = "SQL Error";
            
            break;
            
        case "SELECT_ALL" : 
            debug_print("SELECT_ALL");
            
            $data = selectAll($db);
            
            if($data) {
                $out["data"] = $data;
            } else $out["error"] = "Not found";
            
            break;
        
        case "SELECT" : 
            debug_print("SELECT");
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
            
        case "ADD_ACTOR" : 
            debug_print("ADD_ACTOR");
            //Check acces level
            if(!(isset($_SESSION["acces"]) && $_SESSION["acces"] >= 3)) {
                $out["error"] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["id"]) &&
                !isset($input["data"]["idActor"])) {
                $out["error"] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["id"]);
            $idActor = htmlspecialchars($input["data"]["idActor"]);
            
            if(($id = addActor($db, $id, $idActor))) {
              $out["data"] = $id;
            } else $out["error"] = "SQL Error";
            
            break;
        
            
        case "ADD_GENRE" : 
            debug_print("ADD_GENRE");
            //Check acces level
            if(!(isset($_SESSION["acces"]) && $_SESSION["acces"] >= 3)) {
                $out["error"] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["id"]) &&
                !isset($input["data"]["idGenre"])) {
                $out["error"] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["id"]);
            $idGenre = htmlspecialchars($input["data"]["idGenre"]);
            
            if(($id = addGenre($db, $id, $idGenre))) {
              $out["data"] = $id;
            } else $out["error"] = "SQL Error";
            
            break;
            
        case "DEL_ACTOR" : 
            debug_print("SELECT_ALL");
            //Check acces level
            if(!(isset($_SESSION["acces"]) && $_SESSION["acces"] >= 3)) {
                $out["error"] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["id"]) &&
                !isset($input["data"]["idActor"])) {
                $out["error"] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["id"]);
            $idActor = htmlspecialchars($input["data"]["idActor"]);
            
            if(delActor($db, $id, $idActor)) {
                $out["data"] = true;
            } else $out["error"] = "SQL Error";
            
            break;
        
            
        case "DEL_GENRE" : 
            debug_print("SELECT_ALL");
            //Check acces level
            if(!(isset($_SESSION["acces"]) && $_SESSION["acces"] >= 3)) {
                $out["error"] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["id"]) &&
                !isset($input["data"]["idGenre"])) {
                $out["error"] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["id"]);
            $idGenre = htmlspecialchars($input["data"]["idGenre"]);
            
            if(delGenre($db, $id, $idGenre)) {
                $out["data"] = true;
            } else $out["error"] = "SQL Error";
            
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
