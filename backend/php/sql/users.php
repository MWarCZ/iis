<?php
function insert_user($db, $login, $name, $surname, $email, $pass) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("INSERT INTO `users`(`login`, `name`, `surname`, `email`, `passwd`) VALUES (?, ?, ?, ?, ?)");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($login, $name, $surname, $email, $pass);
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
        $query = $db->prepare("SELECT * FROM `users` WHERE `login` = ?");
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
        $query = $db->prepare("UPDATE `users` SET `passwd`= ? WHERE `login` = ?");
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

function update_userData($db, $login, $name, $surname, $email) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `users` SET `name`= ?,`surname`= ?,`email`= ? WHERE `login` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    
    $params = array($name, $surname, $email, $login);
    
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    
    return true;
}

function get_userData($db, $login) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("SELECT idUser, login, name, surname, email FROM `users` WHERE `login` = ?");
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

function user_exist($db, $login) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("SELECT COUNT(*) FROM `users` WHERE `login` = ?");
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

function delete_user($db, $login) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("DELETE FROM `users` WHERE `login` = ?");
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

function delete_tickets($db, $id) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("DELETE FROM `tickets` WHERE idReservation IN (SELECT idReservation FROM reservations WHERE idUser = ? AND picked = 0)");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    
    $params = array($id);
    
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    
    return true;
}

function delete_reservations($db, $id) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("DELETE FROM reservations WHERE idUser = ? AND picked = 0");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    
    $params = array($id);
    
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    
    return true;
}
        
function null_reservations($db, $id) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `reservations` SET `idUser` = null WHERE `idUser` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    
    $params = array($id);
    
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return NULL;
    }
    
    return true;
}
