<?php
require_once './php/debug.php';

//Start session
session_set_cookie_params(33600, '/', '.mwarcz.cz', FALSE, TRUE);
session_start();

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

//Parse POST data
if(isset($_REQUEST["request"])) {
    $input["request"] = htmlspecialchars($_REQUEST["request"]);
    debug_print("Request type :" . $input["request"]);
}

if(isset($_REQUEST["data"])) {
    $input["data"] = json_decode($_REQUEST["data"], true);
    
    debug_print("Data\n" . json_encode($input["data"]));
}

