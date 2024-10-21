/*
    !!!!!!!
        Ne contient pas l'instruction 'CREATE DATABASE'.
    !!!!!!!
*/

DROP TABLE IF EXISTS Trip CASCADE;
DROP TABLE IF EXISTS Vehicle CASCADE;
DROP TABLE IF EXISTS With_licence CASCADE;
DROP TABLE IF EXISTS Client CASCADE;
DROP TABLE IF EXISTS Subscription CASCADE;
DROP TABLE IF EXISTS Car_key CASCADE;
DROP TABLE IF EXISTS With_license_key;
DROP table IF EXISTS Sponsoring;

DROP SEQUENCE IF EXISTS Vehicle_id_seq;
CREATE SEQUENCE Vehicle_id_seq
    AS INT
    START WITH 1 INCREMENT BY 1;

CREATE TABLE Vehicle
(
    id            INT PRIMARY KEY DEFAULT NEXTVAL('Vehicle_id_seq'),
    location      POINT,
    battery_level DECIMAL CHECK ( battery_level <= 100 AND battery_level >= 0 ),
    type          VARCHAR(15),
    brand         VARCHAR(30),
    price         DECIMAL CHECK ( price >= 0 ),
    isAvailable   BOOLEAN,
    fee           DECIMAL CHECK ( fee >= 0 )
);

CREATE TABLE Car_key
(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY
);

CREATE TABLE With_licence
(
    id             INT PRIMARY KEY DEFAULT NEXTVAL('Vehicle_id_seq'),
    model          VARCHAR(20),
    chassis_number VARCHAR(20) UNIQUE
) inherits (Vehicle);

CREATE TABLE With_license_key
(
    with_license_id INT REFERENCES With_licence (id),
    key_id          INT REFERENCES Car_key (id) UNIQUE,
    PRIMARY KEY (with_license_id, key_id)
);

CREATE TABLE Subscription
(
    id                 INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    label              VARCHAR(20),
    price              DECIMAL CHECK ( price > 0 ),
    discount           DECIMAL CHECK ( discount <= 1 ),
    payment_recurrence VARCHAR(10)
);

CREATE TABLE Client
(
    id                         INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstname                   VARCHAR(50),
    surname                    VARCHAR(50),
    email                      VARCHAR(100) UNIQUE CHECK ( email ~
                                                           '^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' ),
    number                     VARCHAR(20) UNIQUE CHECK ( number ~ '^\+[1-9][0-9]{7,14}$' ),
    birthday                   DATE CHECK ( birthday <= CURRENT_DATE - INTERVAL '16 years' ),
    subscription               INT REFERENCES Subscription (id),
    starting_subscription_date DATE,
    balance                    DECIMAL,
    hasValidLicence            BOOLEAN
);

CREATE TABLE Trip
(
    id                INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    client_ID         INT REFERENCES Client (id),
    vehicle_ID        INT REFERENCES Vehicle (id),
    starting_date     TIMESTAMP,
    ending_date       TIMESTAMP,
    distance          DECIMAL CHECK ( distance >= 0),
    starting_location point,
    ending_location   point
);
-- !!!! attention, par rapport à google maps, il faut inverser latitude et longitude,
-- comme ici ce sont les coordonnées d'un point, c'est d'abord longitude puis lattitude,
-- hors google maps (& co) donnent lattitude puis longitude

CREATE TABLE Sponsoring
(
    sponsor  INT REFERENCES Client (id),
    referred INT REFERENCES Client (id),
    PRIMARY KEY (sponsor, referred)
);

INSERT INTO Vehicle (location, battery_level, type, price, isAvailable, fee)
VALUES (point(4.91336, 50.41501),
        70.4,
        'Trotinette',
        0.5,
        TRUE,
        1);
INSERT INTO Vehicle (location, battery_level, type, price, isAvailable, fee)
VALUES (point(4.91536, 50.41501),
        60.4,
        'Trotinette',
        0.5,
        FALSE,
        1);
INSERT INTO Vehicle (location, battery_level, type, price, isAvailable, fee)
VALUES (point(4.91326, 50.41501),
        10.4,
        'Velo',
        0.3,
        TRUE,
        1);
INSERT INTO Vehicle (location, battery_level, type, price, isAvailable, fee)
VALUES (point(4.91320, 50.41501),
        100,
        'Velo',
        0.4,
        FALSE,
        1);
INSERT INTO Car_key DEFAULT
VALUES;
INSERT INTO Car_key DEFAULT
VALUES;
INSERT INTO Car_key DEFAULT
VALUES;

INSERT INTO With_licence (location, battery_level, type, brand, price, isAvailable, fee, model, chassis_number)
VALUES (point(4.91138, 50.41592),
        87,
        'Voiture',
        'Volkswagen',
        0.8,
        TRUE,
        50,
        'Tiguan-2018',
        'FTAU7258TIGUS82JS822');
INSERT INTO With_licence (location, battery_level, type, brand, price, isAvailable, fee, model, chassis_number)
VALUES (point(4.90997, 50.41512),
        100,
        'Voiture',
        'Volkswagen',
        0.8,
        FALSE,
        64,
        'Tiguan-2024',
        'BE53782939727293H2');
INSERT INTO Subscription (label, price, payment_recurrence)
VALUES ('Gold',
        20,
        'monthly');
INSERT INTO Client (firstname, surname, email, number, birthday)
VALUES ('Hugo',
        'Samray',
        'etu51688@henallux.be',
        '+32471740915',
        '2004-05-28');
INSERT INTO Client (firstname, surname, email, number, birthday, subscription, starting_subscription_date)
VALUES ('Thoams',
        'Lambert',
        'thomas.lambert@gmail.com',
        '+3343434343',
        '2006-08-09',
        1,
        CURRENT_DATE);