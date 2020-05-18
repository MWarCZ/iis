<?php
function insert($db, $name, $duration, $released, $rating) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("INSERT INTO `films`(`name`, `duration`, `released`, `ratings`) VALUES (?, ?, ?, ?)");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($name, $duration, $released, $rating);
    try {
        $query->execute(array_values($params));
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return $db->lastInsertId();
}

function update($db, $id, $name, $duration, $released, $rating){
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `films` SET `name` = ?,`duration` = ?,`released` = ?,`ratings` = ?  WHERE `idFilm` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($name, $duration, $released, $rating, $id);
    try {
        $query->execute(array_values($params));
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return TRUE;
}

function bindDirector($db, $id, $idStudio){
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `films` SET `idDirector` = ? WHERE `idFilm` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($idStudio, $id);
    try {
        $query->execute(array_values($params));
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return TRUE;
}

function unbindDirector($db, $id) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `films` SET `idDirector` = null WHERE `idFilm` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array( $id);
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return TRUE;
}

function bindAccess($db, $id, $idAccess){
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `films` SET `idAccess` = ? WHERE `idFilm` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($idAccess, $id);
    try {
        $query->execute(array_values($params));
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return TRUE;
}

function unbindAccess($db, $id) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `films` SET `idAccess` = null WHERE `idFilm` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array( $id);
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return TRUE;
}

function bindStudio($db, $id, $idStudio) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `films` SET `idStudio` = ? WHERE `idFilm` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($idStudio, $id);
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return TRUE;
}

function unbindStudio($db, $id) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `films` SET `idStudio` = null WHERE `idFilm` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array( $id);
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
    
    //Parse data from all tables
    while (($row = $query->fetch(PDO::FETCH_ASSOC)) != false) {
                
        $data[] = array(
            "idFilm" =>     $row["idFilm"],
            "name" =>       $row["name"],
            "duration" =>   $row["duration"],
            "released" =>   $row["released"],
            "ratings" =>    $row["ratings"],
            "director" =>   getDirector($db, $row["idDirector"]),
            "studio" =>     getStudio($db, $row["idStudio"]),
            "actors" =>     getActors($db, $row["idFilm"]),
            "genres" =>     getGenres($db, $row["idFilm"])
            );
    }
    
    return $data;
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
    
    $row = $query->fetch(PDO::FETCH_ASSOC);
    
    $data[] = array(
            "idFilm" =>     $row["idFilm"],
            "name" =>       $row["name"],
            "duration" =>   $row["duration"],
            "released" =>   $row["released"],
            "ratings" =>    $row["ratings"],
            "director" =>   getDirector($db, $row["idDirector"]),
            "studio" =>     getStudio($db, $row["idStudio"]),
            "actors" =>     getActors($db, $row["idFilm"]),
            "genres" =>     getGenres($db, $row["idFilm"])
            );
    
    return $data;
}

function addActor($db, $id, $idActor) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("INSERT INTO `film_actor`(`idFilm`, `idActor`) VALUES (?, ?)");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($id, $idActor);
    
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return $db->lastInsertId();
}

function addGenre($db, $id, $idGenre) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("INSERT INTO `film_genre`(`idFilm`, `idGenre`) VALUES (?, ?)");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($id, $idGenre);
    
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return $db->lastInsertId();
}

function delActor($db, $id, $idActor) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("DELETE FROM `film_actor` WHERE `idFilm` = ? AND `idActor` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($id, $idActor);
    
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return TRUE;
}

function delActors($db, $id) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("DELETE FROM `film_actor` WHERE `idFilm` = ?");
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

function delGenres($db, $id) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("DELETE FROM `film_genre` WHERE `idFilm` = ?");
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

function getActors($db, $id) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("SELECT actors.idActor, actors.name, actors.surname , actors.birthday FROM film_actor JOIN actors ON actors.idActor = film_actor.idActor WHERE idFilm = ?");
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
    
    return $query->fetchAll(PDO::FETCH_ASSOC);
}

function getGenres($db, $id) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("SELECT genres.idGenre, genres.name FROM film_genre JOIN genres ON genres.idGenre = film_genre.idGenre WHERE idFilm = ?");
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
    
    return $query->fetchAll(PDO::FETCH_ASSOC);
}

function getDirector($db, $id) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("SELECT * FROM `directors` WHERE `idDirector` = ?");
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
    
    return ($data = $query->fetch(PDO::FETCH_ASSOC)) == false ? null : $data;
}

function getStudio($db, $id) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("SELECT * FROM `studios` WHERE `idStudio` = ?");
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
    
    return ($data = $query->fetch(PDO::FETCH_ASSOC)) == false ? null : $data;
}

function film_earnings($db, $id) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("SELECT f.idFilm, f.name, f.duration, f.ratings, f.released, SUM(t.price) AS earnings
                                FROM tickets AS t
                                        JOIN projections    AS p ON p.idProjection = t.idProjection
                                        JOIN films          AS f ON f.idFilm = p.idFilm
                                WHERE f.idFilm = ?");
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