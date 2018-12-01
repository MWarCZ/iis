<?php
function insert($db, $desc, $price) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("INSERT INTO `prices`(`description`, `price`) VALUES (?, ?)");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($desc, $price);
    try {
        $query->execute(array_values($params));
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return $db->lastInsertId();
}

function update($db, $id, $desc, $price){
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `prices` SET `description` = ?, `price` = ?  WHERE `idPrice` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($desc, $price, $id);
    try {
        $query->execute(array_values($params));
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return TRUE;
}

function delete($db, $id) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("DELETE FROM `prices` WHERE `idPrice` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($id);
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return TRUE;
}

function selectAll($db) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("SELECT * FROM `prices`");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    try {
        $query->execute();
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return $query->fetchAll(PDO::FETCH_ASSOC);
}

function selectId($db, $id) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("SELECT * FROM `prices` WHERE `idPrice` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($id);
    
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return $query->fetch(PDO::FETCH_ASSOC);
}
