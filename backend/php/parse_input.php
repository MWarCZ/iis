<?php
require_once './php/debug.php';

//Start session
$currentCookieParams = session_get_cookie_params();

$rootDomain = '.mwarcz.cz/'; 

session_set_cookie_params( 
    $currentCookieParams["lifetime"], 
    $currentCookieParams["path"], 
    $rootDomain, 
    $currentCookieParams["secure"], 
    $currentCookieParams["httponly"] 
); 

session_name();
session_start(); 

setcookie("session_cookie", "value", time() + 600, '/', $rootDomain); 

//BYPAS TODO remove
//$_SESSION = array(
//            "id"=>      1,
//            "login"=>   "admin",
//            "name"=>    "admin",
//            "surname"=> "admin",
//            "ssn"=>     "999999/9999",
//            "email"=>   "emile@emile.com",
//            "access"=>  4
//        );

//echo "SESSION\n";
//var_dump($_SESSION);
//echo "COOKIE ";
//echo $_COOKIE["PHPSESSID"] ."\n";

//Parse POST data
if(isset($_REQUEST["request"])) {
    $input["request"] = htmlspecialchars($_REQUEST["request"]);
    debug_print("Request type :" . $input["request"]);
}

if(isset($_REQUEST["data"])) {
    $input["data"] = json_decode($_REQUEST["data"], true);
    
    debug_print("Data\n" . json_encode($input["data"]));
}

