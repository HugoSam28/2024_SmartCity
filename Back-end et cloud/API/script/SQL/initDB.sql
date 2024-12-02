DROP TABLE IF EXISTS Trip CASCADE;
DROP TABLE IF EXISTS Vehicle CASCADE;
DROP TABLE IF EXISTS With_licence CASCADE;
DROP TABLE IF EXISTS Client CASCADE;
DROP TABLE IF EXISTS Subscription CASCADE;
DROP TABLE IF EXISTS Car_key CASCADE;
DROP TABLE IF EXISTS Sponsoring CASCADE;

DROP SEQUENCE IF EXISTS Vehicle_id_seq;
CREATE SEQUENCE Vehicle_id_seq
    AS INT
    START WITH 1 INCREMENT BY 2;

DROP SEQUENCE IF EXISTS With_licence_id_seq;
CREATE SEQUENCE With_licence_id_seq
    AS INT
    START WITH 2 INCREMENT BY 2;

CREATE TABLE Vehicle
(
    id            INT PRIMARY KEY DEFAULT NEXTVAL('Vehicle_id_seq'),
    location      POINT       NOT NULL,
    battery_level DECIMAL     NOT NULL CHECK ( battery_level <= 100 AND battery_level >= 0 ),
    type          VARCHAR(15) NOT NULL,
    price         DECIMAL     NOT NULL CHECK ( price >= 0 ),
    is_available  BOOLEAN     NOT NULL,
    fees          DECIMAL     NOT NULL CHECK ( fees >= 0 )
);

CREATE TABLE With_licence
(
    id             INT PRIMARY KEY DEFAULT NEXTVAL('With_licence_id_seq'),
    brand          VARCHAR(30) NOT NULL,
    model          VARCHAR(20) NOT NULL,
    chassis_number VARCHAR(20) NOT NULL UNIQUE
) inherits (Vehicle);

CREATE TABLE Car_key
(
    id     INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    car_id INT REFERENCES With_licence (id) ON DELETE SET NULL
);

CREATE TABLE Subscription
(
    id                 INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    label              VARCHAR(20) NOT NULL,
    price              DECIMAL     NOT NULL CHECK ( price > 0 ),
    discount           DECIMAL     NOT NULL CHECK ( discount <= 1 ),
    payment_recurrence VARCHAR(10) NOT NULL
);

CREATE TABLE Client
(
    id                         INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstname                  VARCHAR(50)  NOT NULL,
    surname                    VARCHAR(50)  NOT NULL,
    email                      VARCHAR(100) NOT NULL UNIQUE CHECK ( email ~
                                                                    '^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' ),
    number                     VARCHAR(20)  NOT NULL UNIQUE CHECK ( number ~ '^\+[1-9][0-9]{7,14}$' ),
    password                   VARCHAR(250) NOT NULL,
    birthday                   DATE         NOT NULL CHECK ( birthday <= CURRENT_DATE - INTERVAL '16 years' ),
    subscription               INT REFERENCES Subscription (id) ON DELETE SET NULL,
    starting_subscription_date DATE,
    balance                    DECIMAL DEFAULT 0,
    has_car_licence            BOOLEAN DEFAULT FALSE,
    has_motorbike_licence      BOOLEAN DEFAULT FALSE
);
--gngn oui le password est en clair je sais ça sera modifié plus tard,
--faut que le lise la doc, à voir s'il y a un type particulier pour enregistrer, a voir en fonction du hashage j'imagine

--Ajouter une contrainte jsp comment pour qu'on ne puisse pas créer un trajet en voiture ou scooter
--avec un client qui n'a pas le permis adécquat

CREATE TABLE Trip
(
    id                INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    client_ID         INT       NOT NULL REFERENCES Client (id) ON DELETE SET NULL,
    vehicle_ID        INT       NOT NULL REFERENCES Vehicle (id) ON DELETE SET NULL,
    starting_date     TIMESTAMP NOT NULL,
    ending_date       TIMESTAMP NOT NULL,
    distance          DECIMAL   NOT NULL CHECK ( distance >= 0),
    starting_location POINT     NOT NULL,
    ending_location   POINT     NOT NULL
);
-- !!!! attention, par rapport à google maps, il faut inverser latitude et longitude,
-- comme ici ce sont les coordonnées d'un point, c'est d'abord longitude puis lattitude,
-- hors google maps (& co) donnent lattitude puis longitude

CREATE TABLE Sponsoring
(
    sponsor  INT NOT NULL REFERENCES Client (id) ON DELETE SET NULL,
    referred INT NOT NULL REFERENCES Client (id) ON DELETE SET NULL,
    PRIMARY KEY (sponsor, referred)
);

INSERT INTO Vehicle (location, battery_level, type, price, is_available, fees)
VALUES (point(4.91336, 50.41501),
        70.4,
        'Trotinette',
        0.5,
        TRUE,
        1);
INSERT INTO Vehicle (location, battery_level, type, price, is_available, fees)
VALUES (point(4.91536, 50.41501),
        60.4,
        'Trotinette',
        0.5,
        FALSE,
        1);
INSERT INTO Vehicle (location, battery_level, type, price, is_available, fees)
VALUES (point(4.91326, 50.41501),
        10.4,
        'Velo',
        0.3,
        TRUE,
        1);
INSERT INTO Vehicle (location, battery_level, type, price, is_available, fees)
VALUES (point(4.91320, 50.41501),
        100,
        'Velo',
        0.4,
        FALSE,
        1);

INSERT INTO With_licence (location, battery_level, type, brand, price, is_available, fees, model, chassis_number)
VALUES (point(4.91138, 50.41592),
        87,
        'Voiture',
        'Volkswagen',
        0.8,
        TRUE,
        50,
        'Tiguan-2018',
        'FTAU7258TIGUS82JS822');
INSERT INTO With_licence (location, battery_level, type, brand, price, is_available, fees, model, chassis_number)
VALUES (point(4.90997, 50.41512),
        100,
        'Voiture',
        'Volkswagen',
        0.8,
        FALSE,
        64,
        'Tiguan-2024',
        'BE53782939727293H2');

INSERT INTO Car_key (car_id)
VALUES (2);
INSERT INTO Car_key (car_id)
VALUES (4);
INSERT INTO Car_key (car_id)
VALUES (4);


INSERT INTO Subscription (label, price, payment_recurrence, discount)
VALUES ('Gold',
        20,
        'monthly',
        0.15)
;

INSERT INTO Client (firstname, surname, email, number, password, birthday)
VALUES ('Hugo',
        'Samray',
        'etu51688@henallux.be',
        '+32471740915',
        'my strong password',
        '2004-05-28');
INSERT INTO Client (firstname, surname, email, number, password, birthday, subscription, starting_subscription_date)
VALUES ('Thoams',
        'Lambert',
        'thomas.lambert@gmail.com',
        '+3343434343',
        'Hugo est incroyable vrm',
        '2006-08-09',
        1,
        CURRENT_DATE);

INSERT INTO Sponsoring (sponsor, referred)
VALUES (1, 2);
