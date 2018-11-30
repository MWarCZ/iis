

INSERT INTO `actor` (`birthday`, `firstname`, `lastname`) VALUES 
	( NULL, 'Radek', 'Radkovič'),
	( NULL, 'Vašek', 'Vaškovič'),
	( NULL, 'Mirek', 'Mirkovič'),
	( NULL, 'Marek', 'Markovič'),
	( NULL, 'Jan', 'Janovič'),
	( NULL, 'Ivan', 'Ivanovič'),
	( NULL, 'Jarek', 'Jarkovič');

INSERT INTO `director` (`birthday`, `firstname`, `lastname`) VALUES 
	( NULL, 'Jana', 'Janová'),
	( NULL, 'Klára', 'Klárová'),
	( NULL, 'Pavla', 'Pavlová'),
	( NULL, 'Iveta', 'Ivetová'),
	( NULL, 'Hana', 'Hanová');

INSERT INTO `studio` (`name`) VALUES 
	( 'StudioA'),
	( 'StudioB'),
	( 'StudioC'),
	( 'StudioD'),
	( 'StudioE');

INSERT INTO `genre` (`name`) VALUES 
	( 'Fantasy'),
	( 'Sci-Fi'),
	( 'Drama'),
	( 'Horor'),
	( 'Pohádka'),
	( 'Animované'),
	( 'Komedie');

INSERT INTO `film` (`name`, `duration`, `premiere`, `idDirector`, `idStudio`) VALUES 
	('Film XYZ', 60, NULL, 1, 1), 
	('Filmeček', 40, NULL, 1, 2), 
	('Filmík', 30, NULL, 1, 3), 
	('Filmečku můj', 10, NULL, 2, 1), 
	('Ahoj filme', 120, NULL, 2, 2), 
	('Ahojda!', 100, NULL, 2, 3), 
	('Ahojky holky', 90, NULL, 3, 1), 
	('Zase tady', 160, NULL, 4, 4), 
	('Zase tam', 125, NULL, 4, 4);

INSERT INTO `cinema` (`name`, `address`, `img`) VALUES 
	('KinoA', 'Brno, Malá 120', NULL),
	('KinoB', 'Praha, Stará 120', NULL),
	('KinoC', 'Olomouc, Nezdravá 120', NULL),
	('KinoD', 'Zlín, Dobrá 120', NULL),
	('KinoE', 'Liberec, Kládná 120', NULL),
	('KinoF', 'Až, Záporná 120', NULL);

INSERT INTO `room` ( `name`, `capacity`, `idCinema`) VALUES 
	('RoomA1', 20, 1),
	('RoomA2', 30, 1),
	('RoomA3', 25, 1),
	('RoomB1', 20, 2),
	('RoomB2', 30, 2),
	('RoomB3', 25, 2),
	('RoomC1', 20, 3),
	('RoomC2', 30, 3),
	('RoomC3', 25, 3),
	('RoomD1', 20, 4),
	('RoomD2', 30, 4),
	('RoomE1', 20, 5),
	('RoomE2', 30, 5),
	('RoomF1', 40, 6);

-- =======================

INSERT INTO `client` ( `login`, `password`, `firstname`, `lastname`) VALUES 
	('adam', 'adam','Adam','Adamovič'),
	('eva', 'eva','Eva','Evová'),
	('karel', 'karel','Karel','Karelka'),
	('jan', 'jan','Jan','Janovský');


INSERT INTO `job` (`name`) VALUES 
	( 'Prodavač'),
	( 'Manager'),
	( 'Admin');

INSERT INTO `worker` ( `login`, `password`, `firstname`, `lastname`, `salary`, `idCinema`, `idJob`) VALUES 
	('mirek', 'mirek','Mirek','Válka', 30000, 1, 3),
	('xxx', 'xxx','Xxx','XXX', 16000, 1, 1),
	('yyy', 'yyy','Yyy','YYY', 20000, 1, 2),
	('zzz', 'zzz','Zzz','ZZZ', 25000, 2, 2),
	('aaa', 'aaa','Aaa','AAA', 25000, 2, 1);


INSERT INTO `projection` (`datetime`, `price`, `idRoom`, `idFilm`) VALUES 
	( '2018-03-01 08:00', 150, 1, 1 ),
	( '2018-03-01 12:00', 200, 1, 1 ),
	( '2018-03-01 20:00', 250, 1, 1 ),

	( '2019-01-01 08:00', 150, 1, 3 ),
	( '2019-01-01 12:00', 200, 1, 3 ),
	( '2019-01-01 20:00', 250, 1, 3 ),
	( '2019-04-01 08:00', 150, 2, 2 ),
	( '2019-04-01 12:00', 200, 2, 2 ),
	( '2019-04-01 20:00', 250, 2, 2 ),
	( '2019-02-01 08:00', 150, 3, 3 ),
	( '2019-02-01 12:00', 200, 3, 3 ),
	( '2019-02-01 20:00', 250, 3, 3 ),
	( '2019-03-01 08:00', 150, 4, 1 ),
	( '2019-03-01 12:00', 200, 4, 1 ),
	( '2019-03-01 20:00', 250, 4, 1 ),
	( '2019-02-01 08:00', 150, 5, 2 ),
	( '2019-02-01 12:00', 200, 5, 2 ),
	( '2019-02-01 20:00', 250, 5, 2 );


INSERT INTO `state` (`name`) VALUES 
	( 'Rezervované'),
	( 'Zrušené'),
	( 'Zakoupené');

INSERT INTO `reservation` (`code`, `registrated`, `idClient`, `idState`) VALUES 
	( 111, '2018-01-01 10:00', 1, 2 ),
	( 112, '2018-01-01 11:00', 1, 3 ),
	( 113, '2018-01-01 12:00', 1, 3 ),

	( 211, '2018-01-01 10:00', 2, 2 ),
	( 212, '2018-01-01 11:00', 2, 3 ),
	( 213, '2018-01-01 12:00', 2, 2 ),

	( 311, '2018-01-01 10:00', 1, 1 ),
	( 312, '2018-01-01 11:00', 1, 1 ),
	( 313, '2018-01-01 12:00', 2, 1 );


INSERT INTO `ticket` (`seat`, `idProjection`, `idReservation`, `idClient`, `idSale`) VALUES 
	( 1, 1, 1, NULL, NULL ),
	( 2, 1, 1, NULL, NULL ),
	( 3, 1, 1, NULL, NULL ),
	( 4, 1, 1, NULL, NULL ),
	( 5, 1, 1, NULL, NULL ),

	( 10, 1, 2, NULL, NULL ),
	( 11, 1, 2, NULL, NULL );

-- 7A x 9F
INSERT INTO `actorPlayInFilm` (`idActor`, `idFilm`) VALUES 
	(1, 1),
	(2, 1),
	(4, 1),
	(5, 1),

	(1, 2),
	(3, 2),
	(4, 2),

	(7, 3),
	(6, 3),
	(5, 3),
	(1, 3),

	(2, 4),
	(3, 4),
	(6, 4);

-- 7G x 9F
INSERT INTO `filmIntoGenre` (`idFilm`, `idGenre`) VALUES 
	(1, 1),
	(3, 1),
	(5, 1),
	(7, 1),
	(9, 1),

	(2, 2),
	(4, 2),
	(6, 2),
	(8, 2),

	(6, 3),
	(7, 3),
	(8, 3),
	(9, 3),

	(1, 4),
	(2, 4),
	(3, 4),

	(4, 5),
	(5, 5),
	(6, 5),

	(7, 6),
	(8, 6),
	(9, 6);
