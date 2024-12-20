
SET TIME ZONE 'Europe/Brussels';

DROP TABLE IF EXISTS Trip CASCADE;
DROP TABLE IF EXISTS Vehicle CASCADE;
DROP TABLE IF EXISTS Person CASCADE;
DROP TABLE IF EXISTS Subscription CASCADE;
DROP TABLE IF EXISTS Car_key CASCADE;
DROP TABLE IF EXISTS Sponsoring CASCADE;
DROP TABLE IF EXISTS Person_subscription;

CREATE TABLE Vehicle
(
    id             INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY ,
    location       POINT       NOT NULL,
    battery_level  DECIMAL     NOT NULL CHECK ( battery_level <= 100 AND battery_level >= 0 ),
    type           VARCHAR(15) NOT NULL,
    price          DECIMAL     NOT NULL CHECK ( price >= 0 ),
    is_available   BOOLEAN     NOT NULL DEFAULT FALSE,
    fees           DECIMAL     NOT NULL CHECK ( fees >= 0 ),
    brand          VARCHAR(30) DEFAULT(NULL),
    model          VARCHAR(20) DEFAULT(NULL),
    chassis_number VARCHAR(20) DEFAULT(NULL)
);

CREATE UNIQUE INDEX unique_trigger_value_not_null
    ON Vehicle (chassis_number)
    WHERE chassis_number IS NOT NULL;

CREATE TABLE Car_key
(
    id     INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    car_id INT REFERENCES Vehicle (id) ON DELETE SET NULL
);
CREATE OR REPLACE FUNCTION check_vehicle_type()
    RETURNS TRIGGER AS $$
BEGIN
    -- Si vehicle_id est NULL, aucune vérification n'est nécessaire
    IF NEW.car_id IS NOT NULL THEN
        -- Vérifier le type du véhicule
        PERFORM 1 FROM vehicle
        WHERE id = NEW.car_id
          AND type IN ('Voiture', 'Scooter');

        -- Si aucun résultat n'est trouvé, lever une exception
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Le type de véhicule doit être "Voiture" ou "Scooter".';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER car_key_check
    BEFORE INSERT OR UPDATE ON car_key
    FOR EACH ROW
EXECUTE FUNCTION check_vehicle_type();


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
    person_id                  INT REFERENCES Person (id) ON DELETE SET NULL,
    subscription_id            INT REFERENCES subscription (id) ON DELETE SET NULL,
    starting_subscription_date DATE DEFAULT (NOW())
);

CREATE TABLE Trip
(
    id                INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    person_ID         INT REFERENCES Person (id) ON DELETE SET NULL,
    vehicle_ID        INT REFERENCES Vehicle (id) ON DELETE SET NULL,
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
    sponsor  INT REFERENCES Person (id) ON DELETE SET NULL CHECK ( sponsor < referred )
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
        'Trottinette',
        0.5,
        TRUE,
        1);

INSERT INTO Vehicle (location, battery_level, type, price, is_available, fees)
VALUES (point(4.91536, 50.41501),
        60.4,
        'Trottinette',
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

INSERT INTO Vehicle (location, battery_level, type, brand, price, is_available, fees, model, chassis_number)
VALUES (point(4.91138, 50.41592),
        87,
        'Voiture',
        'Volkswagen',
        0.8,
        TRUE,
        50,
        'Tiguan-2018',
        'FTAU7258TIGUS82JS822');

INSERT INTO Vehicle (location, battery_level, type, brand, price, is_available, fees, model, chassis_number)
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
VALUES (5);
INSERT INTO Car_key (car_id)
VALUES (6);
INSERT INTO Car_key (car_id)
VALUES (6);


INSERT INTO Subscription (label, price, payment_recurrence, vehicle_type, discount)
VALUES ('Gold',
        20,
        'monthly',
        'Voiture',
        0.15);

INSERT INTO Subscription (label, price, payment_recurrence, vehicle_type, discount)
VALUES ('Silver',
        15,
        'monthly',
        'Velo',
        0.10);

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
INSERT INTO Person (first_name, last_name, email, phone_number, password, role, birthday)
VALUES ('user2',
        'user2',
        'user2@mail.be',
        '+3572748284',
        '$argon2id$v=19$m=65536,t=3,p=4$WPgpXYFThjZ6IxA5LZRJqA$Tq3kF0FwFkGHmrfA3LHeFSwgtiXvDq5b9TECM7VfvhA',
        'ROLE_USER',
        '2004-04-12');

INSERT INTO Person_subscription(person_id, subscription_id)
VALUES (2,
        2
       );

INSERT INTO Person_subscription(person_id, subscription_id)
VALUES (1,
        2
       );

INSERT INTO Person_subscription(person_id, subscription_id)
VALUES (3,
        1
       );

INSERT INTO Sponsoring (sponsor, referred)
VALUES (1, 2);

INSERT INTO Sponsoring (sponsor, referred)
VALUES (2, 3);

INSERT INTO Trip (person_ID, vehicle_ID, starting_date, ending_date, distance, cost, starting_location, ending_location)
VALUES (1,
        2,
        '2023-12-17 14:14:00',
        '2023-12-17 14:24:00',
        23.45,
        0.45,
        POINT(4.90997, 50.41512),
        POINT(4.90997, 51.41512));

INSERT INTO Trip (person_ID, vehicle_ID, starting_date, ending_date, distance, cost, starting_location, ending_location)
VALUES (2,
        6,
        '2023-10-17 14:14:00',
        '2023-10-17 14:24:00',
        23.40,
        500.45,
        POINT(4.90997, 50.41512),
        POINT(5.90997, 51.41512));
