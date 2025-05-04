-- airline 
INSERT INTO Airline(airline_name)
VALUES ("Delta");

-- airlinestaff
INSERT INTO AirlineStaff(username, airline_name, pwd, first_name, last_name, date_of_birth)
VALUES ("admin", "Delta", "e2fc714c4727ee9395f324cd2e7f331f", "Roe", "Jones", "1978-05-25");

INSERT INTO AirlineStaffEmail(username, airline_name, email)
VALUES ("admin", "Delta", "staff@nyu.edu");

INSERT INTO AirlineStaffPhone(username, airline_name, phone_number)
VALUES ("admin", "Delta", "111-2222-3333");
INSERT INTO AirlineStaffPhone(username, airline_name, phone_number)
VALUES ("admin", "Delta", "444-5555-6666");


-- airplanes
INSERT INTO Airplane(plane_ID, airline_name, num_seats, manufacturer)
VALUES (1, "Delta", 4, "Boeing");
INSERT INTO Airplane(plane_ID, airline_name, num_seats, manufacturer)
VALUES (2, "Delta", 4, "Airbus");
INSERT INTO Airplane(plane_ID, airline_name, num_seats, manufacturer)
VALUES (3, "Delta", 50, "Boeing");

-- airports
INSERT INTO Airport(code, port_name, city, country)
VALUES (1, "JFK", "NYC", "USA");
INSERT INTO Airport(code, port_name, city, country)
VALUES (2, "BOS", "Boston", "USA");
INSERT INTO Airport(code, port_name, city, country)
VALUES (3, "PVG", "Shanghai", "China");
INSERT INTO Airport(code, port_name, city, country)
VALUES (4, "BEI", "Beijing", "China");
INSERT INTO Airport(code, port_name, city, country)
VALUES (5, "SFO", "San Francisco", "USA");
INSERT INTO Airport(code, port_name, city, country)
VALUES (6, "LAX", "Los Angeles", "USA");
INSERT INTO Airport(code, port_name, city, country)
VALUES (7, "HKA", "Hong Kong", "China");
INSERT INTO Airport(code, port_name, city, country)
VALUES (8, "SHEN", "Shenzhen", "China");

-- customers 
INSERT INTO Customer(email, cust_name, pwd, building_number, cust_street, cust_city, cust_state, phone_number, passport_expiration, passport_country, dob)
VALUES (
    "testcustomer@nyu.edu", 
    "Test Customer 1", 
    "81dc9bdb52d04dc20036dbd8313ed055", 
    1555,
    "Jay St", 
    "Brooklyn", 
    "New York", 
    "123-4321-4321", 
    "2025-12-24", 
    "USA", 
    "1999-12-19" 
);
INSERT INTO Customer(email, cust_name, pwd, building_number, cust_street, cust_city, cust_state, phone_number, passport_expiration, passport_country, dob)
VALUES (
    "user1@nyu.edu", 
    "User 1", 
    "81dc9bdb52d04dc20036dbd8313ed055", 
    5405, 
    "Jay Street", 
    "Brooklyn", 
    "New York", 
    "123-4322-4322", 
    "2025-12-25", 
    "USA", 
    "1999-11-19"
);
INSERT INTO Customer(email, cust_name, pwd, building_number, cust_street, cust_city, cust_state, phone_number, passport_expiration, passport_country, dob)
VALUES (
    "user2@nyu.edu", 
    "User 2", 
    "81dc9bdb52d04dc20036dbd8313ed055", 
    1702, 
    "Jay Street", 
    "Brooklyn", 
    "New York",
    "123-4323-4323", 
    "2025-10-24", 
    "USA", 
    "1999-10-19"
);
INSERT INTO Customer(email, cust_name, pwd, building_number, cust_street, cust_city, cust_state, phone_number, passport_expiration, passport_country, dob)
VALUES (
    "user3@nyu.edu", 
    "User 3", 
    "81dc9bdb52d04dc20036dbd8313ed055", 
    1890, 
    "Jay Street", 
    "Brooklyn", 
    "New York",
    "123-4324-4324", 
    "2025-09-24", 
    "USA", 
    "1999-09-19"
);

