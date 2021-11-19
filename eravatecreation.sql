
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
    name VARCHAR(50) NOT NULL,
    rotation double(5,2) NOT NULL,
    revolution double(10,2) NOT NULL,
    radius int NOT NULL,
    temp int NOT NULL,
    overviewTXT text NOT NULL,
    overviewSor tinytext NOT NULL,
    overviewURL text NOT NULL,
    internalTXT text NOT NULL,
    internalSor tinytext NOT NULL,
    internalURL text NOT NULL,
    surfaceTXT text NOT NULL,
    surfaceSor tinytext NOT NULL,
    surfaceURL text NOT NULL,
    3D tinyint NOT NULL
);

-- A planet is any object whose orbit depends on it's host star, has sufficient mass to assume hydrostatic equilibrium (nearly-round shape) 
-- and has cleared it's own orbit around the host star (the reason Pluto is not considered a planet).

CREATE TABLE Planet(
    ID int primary key auto_increment,
    Star int,
    name VARCHAR(50) NOT NULL,
    position int NOT NULL,
    rotation double(5,2) NOT NULL,
    revolution double(10,2) NOT NULL,
    radius int NOT NULL,
    temp int NOT NULL,
    overviewTXT text NOT NULL,
    overviewSor tinytext NOT NULL, 
    overviewURL text NOT NULL,
    internalTXT text NOT NULL,
    internalSor tinytext NOT NULL,
    internalURL text NOT NULL,
    surfaceTXT text NOT NULL,
    surfaceSor tinytext NOT NULL,
    surfaceURL text NOT NULL,
    3D tinyint NOT NULL,
    FOREIGN KEY (Star) REFERENCES Star(ID)
);

-- NPO are Non-planetary objects, or objects that fail to meet one of the criteria of becoming a planet, 
-- they include any asteroids and comets, as well as any TNOs (Trans-Neptunian Objects).

CREATE TABLE NPO(
    ID int primary key auto_increment,
    Star int,
    name VARCHAR(50) NOT NULL,
    rotation double(5,2) NOT NULL,
    revolution double(10,2) NOT NULL,
    radius int NOT NULL,
    temp int NOT NULL,
    overviewTXT text NOT NULL,
    overviewSor tinytext NOT NULL, 
    overviewURL text NOT NULL,
    internalTXT text NOT NULL,
    internalSor tinytext NOT NULL,
    internalURL text NOT NULL,
    surfaceTXT text NOT NULL,
    surfaceSor tinytext NOT NULL,
    surfaceURL text NOT NULL,
    3D tinyint NOT NULL,
    FOREIGN KEY (Star) REFERENCES Star(ID)
);

-- a Satellite is any object whose orbit depends on it's host planet, however, it does not need sufficient mass to assume hydrostatic equilibrium, 
-- nor cleared it's own orbit around the host planet, to be considered a satellite.

CREATE TABLE Satellite(
    ID int primary key auto_increment,
    Planet int,
    name VARCHAR(50) NOT NULL,
    position int NOT NULL,
    rotation double(5,2) NOT NULL,
    revolution double(10,2) NOT NULL,
    radius int NOT NULL,
    temp int NOT NULL,
    overviewTXT text NOT NULL,
    overviewSor tinytext NOT NULL,
    overviewURL text NOT NULL,
    internalTXT text NOT NULL,
    internalSor tinytext NOT NULL,
    internalURL text NOT NULL,
    surfaceTXT text NOT NULL,
    surfaceSor tinytext NOT NULL,
    surfaceURL text NOT NULL,
    3D tinyint NOT NULL,
    FOREIGN KEY (Planet) REFERENCES Planet(ID)
);

-- Here we add basic data for the app to work

