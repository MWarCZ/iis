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
require_once './php/sql/users.php';

$out["error"] = NULL;
$out["data"] = NULL;

if(isset($input['request'])) {
    switch ($input['request']) {
        case "INSERT" : 
            debug_print("INSERT");
            //All input set check
            if( !isset($input["data"]["login"]) && 
                !isset($input["data"]["name"]) &&  
                !isset($input["data"]["surname"]) &&  
                !isset($input["data"]["email"]) &&  
                !isset($input["data"]["pass"]) && 
                !isset($input["data"]["pass_verifi"])) {
                $out["error"] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $login = htmlspecialchars($input["data"]["login"]);
            $name = htmlspecialchars($input["data"]["name"]);
            $surname = htmlspecialchars($input["data"]["surname"]);
            $email = htmlspecialchars($input["data"]["email"]);
            $pass = password_hash($input["data"]["pass"], PASSWORD_DEFAULT);
            
            //Verifi data
            if(!validate_email($email)) {
                $out["error"] = "Invalid email";
                break;
            }
            if(!validate_passw($pass)) {
                $out["error"] = "Invalid password";
                break;
            }
             
            //Exexute request
            if(user_exist($db, $login)) $out["error"] = "Login already used";
            else {
                if(password_verify($input["data"]["pass_verifi"], $pass)) {
                    if(!insert_user($db, $login, $name, $surname, $email, $pass)) $out["error"] = "Insert error";
                    else $out["data"] = true;
                } else $out["error"] = "Passwords don't match";
            }
            
            break;
            
        case "LOGIN" : 
            debug_print("LOGIN");
            if(isset($_SESSION["id"])) {
                $out["error"] = "Already logged in";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["login"]) && 
                !isset($input["data"]["pass"])) {
                $out["error"] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $login = htmlspecialchars($input["data"]["login"]);
            $pass = $input["data"]["pass"];
            
            
            //If user exist, verifi passwd and store data in session
            if(user_exist($db, $login )) {
                if(password_verify($pass, get_passwd ($db, $login))) {
                    $data = get_userData($db, $login);
                    
                    //SET data into session
                    $_SESSION = array(
                        "id"=>      $data["idUser"],
                        "login"=>   $data["login"],
                        "name"=>    $data["name"],
                        "surname"=> $data["surname"],
                        "email"=>   $data["email"],
                        "access"=>   1
                    );
                    $out["data"] = true;
                    
                } else {
                    $out["error"] = "Wrong password";
                }
            } else $out["error"] = "User don't exist";
            
            break;
            
        case "LOGOUT" : 
            debug_print("LOGOUT");
            
            if(isset($_SESSION["id"])) {
                session_unset();
                session_destroy();
                
                debug_print("Logged out");
                $out["data"] = true;
            }
            
            break;
        
        case "UPDATE" : 
            debug_print("UPDATE");
            
            if(isset($_SESSION["id"])) {
                $out["error"] = "You aren't loged in";            
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["login"]) && 
                !isset($input["data"]["pass"]) && 
                !isset($input["data"]["name"]) &&
                !isset($input["data"]["surname"]) &&
                !isset($input["data"]["email"])) {
                $out["error"] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $login = htmlspecialchars($input["data"]["login"]);
            $pass = $input["data"]["pass"];
            
            $name = htmlspecialchars($input["data"]["name"]);
            $surname = htmlspecialchars($input["data"]["surname"]);
            $email = htmlspecialchars($input["data"]["email"]);
            
            //Verifi data
            if(!validate_email($email)) {
                $out["error"] = "Wrong email";
                break;
            }
            
            //If user exist, verifi passwd and update data
            if(user_exist($db, $login)) {
                if(password_verify($pass, get_passwd ($db, $login))) {                    
                    if(!update_userData($db, $login, $name, $surname, $email)) $out["error"] = "Update error";
                    else $out["data"] = true;             
                } else $out["error"] = "Wrong password";
            } else $out["error"] = "User don't exist";
                    
            break;
        
        case "CHANGE_PASSW" :
            debug_print("CHANGE_PASSW");
            
            if(!isset($_SESSION["id"])) {
                $out["error"] = "You aren't loged in";            
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["login"]) && 
                !isset($input["data"]["old_pass"]) && 
                !isset($input["data"]["new_pass"]) && 
                !isset($input["data"]["new_verifi"])) {
                $out["error"] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $login = htmlspecialchars($input["data"]["login"]);
            $pass = $input["data"]["old_pass"];
            $new = password_hash($input["data"]["new_pass"], PASSWORD_DEFAULT);
            
            if(!validate_passw($new)) {
                $out["error"] = "Invalid password";
                break;
            }
            
            //If user exist, verifi passwd and update it with new
            if(user_exist($db, $login)) {
                if(password_verify($pass, get_passwd ($db, $login))) {
                    if(password_verify($input["data"]["new_verifi"], $new)) {
                        if(!update_passwd($db, $login, $new)) $out["error"] = "Insert error";
                        else $out["data"] = true;
                    } else $out["error"] = "Passwords don't match";                     
                } else $out["error"] = "Wrong password";
            } else $out["error"] = "User don't exist";
            
            break;
        
        case "DELETE" : 
            debug_print("DELETE");
            //TODO acces
            
            //All input set check
            if( !isset($input["data"]["login"]) && 
                !isset($input["data"]["pass"])) {
                $out["error"] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $login = htmlspecialchars($input["data"]["login"]);
            $pass = $input["data"]["pass"];            
            
            //If user exist, verifi passwd and delete
            if(user_exist($db, $login)) {
                if(password_verify($pass, get_passwd ($db, $login))) {
                    if(!delete_user($db, $login)) $out["error"] = "Delete error";
                    else $out["data"] = true;                   
                } else $out["error"] = "Wrong password";
            } else $out["error"] = "User don't exist";
            
            break;
            
        case "LOGGED" :
            debug_print("LOGGED");
            if(isset($_SESSION["id"])) {
                $out["data"] = $_SESSION;
            } else $out["error"] = "You aren't loged in";  
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
if($out != NULL) {
    debug_print("DATA");
    echo json_encode($out);    
}

//Debug outpu user data if is logged in
debug_print("\nSESSION " . session_id());
if(isset($_SESSION["id"])) debug_print("id :" . $_SESSION["id"] . ",login :" . $_SESSION["login"] . ",name :" . $_SESSION["name"] . ",surname :" . $_SESSION["surname"] . ",access :" . $_SESSION["access"]);
 
//Disconnect from db
$db = null;
$querry = null;

//Flush out data
ob_end_flush();