-- flights 
-- 1
INSERT INTO Flight(plane_ID, airline_name, departure_time, flight_number, arrival_datetime, base_price, flight_status)
VALUES (
    3,
    "Delta",
    "2025-02-12 13:25:25",
    102,
    "2025-03-07 16:50:25",
    300.00,
    "on-time"
);

INSERT INTO Departure(code, airline_name, departure_time, flight_number)
VALUES (
    5,
    "Delta",
    "2025-02-12 13:25:25",
    102
);

INSERT INTO Arrival(code, airline_name, departure_time, flight_number)
VALUES (
    6,
    "Delta",
    "2025-02-12 13:25:25",
    102
);

-- 2
INSERT INTO Flight(plane_ID, airline_name, departure_time, flight_number, arrival_datetime, base_price, flight_status)
VALUES (
    3,
    "Delta",
    "2025-03-07 13:25:25",
    104,
    "2025-03-07 16:50:25",
    300.00,
    "on-time"
);

INSERT INTO Departure(code, airline_name, departure_time, flight_number)
VALUES (
    3,
    "Delta",
    "2025-03-07 13:25:25",
    104
);

INSERT INTO Arrival(code, airline_name, departure_time, flight_number)
VALUES (
    4,
    "Delta",
    "2025-03-07 13:25:25",
    104
);

-- 3
INSERT INTO Flight(plane_ID, airline_name, departure_time, flight_number, arrival_datetime, base_price, flight_status)
VALUES (
    3,
    "Delta",
    "2025-01-09 13:25:25",
    106,
    "2025-01-09 16:50:25",
    350.00,
    "delayed"
);

INSERT INTO Departure(code, airline_name, departure_time, flight_number)
VALUES (
    5,
    "Delta",
    "2025-01-09 13:25:25",
    106
);

INSERT INTO Arrival(code, airline_name, departure_time, flight_number)
VALUES (
    6,
    "Delta",
    "2025-01-09 13:25:25",
    106
);

-- 4
INSERT INTO Flight(plane_ID, airline_name, departure_time, flight_number, arrival_datetime, base_price, flight_status)
VALUES (
    2,
    "Delta",
    "2025-07-01 13:25:25",
    206,
    "2025-07-01 16:50:25",
    400.00,
    "on-time"
);

INSERT INTO Departure(code, airline_name, departure_time, flight_number)
VALUES (
    5,
    "Delta",
    "2025-07-01 13:25:25",
    206
);

INSERT INTO Arrival(code, airline_name, departure_time, flight_number)
VALUES (
    6,
    "Delta",
    "2025-07-01 13:25:25",
    206
);

-- 5
INSERT INTO Flight(plane_ID, airline_name, departure_time, flight_number, arrival_datetime, base_price, flight_status)
VALUES (
    2,
    "Delta",
    "2025-08-02 13:25:25",
    207,
    "2025-08-02 16:50:25",
    300.00,
    "on-time"
);

INSERT INTO Departure(code, airline_name, departure_time, flight_number)
VALUES (
    6,
    "Delta",
    "2025-08-02 13:25:25",
    207
);

INSERT INTO Arrival(code, airline_name, departure_time, flight_number)
VALUES (
    5,
    "Delta",
    "2025-08-02 13:25:25",
    207
);

-- 6
INSERT INTO Flight(plane_ID, airline_name, departure_time, flight_number, arrival_datetime, base_price, flight_status)
VALUES (
    3,
    "Delta",
    "2024-12-12 13:25:25",
    134,
    "2024-12-12 16:50:25",
    300.00,
    "delayed"
);

INSERT INTO Departure(code, airline_name, departure_time, flight_number)
VALUES (
    1,
    "Delta",
    "2024-12-12 13:25:25",
    134
);

