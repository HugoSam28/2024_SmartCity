
SET TIME ZONE 'Europe/Brussels';

DROP TABLE IF EXISTS Trip CASCADE;
DROP TABLE IF EXISTS Vehicle CASCADE;
DROP TABLE IF EXISTS With_licence CASCADE;
DROP TABLE IF EXISTS Person CASCADE;
DROP TABLE IF EXISTS Subscription CASCADE;
DROP TABLE IF EXISTS Car_key CASCADE;
DROP TABLE IF EXISTS Sponsoring CASCADE;
DROP TABLE IF EXISTS Person_subscription;

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
    is_available  BOOLEAN     NOT NULL DEFAULT FALSE,
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
    payment_recurrence VARCHAR(10) NOT NULL,
    vehicle_type       VARCHAR(15) NOT NULL
);

CREATE TABLE Person
(
    id                         INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name                 VARCHAR(50)  NOT NULL,
    last_name                  VARCHAR(50)  NOT NULL,
    email                      VARCHAR(100) NOT NULL UNIQUE CHECK ( email ~
                                                                    '^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' ),
    phone_number               VARCHAR(20)  NOT NULL UNIQUE CHECK ( phone_number ~ '^\+[1-9][0-9]{7,14}$' ),
    password                   VARCHAR(250) NOT NULL,
    role                       VARCHAR(10)  NOT NULL DEFAULT ('ROLE_USER'),
    birthday                   DATE         NOT NULL CHECK ( birthday <= CURRENT_DATE - INTERVAL '16 years' ),
    balance                    DECIMAL DEFAULT 0 NOT NULL,
    has_car_licence            BOOLEAN DEFAULT FALSE NOT NULL,
    has_motorbike_licence      BOOLEAN DEFAULT FALSE NOT NULL,
    referral_code              VARCHAR(8) UNIQUE NOT NULL DEFAULT (
        UPPER(
                SUBSTRING(MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT) FROM 1 FOR 8)
        ))
);

CREATE TABLE Person_subscription
(
    id                         INT GENERATED ALWAYS AS IDENTITY,
    person_id                  INT REFERENCES Person (id) ON DELETE CASCADE,
    subscription_id            INT REFERENCES subscription (id) ON DELETE CASCADE,
    starting_subscription_date DATE DEFAULT (NOW())
);

CREATE TABLE Trip
(
    id                INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    person_ID         INT       NOT NULL REFERENCES Person (id) ON DELETE SET NULL,
    vehicle_ID        INT       NOT NULL REFERENCES Vehicle (id) ON DELETE SET NULL,
    starting_date     TIMESTAMP NOT NULL,
    ending_date       TIMESTAMP,
    distance          DECIMAL,
    cost              DECIMAL,
    starting_location POINT     NOT NULL,
    ending_location   POINT
);
-- !!!! attention, par rapport à google maps, il faut inverser latitude et longitude,
-- comme ici ce sont les coordonnées d'un point, c'est d'abord longitude puis lattitude,
-- hors google maps (& co) donnent lattitude puis longitude

CREATE TABLE Sponsoring
(
    referred INT PRIMARY KEY REFERENCES Person (id) ON DELETE CASCADE,
    sponsor  INT NOT NULL REFERENCES Person (id) ON DELETE CASCADE CHECK ( sponsor > referred )
);

CREATE OR REPLACE FUNCTION sponsor_limit()
    RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM sponsoring WHERE sponsor = NEW.sponsor) >= 10 THEN
        RAISE EXCEPTION 'Un sponsor ne peut parrainer que 10 personnes maximum.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER sponsoring_trigger
    BEFORE INSERT OR UPDATE ON sponsoring
    FOR EACH ROW
EXECUTE FUNCTION sponsor_limit();


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


INSERT INTO Subscription (label, price, payment_recurrence, vehicle_type, discount)
VALUES ('Gold',
        20,
        'monthly',
        'Voiture',
        0.15);

INSERT INTO Person (first_name, last_name, email, phone_number, password, role, birthday)
VALUES ('root',
        'root',
        'root@mail.be',
        '+32123456789',
        '$argon2id$v=19$m=65536,t=3,p=4$WPgpXYFThjZ6IxA5LZRJqA$Tq3kF0FwFkGHmrfA3LHeFSwgtiXvDq5b9TECM7VfvhA',
        'ROLE_ADMIN',
        '2004-05-28');
INSERT INTO Person (first_name, last_name, email, phone_number, password, role, birthday)
VALUES ('user',
        'user',
        'user@mail.be',
        '+35742748284',
        '$argon2id$v=19$m=65536,t=3,p=4$WPgpXYFThjZ6IxA5LZRJqA$Tq3kF0FwFkGHmrfA3LHeFSwgtiXvDq5b9TECM7VfvhA',
        'ROLE_USER',
        '2004-04-12');

INSERT INTO Person_subscription(person_id, subscription_id)
VALUES (2,
        1
       );

INSERT INTO Sponsoring (sponsor, referred)
VALUES (2, 1);