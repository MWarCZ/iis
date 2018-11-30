<?php
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) != false ? true : false;
}

function validate_ssn($ssn) {
    if(preg_match("/^([0-9]{6})(\/)?([0-9]{4})$/", $ssn)) {
        if(strlen($ssn) == 11) $ssn = str_replace('/', '', $ssn);
        
        $a = $b = 0;
        for($i = 0; $i < 10 ;$i += 2) {
            $a += intval(substr($ssn, $i, 1));
            $b += intval(substr($ssn, $i+1, 1));
        }
        return (($a - $b) % 11 == 0) ? true : false;
        
    } else if(preg_match("/^([0-9]{6})(\/)?([0-9]{3})$/", $ssn)) return true;
    
    return false;
}

function validate_passw($passw) {
    
    
    return true;
}