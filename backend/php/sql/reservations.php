<?php
function insert($db, $id) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("INSERT INTO `reservations`(`idUser`, `paid`, `picked`) VALUES (?, 0, 0)");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($id);
    try {
        $query->execute(array_values($params));
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return $db->lastInsertId();
}

function insert_null($db, $id) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("INSERT INTO `reservations`(`idUser`, `paid`, `picked`) VALUES (null, 0, 0)");
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
    
    return $db->lastInsertId();
}

function delete($db, $id) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("DELETE FROM `reservations` WHERE `idReservation` = ?");
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

function delete_user($db, $id) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("DELETE FROM `reservations` WHERE `idUser` = ?");
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
        $query = $db->prepare("SELECT * FROM `reservations`");
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
    $reservations = $query->fetchAll(PDO::FETCH_ASSOC);
    
    for($i = 0; $i < count($reservations); $i++) $reservations[$i]["tickets"] = getTickets($db, $reservations[$i]["idReservation"]);
    
    return $reservations;
}

function selectByDate($db, $date){
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("SELECT * FROM reservations WHERE reserved >= ?");
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
    $reservations = $query->fetchAll(PDO::FETCH_ASSOC);
    
    for($i = 0; $i < count($reservations); $i++) $reservations[$i]["tickets"] = getTickets($db, $reservations[$i]["idReservation"]);
    
    return $reservations;
}

function selectId($db, $id) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("SELECT * FROM `reservations` WHERE `idReservation` = ?");
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
    $reservations = $query->fetchAll(PDO::FETCH_ASSOC);
    
    for($i = 0; $i < count($reservations); $i++) $reservations[$i]["tickets"] = getTickets($db, $reservations[$i]["idReservation"]);
    
    return $reservations;
}

function selectUser($db, $id) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("SELECT * FROM `reservations` WHERE `idUser` = ?");
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
    $reservations = $query->fetchAll(PDO::FETCH_ASSOC);
    
    for($i = 0; $i < count($reservations); $i++) $reservations[$i]["tickets"] = getTickets($db, $reservations[$i]["idReservation"]);
    
    return $reservations;
}

function getTickets($db, $id) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("SELECT tickets.* , projections.date, films.name as film, films.idFilm as idFilm, halls.cinemaMark as room, cinemas.name as cinema, cinemas.idCinema as idCinema
                                FROM tickets
                                JOIN projections on tickets.idProjection=projections.idProjection
                                JOIN films on projections.idFilm=films.idFilm
                                JOIN halls on projections.idHall=halls.idHall
                                JOIN cinemas on halls.idCinema=cinemas.idCinema
                                WHERE tickets.idReservation = ?");
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

function payAndPick($db, $id) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `reservations` SET `paid`=1, `picked`=1 WHERE `idReservation` = ?");
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

function pay($db, $id) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `reservations` SET `paid`=1 WHERE `idReservation` = ?");
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

function pick($db, $id) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("UPDATE `reservations` SET `picked`=1 WHERE `idReservation` = ?");
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

function addTicket($db, $price, $discount, $idReservation, $idDiscount, $idProjection, $seatNumber) {
    if($db == NULL) return NULL;
    try {
        $query = $db->prepare("INSERT INTO `tickets`(`price`, `idReservation`, `idDiscount`, `idProjection`, `seatNumber`) VALUES (?*(1-?), ?, ?, ?, ?)");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($price, $discount, $idReservation, $idDiscount, $idProjection, $seatNumber);
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return TRUE;
}

function projectionPrice($db, $id) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("SELECT price FROM projections WHERE `idProjection` = ?");
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
    
    $data = $query->fetch(PDO::FETCH_ASSOC);
    
    return $data["price"];
}

function dicount($db, $id) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("SELECT discount/100 AS perc FROM discounts WHERE idDiscount = ?");
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
    
    $data = $query->fetch(PDO::FETCH_ASSOC);
    
    return $data["perc"];
}

function update_totalPrice($db, $id) {
    if($db == NULL) return FALSE;
    
    try {
        $query = $db->prepare("UPDATE `reservations` SET `totalPrice` = (SELECT SUM(price) FROM tickets WHERE idReservation = ?) WHERE idReservation = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($id, $id);
    
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return true;
}

function delTicket_reservation($db, $idReservation) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("DELETE tickets FROM tickets WHERE `idReservation` = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($idReservation);
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return TRUE;
}

function delTicket_user($db, $idUser) {
    if($db == NULL) return NULL;
    
    try {
        $query = $db->prepare("DELETE tickets FROM tickets INNER JOIN reservations ON reservations.idReservation = tickets.idReservation WHERE reservations.idUser = ?");
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    $params = array($idUser);
    try {
        $query->execute($params);
    } catch (PDOException $e) {
        debug_print($e->getMessage());
        return FALSE;
    }
    
    return TRUE;
}