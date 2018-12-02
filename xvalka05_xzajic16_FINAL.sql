-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2018 at 05:06 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xvalka05_xzajic16`
--

-- --------------------------------------------------------

--
-- Table structure for table `accesses`
--

CREATE TABLE `accesses` (
  `idAccess` int(11) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accesses`
--

INSERT INTO `accesses` (`idAccess`, `description`) VALUES
(1, 'G'),
(2, 'PG'),
(3, 'PG-13'),
(4, 'R'),
(5, 'NC-17');

-- --------------------------------------------------------

--
-- Table structure for table `actors`
--

CREATE TABLE `actors` (
  `idActor` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `birthday` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `actors`
--

INSERT INTO `actors` (`idActor`, `name`, `surname`, `birthday`) VALUES
(1, 'Tom', 'Hanks', '1956-07-09'),
(2, 'Robin', 'Wright', '1966-04-08'),
(3, 'Gary', 'Sinise', '1955-03-17'),
(4, 'Tim', 'Robbins', '1958-10-16'),
(5, 'Morgan', 'Freeman', '1937-06-01'),
(6, 'Bob', 'Gunton', '1945-11-15');

-- --------------------------------------------------------

--
-- Table structure for table `cinemas`
--

CREATE TABLE `cinemas` (
  `idCinema` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cinemas`
--

INSERT INTO `cinemas` (`idCinema`, `name`, `address`) VALUES
(1, 'Kino Dukla', 'J. Masaryka 1421/20, Jihlava'),
(2, 'Cinestar Jihlava', 'Hradební 5440/1, Jihlava'),
(3, 'Cinema City Olympia', 'Olympia Brno, U Dálnice 777'),
(4, 'Cinema City', 'Mečová 695/2, Brno'),
(5, 'Letní kino', 'Lidická 1861/12, Brno'),
(6, 'Kino Scala', 'Moravské nám. 127/3, Brno');

-- --------------------------------------------------------

--
-- Table structure for table `directors`
--

CREATE TABLE `directors` (
  `idDirector` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `birthday` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `directors`
--

INSERT INTO `directors` (`idDirector`, `name`, `surname`, `birthday`) VALUES
(1, 'Frank', 'Darabont', '1959-01-28'),
(2, 'Robert', 'Zemeckis', '1951-05-14');

-- --------------------------------------------------------

--
-- Table structure for table `discounts`
--

CREATE TABLE `discounts` (
  `idDiscount` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `discount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `discounts`
--

INSERT INTO `discounts` (`idDiscount`, `description`, `discount`) VALUES
(1, 'Žádná', 0),
(2, 'Dítě (do 12let)', 50),
(3, 'Student (do 26let)', 25),
(4, 'Důchodce (nad 65)', 25),
(5, 'ZTP', 25);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `idEmployee` int(11) NOT NULL,
  `login` varchar(100) NOT NULL,
  `name` varchar(16) NOT NULL,
  `surname` varchar(16) NOT NULL,
  `passwd` varchar(100) NOT NULL,
  `ssn` varchar(11) NOT NULL,
  `access_level` int(11) NOT NULL DEFAULT '2',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `idCinema` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`idEmployee`, `login`, `name`, `surname`, `passwd`, `ssn`, `access_level`, `deleted`, `idCinema`) VALUES
(1, 'admin', 'Administrator', 'Administrator', '$2y$10$9Hbrghb4uP/q3cvgBHb85.n0whD3uN/kSwPD29vrdtYJBWliCWIk2', 'none', 4, 0, NULL),
(2, 'worker', 'Ana', 'Malá', '$2y$10$HdWj/mByaKH.gHRk124vIOMHJhFaEkfDuBpVl0yJqRkba3h9FLFUi', '806202/0010', 2, 0, NULL),
(3, 'manager', 'Petr', 'Oný', '$2y$10$/zmssSaMR3iQmqcSXSNluuZknwe6puFLCArbjUHDEg104d48dCWl6', '760101/0549', 3, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `films`
--

CREATE TABLE `films` (
  `idFilm` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `duration` int(11) NOT NULL,
  `released` date NOT NULL,
  `ratings` int(11) NOT NULL,
  `idDirector` int(11) DEFAULT NULL,
  `idStudio` int(11) DEFAULT NULL,
  `idAccess` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `films`
--

INSERT INTO `films` (`idFilm`, `name`, `duration`, `released`, `ratings`, `idDirector`, `idStudio`, `idAccess`) VALUES
(1, 'Forrest Gump', 142, '1994-07-06', 95, 2, 2, 3),
(2, 'The Shawshank Redemption', 142, '1994-10-14', 95, 1, 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `film_actor`
--

CREATE TABLE `film_actor` (
  `idFA` int(11) NOT NULL,
  `idFilm` int(11) NOT NULL,
  `idActor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `film_actor`
--

INSERT INTO `film_actor` (`idFA`, `idFilm`, `idActor`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 4),
(5, 2, 6),
(6, 2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `film_genre`
--

CREATE TABLE `film_genre` (
  `idFG` int(11) NOT NULL,
  `idFilm` int(11) NOT NULL,
  `idGenre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `film_genre`
--

INSERT INTO `film_genre` (`idFG`, `idFilm`, `idGenre`) VALUES
(1, 1, 1),
(2, 1, 4),
(3, 1, 5),
(4, 2, 3),
(5, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `idGenre` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`idGenre`, `name`) VALUES
(1, 'Drama'),
(2, 'Sci-Fi'),
(3, 'Krimi'),
(4, 'Komedie'),
(5, 'Romantický');

-- --------------------------------------------------------

--
-- Table structure for table `halls`
--

CREATE TABLE `halls` (
  `idHall` int(11) NOT NULL,
  `cinemaMark` varchar(5) NOT NULL,
  `capacity` int(11) NOT NULL,
  `idCinema` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `halls`
--

INSERT INTO `halls` (`idHall`, `cinemaMark`, `capacity`, `idCinema`) VALUES
(1, 'A', 50, 1),
(2, 'B', 50, 1),
(3, 'A', 100, 2),
(4, 'B', 100, 2),
(5, 'C', 75, 2),
(6, 'A', 100, 3),
(7, 'B', 100, 3),
(8, 'C', 50, 3),
(9, 'D', 50, 3),
(10, 'Sál', 100, 4),
(11, 'Sál', 200, 5),
(12, 'Sál 1', 50, 6),
(13, 'Sál 2', 50, 6),
(14, 'Sál 3', 100, 6);

-- --------------------------------------------------------

--
-- Table structure for table `projections`
--

CREATE TABLE `projections` (
  `idProjection` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `price` int(11) NOT NULL,
  `idFilm` int(11) NOT NULL,
  `idHall` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projections`
--

INSERT INTO `projections` (`idProjection`, `date`, `price`, `idFilm`, `idHall`) VALUES
(1, '2018-12-15 16:00:00', 99, 1, 1),
(2, '2018-12-15 16:00:00', 99, 2, 2),
(3, '2018-12-15 16:00:00', 99, 1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `idReservation` int(11) NOT NULL,
  `reserved` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `totalPrice` int(11) NOT NULL DEFAULT '0',
  `paid` tinyint(1) NOT NULL,
  `picked` tinyint(1) NOT NULL,
  `idUser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`idReservation`, `reserved`, `totalPrice`, `paid`, `picked`, `idUser`) VALUES
(1, '2018-12-02 17:02:57', 297, 1, 1, 1),
(2, '2018-12-02 17:03:28', 199, 1, 0, 2),
(3, '2018-12-02 17:05:55', 150, 0, 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `studios`
--

CREATE TABLE `studios` (
  `idStudio` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `studios`
--

INSERT INTO `studios` (`idStudio`, `name`) VALUES
(1, 'Columbia/Sony'),
(2, 'Paramount Pictures');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `idTicket` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `idReservation` int(11) NOT NULL,
  `idDiscount` int(11) NOT NULL,
  `idProjection` int(11) NOT NULL,
  `seatNumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`idTicket`, `price`, `idReservation`, `idDiscount`, `idProjection`, `seatNumber`) VALUES
(1, 99, 1, 1, 1, 1),
(2, 99, 1, 1, 1, 2),
(3, 99, 1, 1, 1, 3),
(4, 99, 2, 1, 2, 1),
(5, 50, 2, 2, 2, 2),
(6, 50, 2, 2, 2, 3),
(7, 50, 3, 2, 3, 1),
(8, 50, 3, 2, 3, 2),
(9, 50, 3, 2, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `login` varchar(100) NOT NULL,
  `name` varchar(16) NOT NULL,
  `surname` varchar(16) NOT NULL,
  `email` varchar(100) NOT NULL,
  `passwd` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idUser`, `login`, `name`, `surname`, `email`, `passwd`) VALUES
(1, 'user', 'Karel', 'Plíhal', 'user@user.cz', '$2y$10$XqrKJyDZGt.Leej/9hXCxOO350.WGC//Fs8Lv1Ql4jqRstywLe3Tq'),
(2, 'user2', 'Petra', 'Plhová', 'user@user.cz', '$2y$10$63DCO2jb6ZOUOJTgLrwxFeHMpo5yLeV3KbO4rxtltz8hO5c55.oFu'),
(3, 'user3', 'Michal', 'Novák', 'user@user.cz', '$2y$10$DnjcKGgVMXfqUR9bS/u/4epQWfJv6XYAlny07vyFSfeNViKO1R5Oq');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accesses`
--
ALTER TABLE `accesses`
  ADD PRIMARY KEY (`idAccess`);

--
-- Indexes for table `actors`
--
ALTER TABLE `actors`
  ADD PRIMARY KEY (`idActor`);

--
-- Indexes for table `cinemas`
--
ALTER TABLE `cinemas`
  ADD PRIMARY KEY (`idCinema`);

--
-- Indexes for table `directors`
--
ALTER TABLE `directors`
  ADD PRIMARY KEY (`idDirector`);

--
-- Indexes for table `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`idDiscount`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`idEmployee`),
  ADD KEY `idCinema` (`idCinema`);

--
-- Indexes for table `films`
--
ALTER TABLE `films`
  ADD PRIMARY KEY (`idFilm`),
  ADD KEY `idStudio` (`idStudio`),
  ADD KEY `idDirector` (`idDirector`),
  ADD KEY `idAccess` (`idAccess`);

--
-- Indexes for table `film_actor`
--
ALTER TABLE `film_actor`
  ADD PRIMARY KEY (`idFA`),
  ADD KEY `idFilm` (`idFilm`),
  ADD KEY `idActor` (`idActor`);

--
-- Indexes for table `film_genre`
--
ALTER TABLE `film_genre`
  ADD PRIMARY KEY (`idFG`),
  ADD KEY `idFilm` (`idFilm`),
  ADD KEY `idGenre` (`idGenre`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`idGenre`);

--
-- Indexes for table `halls`
--
ALTER TABLE `halls`
  ADD PRIMARY KEY (`idHall`),
  ADD KEY `idCinema` (`idCinema`);

--
-- Indexes for table `projections`
--
ALTER TABLE `projections`
  ADD PRIMARY KEY (`idProjection`),
  ADD KEY `idFilm` (`idFilm`),
  ADD KEY `idHall` (`idHall`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`idReservation`),
  ADD KEY `idUser` (`idUser`);

--
-- Indexes for table `studios`
--
ALTER TABLE `studios`
  ADD PRIMARY KEY (`idStudio`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`idTicket`),
  ADD KEY `idDiscount` (`idDiscount`),
  ADD KEY `idProjection` (`idProjection`),
  ADD KEY `idReservation` (`idReservation`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accesses`
--
ALTER TABLE `accesses`
  MODIFY `idAccess` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `actors`
--
ALTER TABLE `actors`
  MODIFY `idActor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cinemas`
--
ALTER TABLE `cinemas`
  MODIFY `idCinema` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `directors`
--
ALTER TABLE `directors`
  MODIFY `idDirector` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `idDiscount` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `idEmployee` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `films`
--
ALTER TABLE `films`
  MODIFY `idFilm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `film_actor`
--
ALTER TABLE `film_actor`
  MODIFY `idFA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `film_genre`
--
ALTER TABLE `film_genre`
  MODIFY `idFG` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `idGenre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `halls`
--
ALTER TABLE `halls`
  MODIFY `idHall` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `projections`
--
ALTER TABLE `projections`
  MODIFY `idProjection` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `idReservation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `studios`
--
ALTER TABLE `studios`
  MODIFY `idStudio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `idTicket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`idCinema`) REFERENCES `cinemas` (`idCinema`);

--
-- Constraints for table `films`
--
ALTER TABLE `films`
  ADD CONSTRAINT `films_ibfk_2` FOREIGN KEY (`idStudio`) REFERENCES `studios` (`idStudio`),
  ADD CONSTRAINT `films_ibfk_3` FOREIGN KEY (`idDirector`) REFERENCES `directors` (`idDirector`),
  ADD CONSTRAINT `films_ibfk_4` FOREIGN KEY (`idAccess`) REFERENCES `accesses` (`idAccess`);

--
-- Constraints for table `film_actor`
--
ALTER TABLE `film_actor`
  ADD CONSTRAINT `film_actor_ibfk_2` FOREIGN KEY (`idActor`) REFERENCES `actors` (`idActor`),
  ADD CONSTRAINT `film_actor_ibfk_3` FOREIGN KEY (`idFilm`) REFERENCES `films` (`idFilm`);

--
-- Constraints for table `film_genre`
--
ALTER TABLE `film_genre`
  ADD CONSTRAINT `film_genre_ibfk_2` FOREIGN KEY (`idGenre`) REFERENCES `genres` (`idGenre`),
  ADD CONSTRAINT `film_genre_ibfk_3` FOREIGN KEY (`idFilm`) REFERENCES `films` (`idFilm`);

--
-- Constraints for table `halls`
--
ALTER TABLE `halls`
  ADD CONSTRAINT `halls_ibfk_1` FOREIGN KEY (`idCinema`) REFERENCES `cinemas` (`idCinema`);

--
-- Constraints for table `projections`
--
ALTER TABLE `projections`
  ADD CONSTRAINT `projections_ibfk_2` FOREIGN KEY (`idFilm`) REFERENCES `films` (`idFilm`),
  ADD CONSTRAINT `projections_ibfk_4` FOREIGN KEY (`idHall`) REFERENCES `halls` (`idHall`);

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`);

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`idDiscount`) REFERENCES `discounts` (`idDiscount`),
  ADD CONSTRAINT `tickets_ibfk_4` FOREIGN KEY (`idProjection`) REFERENCES `projections` (`idProjection`),
  ADD CONSTRAINT `tickets_ibfk_6` FOREIGN KEY (`idReservation`) REFERENCES `reservations` (`idReservation`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
