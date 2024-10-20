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
DROP TABLE IF EXISTS Car_key;

DROP SEQUENCE IF EXISTS Vehicle_id_seq;
CREATE SEQUENCE Vehicle_id_seq
    AS int
    START WITH 1 INCREMENT BY 1;

CREATE TABLE Vehicle
(
    id            int primary key default nextval('Vehicle_id_seq'),
    location      point,
    battery_level decimal check ( battery_level <= 100 AND battery_level >= 0),
    type          varchar(15),
    brand         varchar(30),
    price         decimal check ( price >= 0 ),
    isAvailable   boolean,
    fee           decimal check ( fee >= 0 )
);

CREATE TABLE Car_key
(
    id int primary key generated always as identity
);

Create table With_licence
(
    id             int primary key default nextval('Vehicle_id_seq'),
    model          varchar(20),
    chassis_number varchar(20) unique,
    key_1          int references Car_key (id),
    key_2          int references Car_key (id)

) inherits (Vehicle);

create table Subscription
(
    id                 int primary key generated always as identity,
    label              varchar(20),
    price              decimal check ( price > 0 ),
    discount           decimal check ( discount <= 1 ),
    payment_recurrence varchar(10)
);

create table Client
(
    id                         int primary key generated always as identity,
    firstname                   varchar(50),
    surname                    varchar(50),
    email                      varchar(100) unique check ( email ~
                                            '^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' ),
    number                     varchar(20) unique check ( number ~ '^\+[1-9][0-9]{7,14}$'),
    birthday                   date check ( birthday <= current_date - INTERVAL '16 years'),
    subscription               int references subscription (id),
    starting_subscription_date date
);

create table Trip
(
    id                int primary key generated always as identity,
    clientID          int references Client (id),
    vehicleID         int references Vehicle (id),
    starting_date     timestamp,
    ending_date       timestamp,
    distance          decimal,
    starting_location point,
    ending_location   point
);
-- !!!! attention, par rapport à google maps, il faut inverser latitude et longitude,
-- comme ici ce sont les coordonnées d'un point, c'est d'abord longitude puis lattitude,
-- hors google maps (& co) donnent lattitude puis longitude

INSERT INTO Vehicle (location, battery_level, type, price, isAvailable, fee)
VALUES (point(4.91336, 50.41501),
        70.4,
        'Trotinette',
        0.5,
        true,
        1);
INSERT INTO Vehicle (location, battery_level, type, price, isAvailable, fee)
VALUES (point(4.91536, 50.41501),
        60.4,
        'Trotinette',
        0.5,
        false,
        1);
INSERT INTO Vehicle (location, battery_level, type, price, isAvailable, fee)
VALUES (point(4.91326, 50.41501),
        10.4,
        'Velo',
        0.3,
        true,
        1);
INSERT INTO Vehicle (location, battery_level, type, price, isAvailable, fee)
VALUES (point(4.91320, 50.41501),
        100,
        'Velo',
        0.4,
        false,
        1);
INSERT INTO Car_key default
values;
INSERT INTO Car_key default
values;
INSERT INTO Car_key default
values;

Insert INTO With_licence (location, battery_level, type, brand, price, isAvailable, fee, model, chassis_number, key_1,
                          key_2)
VALUES (point(4.91138, 50.41592),
        87,
        'Voiture',
        'Volkswagen',
        0.8,
        true,
        50,
        'Tiguan-2018',
        'FTAU7258TIGUS82JS822',
        1,
        2);
Insert INTO With_licence (location, battery_level, type, brand, price, isAvailable, fee, model, chassis_number, key_1)
VALUES (point(4.90997, 50.41512),
        100,
        'Voiture',
        'Volkswagen',
        0.8,
        FALSE,
        64,
        'Tiguan-2024',
        'BE53782939727293H2',
        3);
insert into Subscription (label, price, payment_recurrence)
VALUES ('Gold',
        20,
        'monthly');
insert into Client (firstname, surname, email, number, birthday)
VALUES ('Hugo',
        'Samray',
        'etu51688@henallux.be',
        '+32471740915',
        '2004-05-28');
insert into Client (firstname, surname, email, number, birthday, subscription, starting_subscription_date)
VALUES ('Thoams',
        'Lambert',
        'thomas.lambert@gmail.com',
        '+3343434343',
        '2006-08-09',
        1,
        current_date);