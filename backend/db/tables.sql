CREATE DATABASE acres_tables;
DROP DATABASE acres_tables;

CREATE TABLE User (
    username VARCHAR(30) PRIMARY KEY,
    password VARCHAR(60),
    email VARCHAR(30),
    phone VARCHAR(30)
);

CREATE TABLE Land (
    ID SERIAL PRIMARY KEY,
    acres INT,
    owner VARCHAR(30) REFERENCES User(username),
    description VARCHAR(30),
    zip_code INT,
    suitable_for VARCHAR(30),
    starting_bid INT,
    image VARCHAR(10)
);

CREATE TABLE Contract (
    ID SERIAL PRIMARY KEY,
    land_id INT REFERENCES Land(ID),
    renter VARCHAR(30) REFERENCES User(username),
    start DATE,
    end DATE
);


CREATE TABLE Bid (
    ID SERIAL PRIMARY KEY,
    land_id INT REFERENCES Land(ID),
    top_bid INT,
    top_bidder VARCHAR(30)
);

CREATE TABLE Review (
    ID SERIAL PRIMARY KEY,
    land_id INT REFERENCES Land(ID),
    reviewer VARCHAR(30) REFERENCES User(username),
    rating INT,
    contents VARCHAR(200)
);