<?php
require_once './php/debug.php';

//Start session

$rootDomain = '.mwarcz.cz/'; 

session_name();
session_start(); 

setcookie("session_cookie", "value", time() + 3600, '/', $rootDomain);

//Parse POST data
if(isset($_REQUEST["request"])) {
    $input["request"] = htmlspecialchars($_REQUEST["request"]);
    debug_print("Request type :" . $input["request"]);
}

if(isset($_REQUEST["data"])) {
    $input["data"] = json_decode($_REQUEST["data"], true);
    
    debug_print("Data\n" . json_encode($input["data"]));
}

