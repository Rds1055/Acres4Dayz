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
    owner VARCHAR(30),
    description VARCHAR(200),
    zip_code INT,
    suitable_for VARCHAR(30),
    starting_bid INT,
    image VARCHAR(10),
    FOREIGN KEY(owner) REFERENCES User(username)
);

CREATE TABLE Contract (
    ID SERIAL PRIMARY KEY,
    land_id BIGINT UNSIGNED,
    renter VARCHAR(30),
    start DATE,
    end DATE,
    FOREIGN KEY(land_id) REFERENCES Land(ID),
    FOREIGN KEY(renter) REFERENCES User(username)
);

CREATE TABLE Bid (
    ID SERIAL PRIMARY KEY,
    land_id BIGINT UNSIGNED,
    top_bid INT,
    top_bidder VARCHAR(30),
    FOREIGN KEY(land_id) REFERENCES Land(ID)
);

CREATE TABLE Review (
    ID SERIAL PRIMARY KEY,
    land_id BIGINT UNSIGNED,
    reviewer VARCHAR(30),
    rating INT,
    contents VARCHAR(200),
    FOREIGN KEY(land_id) REFERENCES Land(ID),
    FOREIGN KEY(reviewer) REFERENCES User(username)
);