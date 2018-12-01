<?php
function insert($db, $date, $idFilm, $idHall, $idPrice, $idAccess) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("INSERT INTO `projections`(`date`, `idFilm`, `idHall`, `idPrice`, `idAccess`) VALUES (?, ?, ?, ?, ?)");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($date, $idFilm, $idHall, $idPrice, $idAccess);
    try {
        $query->execute(array_values($params));
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return $db->lastInsertId();
}

function update($db, $id, $date, $idFilm, $idHall, $idPrice, $idAccess){
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `projections` SET `date` = ?,`idFilm` = ?,`idHall` = ?,`idPrice` = ?,`idAccess` = ?  WHERE `idProjection` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($date, $idFilm, $idHall, $idPrice, $idAccess, $id);
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
    
//    //Parse data from all tables
//    while (($row = $query->fetch(PDO::FETCH_ASSOC)) != false) {
//                
//        $data[] = array(
//            "idFilm" =>     $row["idFilm"],
//            "name" =>       $row["name"],
//            "duration" =>   $row["duration"],
//            "released" =>   $row["released"],
//            "ratings" =>    $row["ratings"],
//            "director" =>   getDirector($db, $row["idDirector"]),
//            "studio" =>     getStudio($db, $row["idStudio"]),
//            "actors" =>     getActors($db, $row["idFilm"]),
//            "genres" =>     getGenres($db, $row["idFilm"])
//            );
//    }
    
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
    
    $row = $query->fetch(PDO::FETCH_ASSOC);
    
//    $data[] = array(
//            "idProjection" =>     $row["idProjection"],
//            "date" =>           $row["date"],
//            "hall" =>           getHall($db, $row["idFilm"]),
//            "access" =>         getAccess($db, $row["idFilm"]),
//            "price" =>          getPrice($db, $row["idFilm"]),
//            "film" =>           getFilm($db, $row["idFilm"])
//            );
    
    return $row;
}
