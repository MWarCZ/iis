<?php
function insert($db, $name, $address) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("INSERT INTO `cinemas`(`name`, `address`) VALUES (?, ?)");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($name, $address);
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return $db->lastInsertId();
}

function update($db, $id, $name, $address) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `cinemas` SET `name` = ?,`address` = ? WHERE `idCinema` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($name, $address, $id);
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return TRUE;
}

function delete($db, $id) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("DELETE FROM `cinemas` WHERE `idCinema` = ?");
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
        $query = $db->prepare("SELECT * FROM `cinemas`");
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
        $query = $db->prepare("SELECT * FROM `cinemas` WHERE `idCinema` = ?");
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

function cinema_earnings($db, $id) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("SELECT c.*, SUM(t.price) AS earnings
                                FROM tickets AS t
                                    JOIN projections 	AS p ON p.idProjection = t.idProjection
                                    JOIN halls 			AS h ON h.idHall = p.idHall
                                    JOIN cinemas 		AS c ON c.idCinema = h.idCinema
                                WHERE c.idCinema = ?");
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