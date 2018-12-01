<?php
require_once 'debug.php';

$servername = "localhost";
$dbname = "xvalka05_xzajic16";
$username = "root";
$password = "";

try {
    $db = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    debug_print("Connected successfully");
} catch (PDOException $e) {
    debug_print("Connection failed to db $dbname: " . $e->getMessage());
}

//todo remove
$_SESSION["access"] = 4;
