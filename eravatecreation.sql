
-- PREVIOUSLY USED DATABASE FOR PREVIOUS WEBSITE, NOT APPLICABLE ANYMORE

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
	created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    token varchar(120),
    tokenRes varchar(120),
    -- #activate varchar(20) NOT NULL,
    -- #activated tinyint NOT NULL DEFAULT 0,
    isAdmin tinyint NOT NULL DEFAULT 0,
    isSuperAdmin tinyint NOT NULL DEFAULT 0
) ENGINE = InnoDB;

CREATE TABLE SessionID(
	user varchar(80),
    ID varchar(120),
	created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user) REFERENCES AppUser(email),
    PRIMARY KEY (user, ID)
)  ENGINE = InnoDB;

-- Admin logs will be kept here 

CREATE TABLE AdminLogs(
    ID int primary key auto_increment,
    user varchar(80),
    action varchar(80),
    objectAffected varchar(80),
    done timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user) REFERENCES AppUser(email)
) ENGINE = InnoDB;

-- Messages sent by the users to the site admins will be kept here

CREATE TABLE MessageToTeam(
    ID int primary key auto_increment,
    sentBy varchar(80) NOT NULL,
    message text NOT NULL,
    sentOn timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    hasBeenRead tinyint NOT NULL DEFAULT 0,
    closed tinyint NOT NULL DEFAULT 0,
    isTagged tinyint NOT NULL DEFAULT 0,
    FOREIGN KEY (sentBy) REFERENCES AppUser(email)
) ENGINE = InnoDB;

-- Man why the fuck am I complicating this more?

CREATE TABLE CommentsOnMessage(
    ID int primary key auto_increment,
    message int NOT NULL,
    sentBy varchar(80) NOT NULL,
    comment text NOT NULL,
    sentOn timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (message) REFERENCES MessageToTeam(ID),
    FOREIGN KEY (sentBy) REFERENCES AppUser(email)
) ENGINE = InnoDB;

-- A star is any object whose orbit depends solely on the galaxy it belongs to.
-- To this day, it is unknown whether these objects are gravitationally bound to SMBH (Supermassive Black Holes), 
-- since those are believed to not produce enough gravity to keep an entire galaxy together.
-- That's why BH and SMBH will be part of the Star table.
-- Below, I'll include sources for this, in an easy to understand format (Kurzgesagt video), as well as scientific papers published on this matter (Pun not intended).
-- Kurzgesagt: https://www.youtube.com/watch?v=QAa2O_8wBUQ
-- https://royalsocietypublishing.org/doi/abs/10.1098/rsta.1986.0128
-- https://iopscience.iop.org/article/10.1086/309577/meta
-- https://www.annualreviews.org/doi/abs/10.1146/annurev-astro-081817-051756

-- There are 7 different star types, K G B F O A M, with an addition of carbon stars and dwarfs C L T Y, and Wolf Rayet W

CREATE TABLE StarType(
    ID int primary key auto_increment,
    name varchar(1) NOT NULL
) ENGINE = InnoDB;

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
    startype int NOT NULL,
    CONSTRAINT StarType FOREIGN KEY (startype) REFERENCES StarType(ID) ON DELETE CASCADE
) ENGINE = InnoDB;

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
    3D tinyint NOT NULL DEFAULT 0,
    CONSTRAINT PlanetStar FOREIGN KEY (Star) REFERENCES Star(ID) ON DELETE CASCADE
) ENGINE = InnoDB;

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
    3D tinyint NOT NULL DEFAULT 0,
    CONSTRAINT NpoStar FOREIGN KEY (Star) REFERENCES Star(ID) ON DELETE CASCADE
) ENGINE = InnoDB;

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
    3D tinyint NOT NULL DEFAULT 0,
    CONSTRAINT SatellitePlanet FOREIGN KEY (Planet) REFERENCES Planet(ID) ON DELETE CASCADE
) ENGINE = InnoDB;

-- Here we add basic data for the app to work

