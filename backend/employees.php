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
require_once './php/sql/employees.php';

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
            if( !isset($input["data"]["login"]) && 
                !isset($input["data"]["name"]) &&  
                !isset($input["data"]["surname"]) &&  
                !isset($input["data"]["ssn"]) &&  
                !isset($input["data"]["pass"]) && 
                !isset($input["data"]["pass_verifi"])) {
                $out["error"][] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $login = htmlspecialchars($input["data"]["login"]);
            $name = htmlspecialchars($input["data"]["name"]);
            $surname = htmlspecialchars($input["data"]["surname"]);
            $ssn = htmlspecialchars($input["data"]["ssn"]);
            $pass = password_hash($input["data"]["pass"], PASSWORD_DEFAULT);
            
            //Verifi data
            if(!validate_ssn($ssn)) {
                $out["error"][] = "Invalid ssn";
                break;
            }
            if(!validate_passw($pass)) {
                $out["error"][] = "Invalid password";
                break;
            }
             
            //Exexute request
            if(employee_exist($db, $login)) $out["error"][] = "Login already used";
            else {
                if(password_verify($input["data"]["pass_verifi"], $pass)) {
                    if(!insert_employee($db, $login, $name, $surname, $ssn, $pass)) $out["error"][] = "Insert error";
                    else $out["data"] = true;
                } else $out["error"][] = "Passwords don't match";
            }
            
            break;
            
        case "LOGIN" : 
            debug_print("LOGIN");
            if(isset($_SESSION["id"])) {
                $out["error"][] = "Already logged in";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["login"]) && 
                !isset($input["data"]["pass"])) {
                $out["error"][] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $login = htmlspecialchars($input["data"]["login"]);
            $pass = $input["data"]["pass"];
            
            
            //If employee exist, verifi passwd and store data in session
            if(employee_exist($db, $login )) {
                if(password_verify($pass, get_passwd ($db, $login))) {
                    $data = get_employeeData($db, $login);
                    
                    //SET data into session
                    $_SESSION = array(
                        "id"=>      $data["idEmployee"],
                        "login"=>   $data["login"],
                        "name"=>    $data["name"],
                        "surname"=> $data["surname"],
                        "ssn"=>     $data["ssn"],
                        "access"=>  $data["access_level"]
                    );
                    $out["data"] = true;
                    
                } else $out["error"][] = "Wrong password";
            } else $out["error"][] = "Employee don't exist";
            
            break;
            
        case "LOGOUT" : 
            debug_print("LOGOUT");            
            
            if(isset($_SESSION["id"])) {
                if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 2)) {
                    $out["error"][] = "You don't have enough permissions";
                    break;
                }
                
                session_unset();
                session_destroy();
                
                debug_print("Logged out");
                $out["data"] = true;
            } else $out["error"][] = "You aren't loged in";
            
            break;
        
        case "UPDATE" : 
            debug_print("UPDATE");
            //Check access level
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 2)) {
                $out["error"][] = "You don't have enough permissions";
                break;
            }
            
            if(isset($_SESSION["id"])) {
                $out["error"][] = "You aren't loged in";            
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["login"]) && 
                !isset($input["data"]["pass"]) && 
                !isset($input["data"]["name"]) &&
                !isset($input["data"]["surname"]) &&
                !isset($input["data"]["ssn"])) {
                $out["error"][] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $login = htmlspecialchars($input["data"]["login"]);
            $pass = $input["data"]["pass"];
            
            $name = htmlspecialchars($input["data"]["name"]);
            $surname = htmlspecialchars($input["data"]["surname"]);
            $ssn = htmlspecialchars($input["data"]["ssn"]);
            
            //Verifi data
            if(!validate_ssn($ssn)) {
                $out["error"][] = "Wrong ssn";
                break;
            }
            
            //If employee exist, verifi passwd and update data
            if(employee_exist($db, $login)) {
                if(password_verify($pass, get_passwd ($db, $login))) {                    
                    if(!update_employeeData($db, $login, $name, $surname, $ssn)) $out["error"][] = "Update error";
                    else $out["data"] = true;             
                } else $out["error"][] = "Wrong password";
            } else $out["error"][] = "Employee don't exist";
                    
            break;
        
        case "CHANGE_PASSW" :
            debug_print("CHANGE_PASSW");
            //Check access level
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 2)) {
                $out["error"][] = "You don't have enough permissions";
                break;
            }
            
            if(!isset($_SESSION["id"])) {
                $out["error"][] = "You aren't loged in";            
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["login"]) && 
                !isset($input["data"]["old_pass"]) && 
                !isset($input["data"]["new_pass"]) && 
                !isset($input["data"]["new_verifi"])) {
                $out["error"][] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $login = htmlspecialchars($input["data"]["login"]);
            $pass = $input["data"]["old_pass"];
            $new = password_hash($input["data"]["new_pass"], PASSWORD_DEFAULT);
            
            if(!validate_passw($new)) {
                $out["error"][] = "Invalid password";
                break;
            }
            
            //If employee exist, verifi passwd and update it with new
            if(employee_exist($db, $login)) {
                if(password_verify($pass, get_passwd ($db, $login))) {
                    if(password_verify($input["data"]["new_verifi"], $new)) {
                        if(!update_passwd($db, $login, $new)) $out["error"][] = "Insert error";
                        else $out["data"] = true;
                    } else $out["error"][] = "Passwords don't match";                     
                } else $out["error"][] = "Wrong password";
            } else $out["error"][] = "Employee don't exist";
            
            break;
        
        case "DELETE" : 
            debug_print("DELETE");
            //Check access level
            if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 3)) {
                $out["error"][] = "You don't have enough permissions";
                break;
            }
            
            //All input set check
            if( !isset($input["data"]["login"]) && 
                !isset($input["data"]["pass"])) {
                $out["error"][] = "Missing some input";
                break;
            }
            
            //Get data from inputs
            $login = htmlspecialchars($input["data"]["login"]);
            $pass = $input["data"]["pass"];

            //Are u deleting own acc?
            if(!(isset($_SESSION["login"]) && ($_SESSION["login"] == $login))) {
                //Or have access?
                if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 3)){
                    $out["error"][] = "You can't delete this user";
                    break;
                }
            }            
            
            //If employee exist, verifi passwd and delete
            if(employee_exist($db, $login)) {
                if(password_verify($pass, get_passwd ($db, $login))) {
                    //First sign out
                    if(isset($_SESSION["id"])) {
                        session_unset();
                        session_destroy();

                        debug_print("Logged out");
                        $out["data"] = true;
                    }
                    
                    if(!delete_employee($db, $login)) $out["error"][] = "Delete error";
                    else $out["data"] = true;                   
                } else {
                    $out["error"][] = "Wrong password";
                }
            } else $out["error"][] = "employee don't exist";
            
            break;
            
        case "LOGGED" :
            debug_print("LOGGED");
            
            if(isset($_SESSION["id"])) {
                if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 2)) {
                    $out["error"][] = "You don't have enough permissions";
                    break;
                }
                
                $out["data"] = $_SESSION;
            } else $out["error"][] = "You aren't loged in";  
            break;
            
        case "SELECT_ALL" :
            debug_print("LOGGED");
            
            if(isset($_SESSION["id"])) {
                if(!(isset($_SESSION["access"]) && $_SESSION["access"] >= 3)) {
                    $out["error"][] = "You don't have enough permissions";
                    break;
                }
                
                if(($data = selectAll($db))) {
                    $out["data"] = $data;
                } else $out["error"][] = "Not found";
            } else $out["error"][] = "You aren't loged in";  
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
