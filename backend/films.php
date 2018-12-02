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
require_once './php/sql/films.php';

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
                !isset($input["data"]["duration"]) &&
                !isset($input["data"]["released"]) &&
                !isset($input["data"]["rating"]) &&
                !isset($input["data"]["genres"])) {
                $out["error"][] = "Missing some input";
                break;
            }
            
            if(!isset($input["data"]["idDirector"])) $input["data"]["idDirector"] = null;
            if(!isset($input["data"]["idStudio"])) $input["data"]["idStudio"] = null;
            if(!isset($input["data"]["idAccess"])) $input["data"]["idAccess"] = null;
            
            //Get data from inputs
            $name = htmlspecialchars($input["data"]["name"]);
            $duration = intval(htmlspecialchars($input["data"]["duration"]));
            $released = date('Y-m-d', strtotime(htmlspecialchars($input["data"]["released"])));
            $rating = htmlspecialchars($input["data"]["rating"]);
            $idDirector = htmlspecialchars($input["data"]["idDirector"]);
            $idStudio = htmlspecialchars($input["data"]["idStudio"]);
            $genres = $input["data"]["genres"];
            $idAccess = htmlspecialchars($input["data"]["idAccess"]);
            
            if(($id = insert($db, $name, $duration, $released, $rating, $idAccess))) {
              $out["data"] = $id;
            } else $out["error"][] = "SQL Error";
            
            //Bind Sstudio
            if($idStudio != null){                
                if(!bindStudio($db, $id, $idStudio)) $out["error"][] = "Wrong studio";
            } else unbindStudio($db, $id);
            
            //Bind director
            if($idDirector != null){                
                if(!bindDirector($db, $id, $idDirector)) $out["error"][] = "Wrong director";
            } else unbindDirector($db, $id);
            
            //Bind access
            if($idAccess != null){                
                if(!bindAccess($db, $id, $idAccess)) $out["error"][] = "Wrong access";
            } else unbindAccess($db, $id);
            
            //Validation of array genres
            if(!is_array($genres)) {
                $out["error"][] = "Exepting array of genres";
                break;
            }
            
            //Add genres            
            foreach ($genres as $key => &$genre) {
                if(!addGenre($db, $id, htmlspecialchars($genre))) $out["error"][] = "SQL Error";
            }
            
            break;
            
        case "UPDATE" : 
            debug_print("UPDATE");
            //Check access level
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 3)) {
                $out["error"][] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["name"]) &&
                !isset($input["data"]["duration"]) &&
                !isset($input["data"]["released"]) &&
                !isset($input["data"]["rating"]) &&
                !isset($input["data"]["genres"]) ) {
                $out["error"][] = "Missing some input";
                break;
            }
            
            if(!isset($input["data"]["idDirector"])) $input["data"]["idDirector"] = null;
            if(!isset($input["data"]["idStudio"])) $input["data"]["idStudio"] = null;
            if(!isset($input["data"]["idAccess"])) $input["data"]["idAccess"] = null;
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["id"]);
            $name = htmlspecialchars($input["data"]["name"]);
            $duration = intval(htmlspecialchars($input["data"]["duration"]));
            $released = date('Y-m-d', strtotime(htmlspecialchars($input["data"]["released"])));
            $rating = htmlspecialchars($input["data"]["rating"]);
            $idDirector = htmlspecialchars($input["data"]["idDirector"]);
            $idStudio = htmlspecialchars($input["data"]["idStudio"]);            
            $genres = $input["data"]["genres"];            
            $idAccess = htmlspecialchars($input["data"]["idAccess"]);
            
            if(!update($db, $id, $name, $duration, $released, $rating, $idAccess)) $out["error"][] = "Update error";
            else $out["data"] = true;
            
            //Bind Sstudio
            if($idStudio != null){                
                if(!bindStudio($db, $id, $idStudio)) $out["error"][] = "Wrong studio";
            } else unbindStudio($db, $id);
            
            //Bind director
            if($idDirector != null){                
                if(!bindDirector($db, $id, $idDirector)) $out["error"][] = "Wrong director";
            } else unbindDirector($db, $id);
            
            //Bind access
            if($idAccess != null){                
                if(!bindAccess($db, $id, $idAccess)) $out["error"][] = "Wrong access";
            } else unbindAccess($db, $id);
            
            //Validation of array genres
            if(!is_array($genres)) {
                $out["error"][] = "Exepting array of genres";
                break;
            }
            
            //Delete genres
            if(!delGenres($db, $id)) $out["error"][] = "Error during cleaning genres from film";
            
            //Add new genres
            foreach ($genres as $key => &$genre) {
                if(!addGenre($db, $id, htmlspecialchars($genre))) $out["error"][] = "SQL Error";
            }
            
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
            
            //Delete all actors in film
            if(delActors($db, $id)) {
                $out["data"] = true;
            } else $out["error"][] = "SQL Error";
            
            //Delete all genres in film
            if(delGenres($db, $id)) {
                $out["data"] = true;
            } else $out["error"][] = "SQL Error";
            
            //Delete films
            if(delete($db, $id)) {
                $out["data"] = true;
            } else $out["error"][] = "SQL Error";
            
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
            
        case "ADD_ACTOR" : 
            debug_print("ADD_ACTOR");
            //Check access level
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 3)) {
                $out["error"][] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["id"]) &&
                !isset($input["data"]["idActor"])) {
                $out["error"][] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["id"]);
            $idActor = htmlspecialchars($input["data"]["idActor"]);
            
            if(($id = addActor($db, $id, $idActor))) {
              $out["data"] = $id;
            } else $out["error"][] = "SQL Error";
            
            break;
            
        case "DEL_ACTOR" : 
            debug_print("SELECT_ALL");
            //Check access level
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 3)) {
                $out["error"][] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["id"]) &&
                !isset($input["data"]["idActor"])) {
                $out["error"][] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $id = htmlspecialchars($input["data"]["id"]);
            $idActor = htmlspecialchars($input["data"]["idActor"]);
            
            if(delActor($db, $id, $idActor)) {
                $out["data"] = true;
            } else $out["error"][] = "SQL Error";
            
            break;
            
        case "EARNINGS" : 
            debug_print("EARNINGS");
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
            
            if(($data = film_earnings($db, $id))) {
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