INSERT INTO StarType VALUES(0,"O"); -- 1
INSERT INTO StarType VALUES(0,"B"); -- 2
INSERT INTO StarType VALUES(0,"A"); -- 3
INSERT INTO StarType VALUES(0,"F"); -- 4
INSERT INTO StarType VALUES(0,"G"); -- 5
INSERT INTO StarType VALUES(0,"K"); -- 6
INSERT INTO StarType VALUES(0,"M"); -- 7
INSERT INTO StarType VALUES(0,"C"); -- 8
INSERT INTO StarType VALUES(0,"L"); -- 9
INSERT INTO StarType VALUES(0,"T"); -- 10
INSERT INTO StarType VALUES(0,"Y"); -- 11
INSERT INTO StarType VALUES(0,"W"); -- 12
INSERT INTO StarType VALUES(0,"H"); -- 13, H for  Black Hole
INSERT INTO StarType VALUES(0,"N"); -- 14, N for Neutron Star

-- INSERT INTO Star VALUES(0,"",0,0,0,0,"","","","","","","","","",0);
INSERT INTO Star VALUES(0,"Sol",24.47,0,695700,5499,"Sol is a G-Type main-sequence star that constitutes about 99.86% of the mass of the Sol System, it is estimated to be 85% brighter than the rest of the stars in the Milky Way, most of which are red dwarfs.","Wikipedia","https://en.wikipedia.org/wiki/Sun","There are three main parts to the Sun's interior: the core, the radiation zone and the convective zone. The core extends from the center to about 20% of the solar radius, and it has a temperature of close to 15.7 million Celsius.","Wikipedia","https://en.wikipedia.org/wiki/Sun","Sol doesn't have a solid surface, the part of Sol most commonly called its surface is the photosphere, it's the first layer of the atmosphere.","Nasa","https://solarsystem.nasa.gov/solar-system/sun/in-depth/",5);
INSERT INTO Star VALUES(0,"Kepler-22",13.13,0,681090,5518,"Kepler-22 is a Sol-like Star that is orbited by a planet found to be within the star's habitable zone, the star is too faint to be seen with the naked eye, the estimated distance is 638ly.","Wikipedia","https://en.wikipedia.org/wiki/Kepler-22","Kepler-22 is slightly smaller and cooler than the Sun, with a lower abundance of elements having more mass than helium. It has a spectral type of G5V. This star is radiating 79% of the Sun's luminosity from its outer atmosphere.","Wikipedia","https://en.wikipedia.org/wiki/Kepler-22","From it's similarity to Sol, Kepler-22 doesn't have a solid surface, the part of the star most commonly called its surface is the photosphere, it's the first layer of the atmosphere.","Nasa","https://solarsystem.nasa.gov/solar-system/sun/in-depth/",5);
INSERT INTO Star VALUES(0,"Kepler-7",0,0,1282175,5933,"Kepler-7 is a Sol-like Star orbited by a Jupiter-size gas giant, it is nearly twice Sol's radius, and is located nearly 3100ly away from our host star.","Wikipedia","https://en.wikipedia.org/wiki/Kepler-7","Kepler-7 is about 35% more massive and 85% wider than Sol. It is estimated that the star is 3.5 billion years old, and is approximately 30% more metal-rich than Sol.","Wikipedia","https://en.wikipedia.org/wiki/Kepler-7","Too little is known about Kepler-7's geology, but it is believed to be similar to Sol's geology.","None / Wikipedia","https://en.wikipedia.org/wiki/Kepler-7",5);
INSERT INTO Star VALUES(0,"Kepler-452",0,0,772227,5757,"Kepler-452 is a G-type main sequence star (Sol-like) located about 1800ly away from Earth. Due to it's similarities to Sol, it can be considered a Solar Twin.","Wikipedia","https://en.wikipedia.org/wiki/Kepler-452","Kepler-452 is 20% brighter, 3.7% more massive and 11% larger than Sol. It is approximately 6 billion years old and posseses a high metallicity","Wikipedia","https://en.wikipedia.org/wiki/Kepler-452","Too little is known about Kepler-452's geology, but it is believed to be similar to Sol's geology.","None / Wikipedia","https://en.wikipedia.org/wiki/Kepler-452",5);
INSERT INTO Star VALUES(0,"Gliese 504",0,0,946152,6291,'Gliese 504, also known as 59 Virginis or HR 5011 is a G-type main sequence star (Sol-like) located approximately 57ly away from Earth, this star is known to astronomers since 1598.',"Wikipedia",'https://en.wikipedia.org/wiki/59_Virginis',"Gliese 504 is a very young star, approximately 2.5 billion years old. It is twice as bright as Sol, but only 36% larger and 16% more massive.","Wikipedia","https://en.wikipedia.org/wiki/59_Virginis","Too little is known about Gliese 504's geology, but it is believed to be similar to Sol's geology.","None / Wikipedia","https://en.wikipedia.org/wiki/59_Virginis",5);
INSERT INTO Star VALUES(0,"OGLE-2005-BLG-390L",0,0,0,0,"OGLE-2005-BLG-390L is a star thought to be a M-type main sequence star, with a small probability it could be a white dwarf, neutron star or black hole. It is approximately 21500ly away from Sol.","Wikipedia","https://en.wikipedia.org/wiki/OGLE-2005-BLG-390L","No information is provided on this star.","None / Wikipedia","https://en.wikipedia.org/wiki/OGLE-2005-BLG-390L","No information is provided on this star.","None / Wikipedia","https://en.wikipedia.org/wiki/OGLE-2005-BLG-390L",7);
INSERT INTO Star VALUES(0,"HAT-P-11",0,0,475163,4780,"HAT-P-11 is a K-type main sequence star located about 123ly away from Sol. The star is notable for its relatively large rate of proper motion. It is about 6.5 billion years old.","Wikipedia","https://en.wikipedia.org/wiki/HAT-P-11","HAT-P-11 is 46% smaller and 23% less massive than Sol. Its magnitude is about 9, which means it is not visible to the naked eye.","Wikipedia","https://en.wikipedia.org/wiki/HAT-P-11","No information is provided on this star.","None / Wikipedia","https://en.wikipedia.org/wiki/HAT-P-11",6);
INSERT INTO Star VALUES(0,"HD 189733",0,0,560038,4875,"HD 189733 is a binary system approximately 64.5ly away from Sol. The primary star is suspected to be a K-type main sequence star, while the secondary star is a red dwarf.","Wikipedia","https://en.wikipedia.org/wiki/HD_189733","The primary star is 24% smaller and 18 less massive than Sol. Its magnitude is 8 and it can be seen with binoculars.","Wikipedia","https://en.wikipedia.org/wiki/HD_189733","No information is provided on this star.","None / Wikipedia","https://en.wikipedia.org/wiki/HD_189733",6);
INSERT INTO Star VALUES(0,"YZ Ceti",0,0,116877,3056,"YZ Ceti is a M-type main sequence star. It is relatively close to Sol at just 12ly, but it cannot be seen with the naked eye. It is classified as a flare star.","Wikipedia","https://en.wikipedia.org/wiki/YZ_Ceti","YZ Ceti is about 13% the mass of Sol and 17% of its radius. It is a variable star designation as it undergoes intermittent fluctuations in luminosity.","Wikipedia","https://en.wikipedia.org/wiki/YZ_Ceti","No information is provided on this star.","None / Wikipedia","https://en.wikipedia.org/wiki/YZ_Ceti",7);
INSERT INTO Star VALUES(0,"Proxima Centauri",0,0,107276,3042,"Proxima Centauri is the nearest-known star to Sol. It is located 4.24ly away from it. It is too faint to be seen with the naked eye, and it is a member of the Alpha Centauri System.","Wikipedia","https://en.wikipedia.org/wiki/Proxima_Centauri","Proxima Centauri is about 12.5% of the Sun's mass. Due to the star's proximity to Earth, its angular diameter can be measured directly. It is a flare star.","Wikipedia","https://en.wikipedia.org/wiki/Proxima_Centauri","No information is provided on this star.","None / Wikipedia","https://en.wikipedia.org/wiki/Proxima_Centauri",7);
INSERT INTO Star VALUES(0,"Sagittarius A*",0,0,22984000,9977,"Sagittarius A* is a supermassive black hole located at the centre of the Milky Way, its current value of mass is in excess of 4 million solar masses. It is yet to be observed.","Wikipedia","https://en.wikipedia.org/wiki/Sagittarius_A*","No information is provided on black holes.","None / Wikipedia","https://en.wikipedia.org/wiki/Sagittarius_A*","No information is provided on black holes.","None / Wikipedia","https://en.wikipedia.org/wiki/Sagittarius_A*",13);
INSERT INTO Star VALUES(0,"RX J1856.5-3754",0,0,17,434000,"RX J1856.5-3754 is the closest neutron star to Earth discovered so far. It is believed it formed about one year ago due to a supernova explosion of its companion star.","Wikipedia","https://en.wikipedia.org/wiki/RX_J1856.5%E2%88%923754","By combining Chandra X-ray Observatory and Hubble Space Telescope data, it is believed this star radiates like a solid object with a temperature of 434000 Celsius.","Wikipedia","https://en.wikipedia.org/wiki/RX_J1856.5%E2%88%923754","No information is provided on neutron stars.","None / Wikipedia","https://en.wikipedia.org/wiki/RX_J1856.5%E2%88%923754",14);