INSERT INTO Star VALUES(0,"Sol",24.47,0,695700,5499,"Sol is a G-Type main-sequence star that constitutes about 99.86% of the mass of the Sol System, it is estimated to be 85% brighter than the rest of the stars in the Milky Way, most of which are red dwarfs.","Wikipedia","https://en.wikipedia.org/wiki/Sun","There are three main parts to the Sun's interior: the core, the radiation zone and the convective zone. The core extends from the center to about 20% of the solar radius, and it has a temperature of close to 15.7 million Celsius","Wikipedia","https://en.wikipedia.org/wiki/Sun","Sol doesn't have a solid surface, the part of Sol most commonly called its surface is the photosphere, it's the first layer of the atmosphere.","Nasa","https://solarsystem.nasa.gov/solar-system/sun/in-depth/",1);
INSERT INTO Planet VALUES(0,1,"Mercury",1,176,87.97,2440,430,"Mercury is the smallest planet in the Sol System, and the closest to its host star. It is tidally locked with Sol in a 3:2 spin-orbit resonance","Wikipedia","https://en.wikipedia.org/wiki/Mercury_(planet)","Mercury appears to have a solid silicate crust and mantle overlying a solid, iron sulfide outer core layer, a deeper liquid core layer, and a solid inner core. Mercury's core occupies about 55% of its volume.","Wikipedia","https://en.wikipedia.org/wiki/Mercury_(planet)","Mercury's surface is similar in appearance to that of the Moon, showing extensive mare-like plains and heavy cratering, indicating that it has been geologically inactive for billions of years. Mercury has dorsa (also called wrinkle-ridges), Moon-like highlands, montes (mountains), planitiae (plains), rupes (escarpments), and valles (valleys).","Wikipedia","https://en.wikipedia.org/wiki/Mercury_(planet)",1);
INSERT INTO Planet VALUES(0,1,"Venus",2,243,117,6052,464,"Venus is the second planet from Sol, and is one of the four terrestrial planets in the Sol System, having the densest atmosphere out of the four.","Wikipedia","https://en.wikipedia.org/wiki/Venus","Little direct information is available about the internal structure of Venus, the similarity to Earth suggest they share the same internal structure: a core, mantle and crust.","Wikipedia","https://en.wikipedia.org/wiki/Venus","About 80% of the Venusian surface is covered by volcanic plains, two highland continents make up the rest of its surface, one in the northen hemisphere and the other just south of the equator.","Wikipedia","https://en.wikipedia.org/wiki/Venus",1);
INSERT INTO Planet VALUES(0,1,"Earth",3,0.99,365.26,6371,16,"Earth is the third planet from Sol, and is the only astronomical object known to harbour and support life. About 29.2% of Earth's surface is land with the remaining 70.8% being covered with water.","Wikipedia","https://en.wikipedia.org/wiki/Earth","Earth's interior, like that of the other terrestrial planets, is divided into layers by their chemical or physical (rheological) properties. The outer layer is a chemically distinct silicate solid crust, which is underlain by a highly viscous solid mantle.","Wikipedia","https://en.wikipedia.org/wiki/Earth","70.8% of Earth's surface is below the sea level and covered by the ocean water. The remaining 29.2% not covered by water has terrain that varies greatly from place to place.","Wikipedia","https://en.wikipedia.org/wiki/Earth",1);
INSERT INTO Planet VALUES(0,1,"Mars",4,1.02,686,3389.5,-63,"Mars is the fourth planet from Sol, and the second-smallest planet in the Sol System, Mars is a terrestrial planet with a thin atmosphere, and is the best candidate for terraforming.","Wikipedia","https://en.wikipedia.org/wiki/Mars","Like Earth, Mars has differentiated into a dense metallic core overlaid by less dense materials. The average thickness of the planet's crust is about 50km. Earth's crust averages 40km","Wikipedia","https://en.wikipedia.org/wiki/Mars","Mars's surface consists of minerals containing siliocn and oxygen, metals, and rocks. The Martian surface is primarily composed of tholeiitic basalt. It has no evidence of a structured global magnetic field.","Wikipedia","https://en.wikipedia.org/wiki/Mars",1);
INSERT INTO Planet VALUES(0,1,"Jupiter",5,0.41,4332.59,69911,-108,"Jupiter is the fifth and largest planet in the Sol System, It's a gas giant with a mass more than two and a half times of all other planets in the Sol System combined, but just less than one-thousandth the mass of Sol","Wikipedia","https://en.wikipedia.org/wiki/Mars","Jupiter's internal structure consist of a dense core (between 30-50% of the planet's radius), a surrounding layer of liquid metallic hydrogen (with some helium) extending outward to about 80% of the radius of the planet, and an outer atmosphere consisting predominantly of molecular hydrogen","Wikipedia","https://en.wikipedia.org/wiki/Jupiter","Jupiter lacks a solid surface, instead being covered with clouds composed of ammonia crystals and ammonium hydrosulfide, the cloud layer is about 50km deep, and consists of two decks of clouds: a thick lower deck and a thin clearer region.","Wikipedia","https://en.wikipedia.org/wiki/Jupiter",1);
INSERT INTO Planet VALUES(0,1,"Saturn",6,0.45,10759,58232,-139,"Saturn is the sixth planet from Sol, and the second-largest in the Sol System, It's a gas giant with an average radius of about nine and a half times that of Earth, and It's 95 times as massive.","Wikipedia","https://en.wikipedia.org/wiki/Saturn","Most of Saturn's mass is not in the gas phase. The temperature, pressure and density inside Saturn all rise steadily toward the core, which causes hydrogen to be a metal in the deeper layers, Saturn's interior is similar to that of Jupiter.","Wikipedia","https://en.wikipedia.org/wiki/Saturn"," In the upper cloud layers, with the temperature in the range 100–160 K and pressures extending between 0.5–2 bar, the clouds consist of ammonia ice. Water ice clouds begin at a level where the pressure is about 2.5 bar and extend down to 9.5 bar, where temperatures range from 185 to 270 K.","Wikipedia","https://en.wikipedia.org/wiki/Saturn",1);
INSERT INTO Planet VALUES(0,1,"Uranus",7,0.72,30688,25362,-197,"Uranus is the seventh planet from Sol, It's similar in composition to Neptune, and they are both considered ice giants, It's atmosphere is similar in composition to the gas giants, but it contains more ices such as water, ammonia or methane.","Wikipedia","https://en.wikipedia.org/wiki/Uranus","Uranus's structure consists of three layers, a rocky (silicate/iron-nickel) core in the centre, an icy mantle in the middle and an outer gaseous hydrogen/helium envelope.","Wikipedia","https://en.wikipedia.org/wiki/Uranus","Although there is no well-defined solid surface within Uranus's interior, the outermost part of Uranus's gaseous envelope that is accessible to remote sensing is called its atmosphere. Remote-sensing capability extends down to roughly 300 km below the 1 bar level, with a corresponding pressure around 100 bar and temperature of 47 °C.","Wikipedia","https://en.wikipedia.org/wiki/Uranus",1);
INSERT INTO Planet VALUES(0,1,"Neptune",8,0.67,60195,24622,-201,"Neptune is the eight and the farthest-known planet from Sol, and the only planet not visible to the unaided eye. In contrast to the hazy, relatively featureless atmosphere of Uranus, Neptune's atmosphere has active and visible weather patterns.","Wikipedia","https://en.wikipedia.org/wiki/Neptune","Neptune's internal structure resembles that of Uranus. Its atmosphere forms about 5 to 10% of its mass and extends perhaps 10 to 20% of the way towards the core. Increasing concentrations of methane, ammonia and water are found in the lower regions of the atmosphere.","Wikipedia","https://en.wikipedia.org/wiki/Neptune","Neptune's atmosphere is subdivided into two main regions: the lower troposphere, where temperature decreases with altitude, and the stratosphere, where temperature increases with altitude. The boundary between the two, the tropopause, lies at a pressure of 0.1 bars (10 kPa).","Wikipedia","https://en.wikipedia.org/wiki/Neptune",1);