
-- PREVIOUSLY USED DATABASE, NOT APPLICABLE ANYMORE

/*CREATE SCHEMA Eravate;
USE Eravate;
DROP TABLE Planet;
DROP TABLE AppUser;
CREATE TABLE Planet(
	ID int primary key,
    Planet varchar(20),
    Mass double(10,2),
    Radius int,
    Gravity double(10,2),
    Temperature int,
    Pressure double(10,2),
    Orbital double(10,2),
    Axis double(10,2),
    Tilt double(10,2),
    Speed double(10,2),
    PlanetType varchar(20),
    Volcanism varchar(30),
    Atmosphere varchar(30),
    Atmosphere1 varchar(30),
    Atmosphere2 varchar(30),
    Atmosphere3 varchar(30),
    Composition1 varchar(30),
    Composition2 varchar(30)
    );
    
CREATE TABLE AppUser(
	email varchar(80) primary key,
    passwd varchar(120) NOT NULL,
	created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    #activate varchar(20) NOT NULL,
    #activated tinyint NOT NULL DEFAULT 0
);

-- MASS RADIUS GRAVITY TEMPERATURE PRESSURE ORBITALPERIOD SEMIMAJORAXIS AXIALTILT ORBITALSPEED TYPE VOLCANISM ATMOSPHERE COMPOSITION

INSERT INTO Planet VALUES(1,"MERCURY",0.05,2440,0.38,700,0,87.97,193.5,0.03,47.36,"Metal Rich","None","Thin Exosphere","42% Oxygen","29% Sodium","22% Hydrogen","60% Rock","40% Metal");
INSERT INTO Planet VALUES(2,"VENUS",0.81,6051,0.9,737,91,224.7,361.5,2.64,35.02,"Metal Rich","Silicate Magma","Carbon Dioxide","96,5% Carbon Dio.","3.5% Nitrogen","0.015% Sulfur","70% Rock","30% Metal");
INSERT INTO Planet VALUES(3,"EARTH",1,6378,1,288,1,365.3,500,23.44,29.78,"Earth-Like","Silicate Magma","Suitable for Life","77.9% Nitrogen","20.9% Oxygen","0.9% Argon","70% Rock", "30% Metal");
INSERT INTO Planet VALUES(4,"MARS",0.1,3389,0.38,210,0.01,686.97,761.5,25.19,24,"Earth-Like","None","Carbon Dioxide","95.97% Carbon Dio.","1.93% Argon","1.89% Nitrogen","70% Rock", "30% Metal");
INSERT INTO Planet VALUES(5,"JUPITER",317.8,69911,2.53,165,5.92,4332.59,2597,3.13,13.07,"Class 1 Gas Giant","None","Hydrogen Rich","89% Hydrogen","10% Helium","0.3% Methane","N/A"," ");
INSERT INTO Planet VALUES(6,"SATURN",95.16,58232,1.06,134,1.38,10759,4780.42,26.73,9.68,"Class 1 Gas Giant","None","Hydrogen Rich","96.3% Hydrogen","3.25% Helium","0.45% Methane","N/A"," ");
INSERT INTO Planet VALUES(7,"URANUS",14.53,25362,0.886,76,1000,30688,9589.98,82.23,6.8,"Ice Giant","None","Hydrogen Rich","83% Hydrogen","15% Helium","2.3% Methane","?% Ammonia","?% Water");
INSERT INTO Planet VALUES(8,"NEPTUNE",17.15,24622,1.14,72,1000,60182,15004.93,28.32,5.43,"Ice Giant","None","Hydrogen Rich","80% Hydrogen","19% Helium","1% Methane","?% Ammonia","?% Water");
INSERT INTO Planet VALUES(9,"PLUTO",0.01,1188,0.06,44,0.01,90560,19701.52,57.47,4.74,"Dwarf Planet","Methane Magma","Thin Methane",">90% Nitrogen","0.25% Methane","0.05% Carbon Mon.","80% Rock","20% Metal");*/


-- CONCEPT DATABASE noº 1, outsourced