-- INSERT INTO Planet VALUES(0,0,"",0,0,0,0,"","","","","","","","","",0);
INSERT INTO Planet VALUES(0,1,"Mercury",1,176,87.97,2440,430,"Mercury is the smallest planet in the Sol System, and the closest to its host star. It is tidally locked with Sol in a 3:2 spin-orbit resonance","Wikipedia","https://en.wikipedia.org/wiki/Mercury_(planet)","Mercury appears to have a solid silicate crust and mantle overlying a solid, iron sulfide outer core layer, a deeper liquid core layer, and a solid inner core. Mercury's core occupies about 55% of its volume.","Wikipedia","https://en.wikipedia.org/wiki/Mercury_(planet)","Mercury's surface is similar in appearance to that of the Moon, showing extensive mare-like plains and heavy cratering, indicating that it has been geologically inactive for billions of years.","Wikipedia","https://en.wikipedia.org/wiki/Mercury_(planet)",1);
INSERT INTO Planet VALUES(0,1,"Venus",2,243,117,6052,464,"Venus is the second planet from Sol, and is one of the four terrestrial planets in the Sol System, having the densest atmosphere out of the four.","Wikipedia","https://en.wikipedia.org/wiki/Venus","Little direct information is available about the internal structure of Venus, the similarity to Earth suggest they share the same internal structure: a core, mantle and crust.","Wikipedia","https://en.wikipedia.org/wiki/Venus","About 80% of the Venusian surface is covered by volcanic plains, two highland continents make up the rest of its surface, one in the northen hemisphere and the other just south of the equator.","Wikipedia","https://en.wikipedia.org/wiki/Venus",1);
INSERT INTO Planet VALUES(0,1,"Earth",3,0.99,365.26,6371,16,"Earth is the third planet from Sol, and is the only astronomical object known to harbour and support life. About 29.2% of Earth's surface is land with the remaining 70.8% being covered with water.","Wikipedia","https://en.wikipedia.org/wiki/Earth","Earth's interior, like that of the other terrestrial planets, is divided into layers by their chemical or physical (rheological) properties. The outer layer is a chemically distinct silicate solid crust, which is underlain by a highly viscous solid mantle.","Wikipedia","https://en.wikipedia.org/wiki/Earth","70.8% of Earth's surface is below the sea level and covered by the ocean water. The remaining 29.2% not covered by water has terrain that varies greatly from place to place.","Wikipedia","https://en.wikipedia.org/wiki/Earth",1);
INSERT INTO Planet VALUES(0,1,"Mars",4,1.02,686,3389.5,-63,"Mars is the fourth planet from Sol, and the second-smallest planet in the Sol System, Mars is a terrestrial planet with a thin atmosphere, and is the best candidate for terraforming.","Wikipedia","https://en.wikipedia.org/wiki/Mars","Like Earth, Mars has differentiated into a dense metallic core overlaid by less dense materials. The average thickness of the planet's crust is about 50km. Earth's crust averages 40km.","Wikipedia","https://en.wikipedia.org/wiki/Mars","Mars's surface consists of minerals containing siliocn and oxygen, metals, and rocks. The Martian surface is primarily composed of tholeiitic basalt. It has no evidence of a structured global magnetic field.","Wikipedia","https://en.wikipedia.org/wiki/Mars",1);
INSERT INTO Planet VALUES(0,1,"Jupiter",5,0.41,4332.59,69911,-108,"Jupiter is the fifth and largest planet in the Sol System, It's a gas giant with a mass more than two and a half times of all other planets in the Sol System combined, but just less than one-thousandth the mass of Sol","Wikipedia","https://en.wikipedia.org/wiki/Mars","Jupiter's internal structure consist of a dense core (between 30-50% of the planet's radius), a surrounding layer of liquid metallic hydrogen (with some helium) extending outward to about 80% of the radius of the planet.","Wikipedia","https://en.wikipedia.org/wiki/Jupiter","Jupiter lacks a solid surface, instead being covered with clouds composed of ammonia crystals and ammonium hydrosulfide, the cloud layer is about 50km deep, and consists of two decks of clouds: a thick lower deck and a thin clearer region.","Wikipedia","https://en.wikipedia.org/wiki/Jupiter",1);
INSERT INTO Planet VALUES(0,1,"Saturn",6,0.45,10759,58232,-139,"Saturn is the sixth planet from Sol, and the second-largest in the Sol System, It's a gas giant with an average radius of about nine and a half times that of Earth, and It's 95 times as massive.","Wikipedia","https://en.wikipedia.org/wiki/Saturn","Most of Saturn's mass is not in the gas phase. The temperature, pressure and density inside Saturn all rise steadily toward the core, which causes hydrogen to be a metal in the deeper layers, Saturn's interior is similar to that of Jupiter.","Wikipedia","https://en.wikipedia.org/wiki/Saturn"," In the upper cloud layers, with the temperature in the range 100–160 K and pressures extending between 0.5–2 bar, the clouds consist of ammonia ice. Water ice clouds begin at a level where the pressure is about 2.5 bar and extend down to 9.5 bar.","Wikipedia","https://en.wikipedia.org/wiki/Saturn",1);
INSERT INTO Planet VALUES(0,1,"Uranus",7,0.72,30688,25362,-197,"Uranus is the seventh planet from Sol, It's similar in composition to Neptune, and they are both considered ice giants, It's atmosphere is similar in composition to the gas giants, but it contains more ices such as water, ammonia or methane.","Wikipedia","https://en.wikipedia.org/wiki/Uranus","Uranus's structure consists of three layers, a rocky (silicate/iron-nickel) core in the centre, an icy mantle in the middle and an outer gaseous hydrogen/helium envelope.","Wikipedia","https://en.wikipedia.org/wiki/Uranus","Although there is no well-defined solid surface within Uranus's interior, the outermost part of Uranus's gaseous envelope that is accessible to remote sensing is called its atmosphere.","Wikipedia","https://en.wikipedia.org/wiki/Uranus",1);
INSERT INTO Planet VALUES(0,1,"Neptune",8,0.67,60195,24622,-201,"Neptune is the eight and the farthest-known planet from Sol, and the only planet not visible to the unaided eye. In contrast to the hazy, relatively featureless atmosphere of Uranus, Neptune's atmosphere has active and visible weather patterns.","Wikipedia","https://en.wikipedia.org/wiki/Neptune","Neptune's internal structure resembles that of Uranus. Its atmosphere forms about 5 to 10% of its mass and extends perhaps 10 to 20% of the way towards the core.","Wikipedia","https://en.wikipedia.org/wiki/Neptune","Neptune's atmosphere is subdivided into two main regions: the lower troposphere, where temperature decreases with altitude, and the stratosphere, where temperature increases with altitude.","Wikipedia","https://en.wikipedia.org/wiki/Neptune",1);
INSERT INTO Planet VALUES(0,2,"Kepler-22b",1,0,289.86,15290,22,"Kepler-22b is an exoplanet orbiting within the habitable zone of Kepler-22, Its radius is roughly twice that of Earth, an Earth-like composition for the planet has been ruled out.","Wikipedia","https://en.wikipedia.org/wiki/Kepler-22b","There is no information available about the internal structure of the planet given it's distance from Sol.","N/A","#","It is believed that Kepler-22b is a water world, it is likely to have a more volatile-rich composition with a liquid or gaseous outher shell, similar to Kepler-11f, the smallest known gas planet.","Wikipedia","https://en.wikipedia.org/wiki/Kepler-22b",1);
INSERT INTO Planet VALUES(0,3,"Kepler-7b",1,0,4.88,103328,1270,"Kepler-7b is one of the first five exoplanets to be confirmed by NASA's Kepler spacecraft. It is a hot Jupiter with about half the mass of Jupiter, but nearly 1.5 times its size.","Wikipedia","https://en.wikipedia.org/wiki/Kepler-7b","There is no information available about the internal structure of the planet given it's distance from Sol.","Wikipedia","https://en.wikipedia.org/wiki/Kepler-7b","Kepler-7b is a hot Jupiter that, due to its proximity to its host star, is twelve times hotter than Jupiter. It is also the first planet outside the Sol System to be cloud mapped.","Wikipedia","https://en.wikipedia.org/wiki/Kepler-7b",1);
INSERT INTO Planet VALUES(0,4,"Kepler-452b",1,0,384.84,9556,-8,"Kepler-452b is a super-Earth exoplanet orbiting within the habitable zone of its host star, Kepler-452. It is unknown if it is entirely habitable.","Wikipedia","https://en.wikipedia.org/wiki/Kepler-452b","There is no information available about the internal structure of the planet given it's distance from Sol, but it is believed that Kepler-452b is a rocky planet.","Wikipedia","https://en.wikipedia.org/wiki/Kepler-452b","It is believed that Kepler-452b may be a terrestrial planet, with many active volcanoes due to its high mass and density.","Wikipedia","https://en.wikipedia.org/wiki/Kepler-452b",1);
INSERT INTO Planet VALUES(0,5,"Gliese 504 b",1,0,56575,67114,271,"Gliese 504 b is a Jovian planet or a brown dwarf orbiting its host star GJ 504. Visually, it would have a magenta colour.","Wikipedia","https://en.wikipedia.org/wiki/Gliese_504_b","There is no information available about the internal structure of the planet given it's distance from Sol.","Wikipedia","https://en.wikipedia.org/wiki/Gliese_504_b","It is unknown whether Gliese 504 b is a Jovian planet or a brown dwarf. It was originally projected to be late T or early Y spectral type. with a later study putting it in T8.","Wikipedia","https://en.wikipedia.org/wiki/Gliese_504_b",1);
INSERT INTO Planet VALUES(0,6,"Hoth",1,0,3500,0,-220,"Hoth, known as OGLE-2005-BLG-390Lb, is one of the most distant known super-Earth exoplanets. The planet does not appear to meet conditions presumed necessary to support life.","Wikipedia","https://en.wikipedia.org/wiki/OGLE-2005-BLG-390Lb","It is suspected that Hoth has a rocky core, similar to Earth, with a thin atmosphere.","Wikipedia","https://en.wikipedia.org/wiki/OGLE-2005-BLG-390Lb","There is no information available about the surface geology of the planet given it's distance from Sol.","Wikipedia","https://en.wikipedia.org/wiki/OGLE-2005-BLG-390Lb",1);
INSERT INTO Planet VALUES(0,7,"HAT-P-11b",1,0,4.88,27777,604,"HAT-P-11b is an exoplanet orbiting the star HAT-P-11. It is a hot Jupiter slightly bigger than Neptune.","Wikipedia","https://en.wikipedia.org/wiki/HAT-P-11b","There is no information available about the internal structure of the planet given it's distance from Sol.","Wikipedia","https://en.wikipedia.org/wiki/HAT-P-11b","HAT-P-11b is the first Neptune-sized exoplanet known to have a relatively cloud-free atmosphere, and the first time molecules have been found on a relatively small exoplanet.","Wikipedia","https://en.wikipedia.org/wiki/HAT-P-11b",1);
INSERT INTO Planet VALUES(0,8,"HD 189733 b",1,0,2.21,81236,1327,"HD 189733 b is a Jupiter-sized exoplanet. It orbits its host star every 2.2 days, making it a hot Jupiter with poor prospects for extraterrestrial life.","Wikipedia","https://en.wikipedia.org/wiki/HD_189733_b","Hubble Space Telescope confirmed the presence of water vapor, neutral oxygen, organic compound methane and carbon monoxide on the planet's atmosphere.","Wikipedia","https://en.wikipedia.org/wiki/HD_189733_b","The weather on this exoplanet is deadly, winds blow with speeds up to 8700km/h. There is also evidence of horizontal molten glass rain.","Wikipedia","https://en.wikipedia.org/wiki/HD_189733_b",1);
INSERT INTO Planet VALUES(0,9,"YZ Ceti b",1,0,2,5925,0,"YZ Ceti b is a terrestrial exoplanet that orbits a M-type main sequence star.","Nasa","https://exoplanets.nasa.gov/exoplanet-catalog/7181/yz-ceti-b","There is no information available about the internal structure of the planet given it's distance from Sol.","Nasa","https://exoplanets.nasa.gov/exoplanet-catalog/7181/yz-ceti-b","There is no information available about the surface geology of the planet given it's distance from Sol.","Nasa","https://exoplanets.nasa.gov/exoplanet-catalog/7181/yz-ceti-b",0);
INSERT INTO Planet VALUES(0,9,"YZ Ceti c",2,0,3.1,6343,0,"YZ Ceti c is a terrestrial exoplanet that orbits a M-type main sequence star.","Nasa","https://exoplanets.nasa.gov/exoplanet-catalog/7182/yz-ceti-c/","There is no information available about the internal structure of the planet given it's distance from Sol.","Nasa","https://exoplanets.nasa.gov/exoplanet-catalog/7182/yz-ceti-c/","There is no information available about the surface geology of the planet given it's distance from Sol.","Nasa","https://exoplanets.nasa.gov/exoplanet-catalog/7182/yz-ceti-c/",0);
INSERT INTO Planet VALUES(0,9,"YZ Ceti d",3,0,4.7,6689,0,"YZ Ceti d is a super Earth exoplanet that orbits a M-type main sequence star.","Nasa","https://exoplanets.nasa.gov/exoplanet-catalog/7182/yz-ceti-c/","There is no information available about the internal structure of the planet given it's distance from Sol.","Nasa","https://exoplanets.nasa.gov/exoplanet-catalog/7182/yz-ceti-c/","There is no information available about the surface geology of the planet given it's distance from Sol.","Nasa","https://exoplanets.nasa.gov/exoplanet-catalog/7182/yz-ceti-c/",1);
INSERT INTO Planet VALUES(0,10,"Proxima Centauri b",1,0,11.18,8282,-39,"Proxima Centauri b is an exoplanet orbiting the habitable zone of Proxima Centauri, the closest star to Sol, making it the closest known exoplanet with Proxima Centauri c.","Wikipedia","https://en.wikipedia.org/wiki/Proxima_Centauri_b","It is believed to be an Earth-like planet, but not much information is known about its possible internal structure.","Wikipedia","https://en.wikipedia.org/wiki/Proxima_Centauri_b","There is no information available about the surface geology of the planet given it's distance from Sol.","Wikipedia","https://en.wikipedia.org/wiki/Proxima_Centauri_b",1);
INSERT INTO Planet VALUES(0,10,"Proxima Centauri c",2,0,1928,0,-234,"It is unknown whether Proxima Centauri c is a super-Earth or mini-Neptune. Its radius is also unknown. It is about 7 times as massive as Earth.","Wikipedia","https://en.wikipedia.org/wiki/Proxima_Centauri_c","There is no information available about the internal structure of the planet given it's distance from Sol.","Wikipedia","https://en.wikipedia.org/wiki/Proxima_Centauri_c","There is no information available about the surface geology of the planet given it's distance from Sol.","Wikipedia","https://en.wikipedia.org/wiki/Proxima_Centauri_c",1);