INSERT INTO Arrival(code, airline_name, departure_time, flight_number)
VALUES (
    2,
    "Delta",
    "2024-12-12 13:25:25",
    134
);

-- 7
INSERT INTO Flight(plane_ID, airline_name, departure_time, flight_number, arrival_datetime, base_price, flight_status)
VALUES (
    1,
    "Delta",
    "2025-05-30 13:25:25",
    296,
    "2025-05-30 16:50:25",
    3000.00,
    "on-time"
);

INSERT INTO Departure(code, airline_name, departure_time, flight_number)
VALUES (
    3,
    "Delta",
    "2025-05-30 13:25:25",
    296
);

INSERT INTO Arrival(code, airline_name, departure_time, flight_number)
VALUES (
    5,
    "Delta",
    "2025-05-30 13:25:25",
    296
);

-- 8
INSERT INTO Flight(plane_ID, airline_name, departure_time, flight_number, arrival_datetime, base_price, flight_status)
VALUES (
    1,
    "Delta",
    "2025-02-28 10:25:25",
    715,
    "2025-02-28 13:50:25",
    500.00,
    "delayed"
);

INSERT INTO Departure(code, airline_name, departure_time, flight_number)
VALUES (
    3,
    "Delta",
    "2025-02-28 10:25:25",
    715
);

INSERT INTO Arrival(code, airline_name, departure_time, flight_number)
VALUES (
    4,
    "Delta",
    "2025-02-28 10:25:25",
    715
);

-- 9
INSERT INTO Flight(plane_ID, airline_name, departure_time, flight_number, arrival_datetime, base_price, flight_status)
VALUES (
    3,
    "Delta",
    "2024-05-26 13:25:25",
    839,
    "2024-05-26 16:50:25",
    300.00,
    "on-time"
);

INSERT INTO Departure(code, airline_name, departure_time, flight_number)
VALUES (
    8,
    "Delta",
    "2024-05-26 13:25:25",
    839
);

INSERT INTO Arrival(code, airline_name, departure_time, flight_number)
VALUES (
    4,
    "Delta",
    "2024-05-26 13:25:25",
    839
);

-- ticket
INSERT INTO Ticket(airline_name, departure_time, flight_number, email, ticket_ID, sold_price, card_type, card_number, card_name, card_expiration, purchase_datetime)
VALUES (
    "Delta",
    "2025-02-12 13:25:25",
    102,
    "testcustomer@nyu.edu",
    1,
    300.0,
    "credit",
    "1111-2222-3333-4444",
    "Test Customer 1",
    "2027-03-01",
    "2025-01-10 11:55:55"
);

INSERT INTO Ticket(airline_name, departure_time, flight_number, email, ticket_ID, sold_price, card_type, card_number, card_name, card_expiration, purchase_datetime)
VALUES (
    "Delta",
    "2025-02-12 13:25:25",
    102,
    "user1@nyu.edu",
    2,
    300.0,
    "credit",
    "1111-2222-3333-5555",
    "User 1",
    "2027-03-01",
    "2025-01-09 11:55:55"
);

INSERT INTO Ticket(airline_name, departure_time, flight_number, email, ticket_ID, sold_price, card_type, card_number, card_name, card_expiration, purchase_datetime)
VALUES (
    "Delta",
    "2025-02-12 13:25:25",
    102,
    "user2@nyu.edu",
    3,
    300.0,
    "credit",
    "1111-2222-3333-5555",
    "User 2",
    "2027-03-01",
    "2025-02-08 11:55:55"
);

INSERT INTO Ticket(airline_name, departure_time, flight_number, email, ticket_ID, sold_price, card_type, card_number, card_name, card_expiration, purchase_datetime)
VALUES (
    "Delta",
    "2025-03-07 13:25:25",
    104,
    "user1@nyu.edu",
    4,
    300.0,
    "credit",
    "1111-2222-3333-5555",
    "User 1",
    "2024-03-01",
    "2025-01-21 11:55:55"
);