/*DROP SCHEMA Eravate;
CREATE SCHEMA Eravate;
USE Eravate;
CREATE TABLE AppUser(
	email varchar(80) primary key,
    passwd varchar(120) NOT NULL,
	created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    #activate varchar(20) NOT NULL,
    #activated tinyint NOT NULL DEFAULT 0
);
CREATE TABLE "Object"(
    ID int primary key auto_increment,
    "name" varchar(80) NOT NULL,
    rotation double(5,2) NOT NULL,
    revolution double(10,2) NOT NULL,
    radius int NOT NULL,
    temp int NOT NULL,
    overviewTXT text NOT NULL,
    overviewSor tinytext NOT NULL,
    overviewURL text NOT NULL
);
CREATE TABLE Sun(
    ID int primary key foreign key,
);
CREATE TABLE Planet(
    ID int primary key foreign key,
);
CREATE TABLE Moon(
    ID int primary key foreign key,
);*/    


-- CONCEPT DATABASE noº 2, this is the database currently used by me.


DROP SCHEMA Eravate;
CREATE SCHEMA Eravate;
USE Eravate;

-- This table is used for both user creation and user log-in, the activate is used to send an e-mail with an activation link to the client after 
-- creating his account, but it is unknown whether I will be able to implement this.

CREATE TABLE AppUser(
	email varchar(80) primary key,
    passwd varchar(120) NOT NULL,
	created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    #activate varchar(20) NOT NULL,
    #activated tinyint NOT NULL DEFAULT 0
);

-- A star is any object whose orbit depends solely on the galaxy it belongs to.
-- To this day, it is unknown whether these objects are gravitationally bound to SMBH (Supermassive Black Holes), 
-- since those are believed to not produce enough gravity to keep an entire galaxy together.
-- That's why BH and SMBH will be part of the Star table.
-- Bellow, I'll include sources for this, in an easy to understand format (Kurzgesagt video), as well as scientific papers published on this matter (Pun not intended).
-- Kurzgesagt: https://www.youtube.com/watch?v=QAa2O_8wBUQ
-- https://royalsocietypublishing.org/doi/abs/10.1098/rsta.1986.0128
-- https://iopscience.iop.org/article/10.1086/309577/meta
-- https://www.annualreviews.org/doi/abs/10.1146/annurev-astro-081817-051756

CREATE TABLE Star(
    ID int primary key auto_increment,
    rotation double(5,2) NOT NULL,
    revolution double(10,2) NOT NULL,
    radius int NOT NULL,
    temp int NOT NULL,
    overviewTXT text NOT NULL,
    overviewSor tinytext NOT NULL,
    overviewURL text NOT NULL,
    3D tinyint NOT NULL
);

-- A planet is any object whose orbit depends on it's host star, has sufficient mass to assume hydrostatic equilibrium (nearly-round shape) 
-- and has cleared it's own orbit around the host star (the reason Pluto is not considered a planet).

CREATE TABLE Planet(
    ID int primary key auto_increment,
    rotation double(5,2) NOT NULL,
    revolution double(10,2) NOT NULL,
    radius int NOT NULL,
    temp int NOT NULL,
    overviewTXT text NOT NULL,
    overviewSor tinytext NOT NULL, 
    overviewURL text NOT NULL,
    3D tinyint NOT NULL
);

-- NPO are Non-planetary objects, or objects that fail to meet one of the criteria of becoming a planet, 
-- they include any asteroids and comets, as well as any TNOs (Trans-Neptunian Objects).

CREATE TABLE NPO(
    ID int primary key auto_increment,
    rotation double(5,2) NOT NULL,
    revolution double(10,2) NOT NULL,
    radius int NOT NULL,
    temp int NOT NULL,
    overviewTXT text NOT NULL,
    overviewSor tinytext NOT NULL, 
    overviewURL text NOT NULL,
    3D tinyint NOT NULL
);

-- a Moon is any object whose orbit depends on it's host planet, however, it does not need sufficient mass to assume hydrostatic equilibrium, 
-- nor cleared it's own orbit around the host planet, to be considered a moon.

CREATE TABLE Moon(
    ID int primary key auto_increment,
    rotation double(5,2) NOT NULL,
    revolution double(10,2) NOT NULL,
    radius int NOT NULL,
    temp int NOT NULL,
    overviewTXT text NOT NULL,
    overviewSor tinytext NOT NULL,
    overviewURL text NOT NULL,
    3D tinyint NOT NULL
);