-- INSERT INTO Satellite VALUES(0,0,"",0,0,0,0,0,"","","","","","","","","",0);
INSERT INTO Satellite VALUES(0,3,"Moon",1,27.32,27.32,1737.4,-23,"The Moon is Earth's only natural satellite, it is the 5th largest satellite in the Sol System and is larger than any known dwarf planet. It is tidally locked to Earth","Wikipedia","https://en.wikipedia.org/wiki/Moon","The Moon has a geochemically distinct crust, mantle and core. The Moon has a solid iron-rich core, which makes up around 20$ of the radius of the Moon. It is the second-densest satellite in the Sol Sytem, after IO","Wikipedia","https://en.wikipedia.org/wiki/Moon","The Moon's most extensive topographic feature is the giant far-side South Pole–Aitken basin, some 2,240 km in diameter, the largest crater on the Moon and the second-largest confirmed impact crater in the Solar System.","Wikipedia","https://en.wikipedia.org/wiki/Moon",1);
INSERT INTO Satellite VALUES(0,5,"Io",1,1.76,1.76,1821.6,-163,"Io is the innermost satellite of the planet Jupiter. It is slightly larger than Earth's moon and is the fourth largest satellite in the Sol System.","Wikipedia","https://en.wikipedia.org/wiki/Io_(moon)","Io is primarily composed of silicate rock and iron. It is believed that its interior is differentiated between a silicate-rich crust and mantle and iron-rich core.","Wikipedia","https://en.wikipedia.org/wiki/Io_(moon)","Io is the most volcanically active world in the Sol System, with hundreds of volcanic centres and extensive lava flows. Its surface is mostly composed of sulfur.","Wikipedia","https://en.wikipedia.org/wiki/Io_(moon)",1);
INSERT INTO Satellite VALUES(0,5,"Europa",2,3.55,3.55,1560.8,-171,"Europa is the smallest of the four Galilean moons orbiting Jupiter, and the sixth-largest moon in the Sol System.","Wikipedia","https://en.wikipedia.org/wiki/Europa_(moon)","Europa is primarily made of silicate rock with a water-ice crust, it also probably contain an iron-nickel core. It has a very thin oxygen atmosphere.","Wikipedia","https://en.wikipedia.org/wiki/Europa_(moon)","Europa has the smoothest surface of any known solid object in the Sol system. It is believed that a water ocean is precent beneath the surface.","Wikipedia","https://en.wikipedia.org/wiki/Europa_(moon)",1);
INSERT INTO Satellite VALUES(0,5,"Ganymede",3,7.15,7.15,2634.1,-163,"Ganymede is the largest and most massive satellite in the Sol system. It is also the largest object without a substantial atmosphere, It is 26% larger than Mercury.","Wikipedia","https://en.wikipedia.org/wiki/Ganymede_(moon)","Ganymede is composed of equal amounts of silicate rock and water. Its internal ocean may contain more water than all of Earth's oceans combined.","Wikipedia","https://en.wikipedia.org/wiki/Ganymede_(moon)","The surface of Ganymede is composed of two main terrain types. Dark regions saturated with impact craters and Light regions covered by grooves and ridges.","Wikipedia","https://en.wikipedia.org/wiki/Ganymede_(moon)",1);
INSERT INTO Satellite VALUES(0,5,"Callisto",4,16.69,16.69,2410.3,-139,"Callisto is the second-largest moon of Jupiter after Ganymede. It has 99% of the diameter of the planet Mercury while only being a third of its mass.","Wikipedia","https://en.wikipedia.org/wiki/Callisto_(moon)","Callisto is composed of approximately equal amounts of rock and ices. Investigation by Galileo revealed that it may contain a subsurface ocean of liquid water.","Wikipedia","https://en.wikipedia.org/wiki/Callisto_(moon)","","Wikipedia","https://en.wikipedia.org/wiki/Callisto_(moon)",1);