INSERT INTO Ticket(airline_name, departure_time, flight_number, email, ticket_ID, sold_price, card_type, card_number, card_name, card_expiration, purchase_datetime)
VALUES (
    "Delta",
    "2025-03-07 13:25:25",
    104,
    "testcustomer@nyu.edu",
    5,
    300.0,
    "credit",
    "1111-2222-3333-4444",
    "Test Customer 1",
    "2027-03-01",
    "2025-02-28 11:55:55"
);

INSERT INTO Ticket(airline_name, departure_time, flight_number, email, ticket_ID, sold_price, card_type, card_number, card_name, card_expiration, purchase_datetime)
VALUES (
    "Delta",
    "2025-01-09 13:25:25",
    106,
    "testcustomer@nyu.edu",
    6,
    350.0,
    "credit",
    "1111-2222-3333-4444",
    "Test Customer 1",
    "2027-03-01",
    "2025-01-07 11:55:55"
);

INSERT INTO Ticket(airline_name, departure_time, flight_number, email, ticket_ID, sold_price, card_type, card_number, card_name, card_expiration, purchase_datetime)
VALUES (
    "Delta",
    "2025-01-09 13:25:25",
    106,
    "user3@nyu.edu",
    7,
    350.0,
    "credit",
    "1111-2222-3333-5555",
    "User 3",
    "2027-03-01",
    "2024-12-07 11:55:55"
);

INSERT INTO Ticket(airline_name, departure_time, flight_number, email, ticket_ID, sold_price, card_type, card_number, card_name, card_expiration, purchase_datetime)
VALUES (
    "Delta",
    "2024-05-26 13:25:25",
    839,
    "user3@nyu.edu",
    8,
    300.0,
    "credit",
    "1111-2222-3333-5555",
    "User 3",
    "2024-03-01",
    "2024-05-08 11:55:55"
);

INSERT INTO Ticket(airline_name, departure_time, flight_number, email, ticket_ID, sold_price, card_type, card_number, card_name, card_expiration, purchase_datetime)
VALUES (
    "Delta",
    "2025-02-12 13:25:25",
    102,
    "user3@nyu.edu",
    9,
    300.0,
    "credit",
    "1111-2222-3333-5555",
    "User 3",
    "2024-03-01",
    "2024-12-11 11:55:55"
);


INSERT INTO Ticket(airline_name, departure_time, flight_number, email, ticket_ID, sold_price, card_type, card_number, card_name, card_expiration, purchase_datetime)
VALUES (
    "Delta",
    "2024-12-12 13:25:25",
    134,
    "user3@nyu.edu",
    11,
    300.0,
    "credit",
    "1111-2222-3333-5555",
    "User 3",
    "2027-03-01",
    "2024-10-23 11:55:55"
);

INSERT INTO Ticket(airline_name, departure_time, flight_number, email, ticket_ID, sold_price, card_type, card_number, card_name, card_expiration, purchase_datetime)
VALUES (
    "Delta",
    "2025-02-28 10:25:25",
    715,
    "testcustomer@nyu.edu",
    12,
    500.0,
    "credit",
    "1111-2222-3333-4444",
    "Test Customer 1",
    "2024-03-01",
    "2024-10-19 11:55:55"
);


INSERT INTO Ticket(airline_name, departure_time, flight_number, email, ticket_ID, sold_price, card_type, card_number, card_name, card_expiration, purchase_datetime)
VALUES (
    "Delta",
    "2025-07-01 13:25:25",
    206,
    "user3@nyu.edu",
    14,
    400.0,
    "credit",
    "1111-2222-3333-5555",
    "User 3",
    "2024-03-01",
    "2025-04-20 11:55:55"
);

INSERT INTO Ticket(airline_name, departure_time, flight_number, email, ticket_ID, sold_price, card_type, card_number, card_name, card_expiration, purchase_datetime)
VALUES (
    "Delta",
    "2025-07-01 13:25:25",
    206,
    "user1@nyu.edu",
    15,
    400.0,
    "credit",
    "1111-2222-3333-5555",
    "User 1",
    "2024-03-01",
    "2025-04-21 11:55:55"
);

