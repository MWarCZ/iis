<?php
require_once './php/debug.php';

//Start session
$currentCookieParams = session_get_cookie_params();

$rootDomain = '.localhost/'; 

//session_set_cookie_params( 
//    $currentCookieParams["lifetime"], 
//    $currentCookieParams["path"], 
//    $rootDomain, 
//    $currentCookieParams["secure"], 
//    $currentCookieParams["httponly"] 
//); 

session_name();
session_start(); 

setcookie("session_cookie", "value", time() + 600, '/', $rootDomain); 

//Parse POST data
if(isset($_REQUEST["request"])) {
    $input["request"] = htmlspecialchars($_REQUEST["request"]);
    debug_print("Request type :" . $input["request"]);
}

if(isset($_REQUEST["data"])) {
    $input["data"] = json_decode($_REQUEST["data"], true);
    
    debug_print("Data\n" . json_encode($input["data"]));
}

