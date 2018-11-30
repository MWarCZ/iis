<?php
function insert_employee($db, $login, $name, $surname, $ssn, $pass) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("INSERT INTO `employees`(`login`, `name`, `surname`, `ssn`, `passwd`) VALUES (?, ?, ?, ?, ?)");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($login, $name, $surname, $ssn, $pass);
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return TRUE;
}

function get_passwd($db, $login) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("SELECT * FROM `employees` WHERE `login` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    
    $params = array($login);
    
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    $row = $query->fetch(PDO::FETCH_ASSOC);
    
    return $row["passwd"];
}

function update_passwd($db, $login, $passw) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `employees` SET `passwd`= ? WHERE `login` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    
    $params = array($passw, $login);
    
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    
    return true;
}

function update_employeeData($db, $login, $name, $surname, $ssn) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `employees` SET `name`= ?,`surname`= ?,`ssn`= ? WHERE `login` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    
    $params = array($name, $surname, $ssn, $login);
    
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    
    return true;
}

function get_employeeData($db, $login) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("SELECT idEmployee, login, name, surname, ssn, access_level FROM `employees` WHERE `login` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    
    $params = array($login);
    
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    $row = $query->fetch(PDO::FETCH_ASSOC);
    
    return $row;
}

function employee_exist($db, $login) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("SELECT COUNT(*) FROM `employees` WHERE `login` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    
    $params = array($login);
    
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    
    return $query->fetchColumn(0) != 0 ? true : false;
}

function delete_employee($db, $login) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("DELETE FROM `employees` WHERE `login` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    
    $params = array($login);
    
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    
    return true;
}
