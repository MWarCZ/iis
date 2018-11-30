<?php
function insert($db, $name, $duration, $released, $rating, $idDirector, $idStudio) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("INSERT INTO `films`(`name`, `duration`, `released`, `ratings`, `idDirector`, `idStudio`) VALUES (?, ?, ?, ?, ?, ?)");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($name, $duration, $released, $rating, $idDirector, $idStudio);
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return $db->lastInsertId();
}

function update($db, $id, $name, $duration, $released, $rating, $idDirector, $idStudio){
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `films` SET `name` = ?,`duration` = ?,`released` = ?,`ratings` = ?,`idDirector` = ?,`idStudio` = ?  WHERE `idFilm` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($name, $duration, $released, $rating, $idDirector, $idStudio, $id);
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
        $query = $db->prepare("DELETE FROM `films` WHERE `idFilm` = ?");
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
        $query = $db->prepare("SELECT * FROM `films`");
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
        $query = $db->prepare("SELECT * FROM `films` WHERE `idFilm` = ?");
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
    $film = $query->fetch(PDO::FETCH_ASSOC);
    
    return $query->fetch(PDO::FETCH_ASSOC);
}