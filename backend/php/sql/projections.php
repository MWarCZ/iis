<?php
function insert($db, $date, $idFilm, $idHall, $price) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("INSERT INTO `projections`(`date`, `idFilm`, `idHall`, `price`) VALUES (?, ?, ?, ?)");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($date, $idFilm, $idHall, $price);
    try {
        $query->execute(array_values($params));
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return $db->lastInsertId();
}

function update($db, $id, $date, $idFilm, $idHall, $price){
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `projections` SET `date` = ?,`idFilm` = ?,`idHall` = ?,`price` = ?  WHERE `idProjection` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($date, $idFilm, $idHall, $price, $id);
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
        $query = $db->prepare("DELETE FROM `projections` WHERE `idProjection` = ?");
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
        $query = $db->prepare("SELECT * FROM `projections`");
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
        $query = $db->prepare("SELECT * FROM `projections` WHERE `idProjection` = ?");
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

function selectByDate($db, $date){
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("SELECT * FROM projections WHERE date >= ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($date);
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
        
    return $query->fetchAll(PDO::FETCH_ASSOC);
}

function selectAllWithDetails($db) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("SELECT projections.*, films.name AS film, halls.cinemaMark as hall, halls.idCinema, cinemas.name as cinema
                                FROM projections
                                JOIN films ON films.idFilm = projections.idFilm
                                JOIN halls ON halls.idHall = projections.idHall
                                JOIN cinemas ON halls.idCinema = cinemas.idCinema");
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