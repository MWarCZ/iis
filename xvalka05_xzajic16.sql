-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2018 at 08:06 PM
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
(1, 'zsczsawd', 'asdasdas', '2018-11-01'),
(2, 'qwerty', 'asdtyjhgfds', '2018-11-02');

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
(1, 'asdasd', 'asdasda');

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
(1, 'asdasd', 'asdasd', '2018-11-01'),
(2, 'xcvxcv', 'xcvxcv', '2018-11-01');

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
(5, 'ZTP', 25),
(7, 'aaasdasdaa', 99);

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
  `idCinema` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`idEmployee`, `login`, `name`, `surname`, `passwd`, `ssn`, `access_level`, `idCinema`) VALUES
(1, 'admin', 'Administrator', 'Administrator', '$2y$10$9Hbrghb4uP/q3cvgBHb85.n0whD3uN/kSwPD29vrdtYJBWliCWIk2', 'none', 4, NULL);

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
  `idStudio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `films`
--

INSERT INTO `films` (`idFilm`, `name`, `duration`, `released`, `ratings`, `idDirector`, `idStudio`) VALUES
(1, 'awesdrtfhgds', 150, '2018-11-01', 15, 1, 1),
(2, 'asdasda', 150, '2018-11-01', 15, 2, 1);

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
(3, 2, 2);

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
(2, 1, 2),
(3, 2, 2);

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
(2, 'Sci-Fi');

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
(1, 'asd', 10, 1);

-- --------------------------------------------------------

--
-- Table structure for table `prices`
--

CREATE TABLE `prices` (
  `idPrice` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `prices`
--

INSERT INTO `prices` (`idPrice`, `description`, `price`) VALUES
(1, '2D', 99),
(2, '3D', 149),
(3, 'Předpremiéra', 199),
(5, 'aaaa', 2000),
(6, 'aaaa', 2000);

-- --------------------------------------------------------

--
-- Table structure for table `projections`
--

CREATE TABLE `projections` (
  `idProjection` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `idFilm` int(11) NOT NULL,
  `idAccess` int(11) NOT NULL,
  `idPrice` int(11) NOT NULL,
  `idHall` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projections`
--

INSERT INTO `projections` (`idProjection`, `date`, `idFilm`, `idAccess`, `idPrice`, `idHall`) VALUES
(5, '2018-01-01 18:40:00', 1, 1, 1, 1),
(8, '2018-12-01 00:00:00', 2, 1, 1, 1),
(9, '2018-12-01 00:00:00', 2, 1, 1, 1),
(10, '2018-12-01 00:00:00', 1, 1, 1, 1),
(11, '2018-12-01 00:00:00', 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `idReservation` int(11) NOT NULL,
  `reserved` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `paid` tinyint(1) NOT NULL,
  `picked` tinyint(1) NOT NULL,
  `idUser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`idReservation`, `reserved`, `paid`, `picked`, `idUser`) VALUES
(3, '2018-12-01 18:35:35', 0, 0, 1),
(4, '2018-12-01 18:35:35', 0, 0, 1),
(5, '2018-12-01 18:35:35', 0, 0, 2),
(6, '2018-12-01 18:35:35', 0, 0, 2);

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
(1, 'xcvxcvxcv'),
(2, 'asdasdasd');

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
(1, 199, 3, 1, 5, 1),
(2, 199, 3, 1, 5, 1),
(3, 199, 3, 1, 8, 1),
(4, 199, 4, 1, 8, 1),
(5, 199, 5, 1, 5, 1),
(6, 199, 5, 1, 5, 1),
(7, 199, 5, 1, 9, 1),
(8, 199, 6, 1, 5, 1),
(9, 199, 6, 1, 9, 1),
(10, 199, 6, 1, 10, 1),
(11, 199, 6, 1, 10, 1);

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
(1, 'test', 'test', 'test', 'tes@test.test', '$2y$10$zwwWQjobBnuXBriBRkcinOq6CgRYQ05DTc7/.SCDSd8azy3do.6CW'),
(2, 'asdasd', 'asdasd', 'asdasd', 'asdasda', 'zasdasd');

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
  ADD KEY `idDirector` (`idDirector`);

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
-- Indexes for table `prices`
--
ALTER TABLE `prices`
  ADD PRIMARY KEY (`idPrice`);

--
-- Indexes for table `projections`
--
ALTER TABLE `projections`
  ADD PRIMARY KEY (`idProjection`),
  ADD KEY `idAccess` (`idAccess`),
  ADD KEY `idFilm` (`idFilm`),
  ADD KEY `idPrice` (`idPrice`),
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
  MODIFY `idActor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cinemas`
--
ALTER TABLE `cinemas`
  MODIFY `idCinema` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `directors`
--
ALTER TABLE `directors`
  MODIFY `idDirector` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `idDiscount` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `idEmployee` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `films`
--
ALTER TABLE `films`
  MODIFY `idFilm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `film_actor`
--
ALTER TABLE `film_actor`
  MODIFY `idFA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `film_genre`
--
ALTER TABLE `film_genre`
  MODIFY `idFG` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `idGenre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `halls`
--
ALTER TABLE `halls`
  MODIFY `idHall` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `prices`
--
ALTER TABLE `prices`
  MODIFY `idPrice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `projections`
--
ALTER TABLE `projections`
  MODIFY `idProjection` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `idReservation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `studios`
--
ALTER TABLE `studios`
  MODIFY `idStudio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `idTicket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  ADD CONSTRAINT `films_ibfk_3` FOREIGN KEY (`idDirector`) REFERENCES `directors` (`idDirector`);

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
  ADD CONSTRAINT `projections_ibfk_1` FOREIGN KEY (`idAccess`) REFERENCES `accesses` (`idAccess`),
  ADD CONSTRAINT `projections_ibfk_2` FOREIGN KEY (`idFilm`) REFERENCES `films` (`idFilm`),
  ADD CONSTRAINT `projections_ibfk_3` FOREIGN KEY (`idPrice`) REFERENCES `prices` (`idPrice`),
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
