-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Počítač: localhost
-- Vytvořeno: Čtv 29. lis 2018, 11:27
-- Verze serveru: 10.1.26-MariaDB-0+deb9u1
-- Verze PHP: 7.1.24-1+0~20181112093455.10+stretch~1.gbp09a4fd

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databáze: `xxx`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `actor`
--

CREATE TABLE `actor` (
  `id` int(11) NOT NULL,
  `birthday` date DEFAULT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `cinema`
--

CREATE TABLE `cinema` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `address` varchar(100) NOT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `login` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(60) DEFAULT NULL,
  `phone` varchar(17) DEFAULT NULL,
  `birthday` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `director`
--

CREATE TABLE `director` (
  `id` int(11) NOT NULL,
  `birthday` date DEFAULT NULL,
  `firstname` varchar(50) NOT NULL DEFAULT '',
  `lastname` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `room`
--

CREATE TABLE `room` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `capacity` int(11) NOT NULL DEFAULT '0',
  `idCinema` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `studio`
--

CREATE TABLE `studio` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `genre`
--

CREATE TABLE `genre` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `actorPlayInFilm`
--

CREATE TABLE `actorPlayInFilm` (
  `id` int(11) NOT NULL,
  `idActor` int(11) NOT NULL,
  `idFilm` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `filmIntoGenre`
--

CREATE TABLE `filmIntoGenre` (
  `id` int(11) NOT NULL,
  `idGenre` int(11) NOT NULL,
  `idFilm` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `film`
--

CREATE TABLE `film` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `duration` int(11) NOT NULL DEFAULT '0',
  `premiere` date DEFAULT NULL,
  `idDirector` int(11) DEFAULT NULL,
  `idStudio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `projection`
--

CREATE TABLE `projection` (
  `id` int(11) NOT NULL,
  `datetime` DATETIME NOT NULL,
  `price` int(11) NOT NULL DEFAULT '0',
  `idRoom` int(11) DEFAULT NULL,
  `idFilm` int(11) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `ticket`
--

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL,
  `seat` int(11) NOT NULL,
  `idClient` int(11) DEFAULT NULL,
  `idSale` int(11) DEFAULT NULL,
  `idProjection` int(11) NOT NULL,
  `idReservation` int(11) DEFAULT NULL  
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `sale`
--

CREATE TABLE `sale` (
  `id` int(11) NOT NULL,
  `price` int(11) NOT NULL DEFAULT '0',
  `precentage` float NOT NULL DEFAULT '0.0',
  `description` varchar(255) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `code` int(11) NOT NULL DEFAULT '0',
  `registrated` datetime NOT NULL,
  `idClient` int(11) DEFAULT NULL,
  `idState` int(11) DEFAULT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `state`
--

CREATE TABLE `state` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `worker`
--

CREATE TABLE `worker` (
  `id` int(11) NOT NULL,
  `login` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `salary` int(11) DEFAULT NULL DEFAULT '0',
  `idCinema` int(11) DEFAULT NULL,
  `idJob` int(11) DEFAULT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `job`
--

CREATE TABLE `job` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ===================================================
-- Klíče pro exportované tabulky
-- ===================================================

--
-- Klíče pro tabulku `actor`
--
ALTER TABLE `actor`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `cinema`
--
ALTER TABLE `cinema`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `client_login` (`login`);

--
-- Klíče pro tabulku `director`
--
ALTER TABLE `director`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCinema` (`idCinema`);

--
-- Klíče pro tabulku `studio`
--
ALTER TABLE `studio`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `actorPlayInFilm`
--
ALTER TABLE `actorPlayInFilm`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idActor` (`idActor`),
  ADD KEY `idFilm` (`idFilm`);

--
-- Klíče pro tabulku `filmIntoGenre`
--
ALTER TABLE `filmIntoGenre`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idGenre` (`idGenre`),
  ADD KEY `idFilm` (`idFilm`);

--
-- Klíče pro tabulku `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idStudio` (`idStudio`),
  ADD KEY `idDirector` (`idDirector`);

--
-- Klíče pro tabulku `projection`
--
ALTER TABLE `projection`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRoom` (`idRoom`),
  ADD KEY `idFilm` (`idFilm`);

--
-- Klíče pro tabulku `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idClient` (`idClient`),
  ADD KEY `idSale` (`idSale`),
  ADD KEY `idProjection` (`idProjection`),
  ADD KEY `idReservation` (`idReservation`);

--
-- Klíče pro tabulku `sale`
--
ALTER TABLE `sale`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idClient` (`idClient`),
  ADD KEY `idState` (`idState`),
  ADD UNIQUE KEY `reservation_code` (`code`);

--
-- Klíče pro tabulku `worker`
--
ALTER TABLE `worker`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCinema` (`idCinema`),
  ADD KEY `idJob` (`idJob`),
  ADD UNIQUE KEY `worker_login` (`login`);

--
-- Klíče pro tabulku `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`);

-- ===================================================
-- AUTO_INCREMENT pro tabulky
-- ===================================================

--
-- AUTO_INCREMENT pro tabulku `actor`
--
ALTER TABLE `actor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `cinema`
--
ALTER TABLE `cinema`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `director`
--
ALTER TABLE `director`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `room`
--
ALTER TABLE `room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `studio`
--
ALTER TABLE `studio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `actorPlayInFilm`
--
ALTER TABLE `actorPlayInFilm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `filmIntoGenre`
--
ALTER TABLE `filmIntoGenre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `film`
--
ALTER TABLE `film`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `projection`
--
ALTER TABLE `projection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `sale`
--
ALTER TABLE `sale`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `state`
--
ALTER TABLE `state`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `worker`
--
ALTER TABLE `worker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `job`
--
ALTER TABLE `job`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- ==================================================
-- Constraints for dumped tables
-- ==================================================

--
-- Constraints for table `actorPlayInFilm`
--
ALTER TABLE `actorPlayInFilm`
  ADD CONSTRAINT `actorPlayInFilm_ibfk_1` FOREIGN KEY (`idActor`) REFERENCES `actor` (`id`),
  ADD CONSTRAINT `actorPlayInFilm_ibfk_2` FOREIGN KEY (`idFilm`) REFERENCES `film` (`id`);

--
-- Constraints for table `filmIntoGenre`
--
ALTER TABLE `filmIntoGenre`
  ADD CONSTRAINT `filmIntoGenre_ibfk_1` FOREIGN KEY (`idGenre`) REFERENCES `genre` (`id`),
  ADD CONSTRAINT `filmIntoGenre_ibfk_2` FOREIGN KEY (`idFilm`) REFERENCES `film` (`id`);

--
-- Constraints for table `film`
--
ALTER TABLE `film`
  ADD CONSTRAINT `film_ibfk_1` FOREIGN KEY (`idDirector`) REFERENCES `director` (`id`),
  ADD CONSTRAINT `film_ibfk_2` FOREIGN KEY (`idStudio`) REFERENCES `studio` (`id`);

--
-- Constraints for table `projection`
--
ALTER TABLE `projection`
  ADD CONSTRAINT `projection_ibfk_1` FOREIGN KEY (`idRoom`) REFERENCES `room` (`id`),
  ADD CONSTRAINT `projection_ibfk_2` FOREIGN KEY (`idFilm`) REFERENCES `film` (`id`);

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`idCinema`) REFERENCES `cinema` (`id`) ON DELETE CASCADE;
--
-- Constraints for table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`idClient`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`idSale`) REFERENCES `sale` (`id`),
  ADD CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`idProjection`) REFERENCES `projection` (`id`),
  ADD CONSTRAINT `ticket_ibfk_4` FOREIGN KEY (`idReservation`) REFERENCES `reservation` (`id`);

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`idClient`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`idState`) REFERENCES `state` (`id`);

--
-- Constraints for table `worker`
--
ALTER TABLE `worker`
  ADD CONSTRAINT `worker_ibfk_1` FOREIGN KEY (`idCinema`) REFERENCES `cinema` (`id`),
  ADD CONSTRAINT `worker_ibfk_2` FOREIGN KEY (`idJob`) REFERENCES `job` (`id`);


COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
