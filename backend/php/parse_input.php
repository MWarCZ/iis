<?php
require_once './php/debug.php';

//Start session
session_set_cookie_params(33600, '/', 'localhost.api.mydomain', FALSE, TRUE);
session_start();

//Parse POST data
if(isset($_REQUEST["request"])) {
    $input["request"] = htmlspecialchars($_REQUEST["request"]);
    debug_print("Request type :" . $input["request"]);
}

if(isset($_REQUEST["data"])) {
    $input["data"] = json_decode($_REQUEST["data"], true);
    
    debug_print("Data\n" . json_encode($input["data"]));
}

