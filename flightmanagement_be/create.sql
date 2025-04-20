CREATE TABLE Airline (
	airline_name VARCHAR(100),
	PRIMARY KEY (airline_name)
);


CREATE TABLE AirlineStaff (
    username VARCHAR(100),
    airline_name VARCHAR(100),
    pwd VARCHAR (100) NOT NULL,
    first_name VARCHAR (100) NOT NULL,
    last_name VARCHAR (100) NOT NULL,
    date_of_birth DATE NOT NULL,
    PRIMARY KEY (username, airline_name),
    FOREIGN KEY (airline_name) REFERENCES Airline(airline_name)
);


CREATE TABLE AirlineStaffEmail (
	username VARCHAR (100),
    airline_name VARCHAR (100),
    email VARCHAR (100),
    PRIMARY KEY (username, airline_name, email),
    FOREIGN KEY (username) REFERENCES AirlineStaff(username),
    FOREIGN KEY (airline_name) REFERENCES AirlineStaff(airline_name)
);


CREATE TABLE AirlineStaffPhone (
    username VARCHAR (100),
    airline_name VARCHAR (100),
	phone_number VARCHAR (20),
	PRIMARY KEY (username, airline_name, phone_number),
	FOREIGN KEY (username) REFERENCES AirlineStaff(username),
    FOREIGN KEY (airline_name) REFERENCES AirlineStaff(airline_name)
);



CREATE TABLE Airport (
    code INT,
	port_name VARCHAR(100) NOT NULL,
	city VARCHAR(100) NOT NULL,
	country VARCHAR(100) NOT NULL,
	PRIMARY KEY (code)
);


CREATE TABLE Airplane (
    plane_ID INT,
	airline_name VARCHAR(100),
	num_seats INT NOT NULL,
	manufacturer VARCHAR(100) NOT NULL,
	PRIMARY KEY (plane_ID, airline_name),
	FOREIGN KEY (airline_name) REFERENCES Airline(airline_name)
);


CREATE TABLE Flight (
    plane_ID INT NOT NULL, 
    airline_name VARCHAR(100),
    departure_time DATETIME,
    flight_number INT,
    arrival_datetime DATETIME NOT NULL,
    base_price NUMERIC(8, 2) NOT NULL,
    flight_status VARCHAR(20) NOT NULL,
    PRIMARY KEY (airline_name, departure_time, flight_number),
    FOREIGN KEY (airline_name) REFERENCES Airline(airline_name),
    FOREIGN KEY (plane_ID) REFERENCES Airplane(plane_ID)
);


CREATE TABLE Arrival (
    code INT,
    airline_name VARCHAR(100),
    departure_time DATETIME,
    flight_number INT,
    PRIMARY KEY (code, airline_name, departure_time, flight_number),
    FOREIGN KEY (airline_name, departure_time, flight_number) REFERENCES Flight(airline_name, departure_time, flight_number),
    FOREIGN KEY (code) REFERENCES Airport(code)
);


CREATE TABLE Departure (
    code INT,
    airline_name VARCHAR(100),
    departure_time DATETIME,
    flight_number INT,
    PRIMARY KEY (code, airline_name, departure_time, flight_number),
    FOREIGN KEY (airline_name, departure_time, flight_number) REFERENCES Flight(airline_name, departure_time, flight_number),
    FOREIGN     KEY (code) REFERENCES Airport(code)
);



CREATE TABLE Customer (
    email VARCHAR (100), 
    cust_name VARCHAR (100) NOT NULL,
    pwd VARCHAR (100) NOT NULL,
    building_number INT NOT NULL,
    cust_street VARCHAR (50) NOT NULL,
    cust_city VARCHAR (100) NOT NULL,
    cust_state VARCHAR (50) NOT NULL,
    phone_number VARCHAR (20) NOT NULL,
    passport_expiration DATE NOT NULL,
    passport_country VARCHAR (100) NOT NULL,
    dob DATE NOT NULL,
    PRIMARY KEY (email)
);


CREATE TABLE CustomerRating (
    airline_name VARCHAR(100),
    departure_time DATETIME,
    flight_number INT,
    email VARCHAR (100), 
    customer_rating INT,
    customer_comment VARCHAR (500),
    PRIMARY KEY (airline_name, departure_time, flight_number, email),
    FOREIGN KEY (email) REFERENCES Customer(email),
    FOREIGN KEY (airline_name, departure_time, flight_number) REFERENCES Flight(airline_name, departure_time, flight_number)
);


CREATE TABLE Ticket (
    airline_name VARCHAR(100),
    departure_time DATETIME,
    flight_number INT,
    email VARCHAR (100), 
    ticket_ID INT,
    sold_price NUMERIC(8,2) ,
    card_type VARCHAR (20) , 
    card_number  VARCHAR (20) , 
    card_name  VARCHAR (100) , 
    card_expiration DATE,
    purchase_datetime DATETIME,
    PRIMARY KEY (ticket_ID, airline_name, departure_time, flight_number),
    FOREIGN KEY (email) REFERENCES Customer(email),
    FOREIGN KEY (airline_name, departure_time, flight_number) REFERENCES Flight(airline_name, departure_time, flight_number)
);