INSERT INTO Ticket(airline_name, departure_time, flight_number, email, ticket_ID, sold_price, card_type, card_number, card_name, card_expiration, purchase_datetime)
VALUES (
    "Delta",
    "2025-07-01 13:25:25",
    206,
    "user2@nyu.edu",
    16,
    400.0,
    "credit",
    "1111-2222-3333-5555",
    "User 2",
    "2024-03-01",
    "2024-02-19 11:55:55"
);

INSERT INTO Ticket(airline_name, departure_time, flight_number, email, ticket_ID, sold_price, card_type, card_number, card_name, card_expiration, purchase_datetime)
VALUES (
    "Delta",
    "2025-08-02 13:25:25",
    207,
    "user1@nyu.edu",
    17,
    300.0,
    "credit",
    "1111-2222-3333-5555",
    "User 1",
    "2024-03-01",
    "2025-01-11 11:55:55"
);

INSERT INTO Ticket(airline_name, departure_time, flight_number, email, ticket_ID, sold_price, card_type, card_number, card_name, card_expiration, purchase_datetime)
VALUES (
    "Delta",
    "2025-08-02 13:25:25",
    207,
    "testcustomer@nyu.edu",
    18,
    300.0,
    "credit",
    "1111-2222-3333-4444",
    "Test Customer 1",
    "2024-03-01",
    "2025-02-25 11:55:55"
);

INSERT INTO Ticket(airline_name, departure_time, flight_number, email, ticket_ID, sold_price, card_type, card_number, card_name, card_expiration, purchase_datetime)
VALUES (
    "Delta",
    "2025-05-30 13:25:25",
    296,
    "user1@nyu.edu",
    19,
    3000.0,
    "credit",
    "1111-2222-3333-4444",
    "Test Customer 1",
    "2024-03-01",
    "2025-04-22 11:55:55"
);

INSERT INTO Ticket(airline_name, departure_time, flight_number, email, ticket_ID, sold_price, card_type, card_number, card_name, card_expiration, purchase_datetime)
VALUES (
    "Delta",
    "2025-05-30 13:25:25",
    296,
    "testcustomer@nyu.edu",
    20,
    3000.0,
    "credit",
    "1111-2222-3333-4444",
    "Test Customer 1",
    "2024-03-01",
    "2024-12-16 11:55:55"
);


-- customer rating 
INSERT INTO CustomerRating(airline_name, departure_time, flight_number, email, customer_rating, customer_comment)
VALUES(
    "Delta",
    "2025-02-12 13:25:25",
    102,
    "testcustomer@nyu.edu",
    4,
    "Very Comfortable"
);

INSERT INTO CustomerRating(airline_name, departure_time, flight_number, email, customer_rating, customer_comment)
VALUES(
    "Delta",
    "2025-02-12 13:25:25",
    102,
    "user1@nyu.edu",
    5,
    "Relaxing, check-in and onboarding very professional"
);

INSERT INTO CustomerRating(airline_name, departure_time, flight_number, email, customer_rating, customer_comment)
VALUES(
    "Delta",
    "2025-02-12 13:25:25",
    102,
    "user2@nyu.edu",
    3,
    "Satisfied and will use the same flight again”"
);

INSERT INTO CustomerRating(airline_name, departure_time, flight_number, email, customer_rating, customer_comment)
VALUES(
    "Delta",
    "2025-03-07 13:25:25",
    104,
    "testcustomer@nyu.edu",
    1,
    "Customer Care services are not good"
);

INSERT INTO CustomerRating(airline_name, departure_time, flight_number, email, customer_rating, customer_comment)
VALUES(
    "Delta",
    "2025-03-07 13:25:25",
    104,
    "user1@nyu.edu",
    5,
    "Comfortable journey and Professional"
);

