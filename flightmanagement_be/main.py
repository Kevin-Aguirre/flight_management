#Import Flask Library
from flask import Flask, render_template, jsonify, request, session, url_for, redirect
import pymysql.cursors
import json
from flask_cors import CORS
from datetime import datetime, timezone
import random
import hashlib
import pprint
import pytz
import math

#Initialize the app from Flask
app = Flask(__name__)
app.config.update(
    SECRET_KEY='some key that you will never guess',
    SESSION_COOKIE_SAMESITE='Lax',
    SESSION_COOKIE_SECURE=False
)

app.secret_key = 'some key that you will never guess'
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])


DB_HOST = 'localhost'
DB_USER = 'root'
DB_PWD = 'password'
DB_DB = 'class_proj'



def hash_password(password):
    return hashlib.md5(password.encode()).hexdigest()

@app.route('/api/get-reports', methods=['GET'])
def getReports():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()
    query = "SELECT * FROM Ticket WHERE email IS NOT NULL;"
    cursor.execute(query)
    data = cursor.fetchall()
    return jsonify(data)


@app.route('/api/get-flights', methods=['GET'])
def getFlights():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()


    query = """
    SELECT 
        f.*, 
        a.port_name   AS arrival_port_name, 
        a.city        AS arrival_city, 
        a.country     AS arrival_country, 
        d.port_name   AS departure_port_name, 
        d.city        AS departure_city, 
        d.country     AS departure_country
    FROM Flight f
    JOIN Arrival ar 
        ON f.airline_name = ar.airline_name 
        AND f.departure_time = ar.departure_time 
        AND f.flight_number = ar.flight_number
    JOIN Airport a 
        ON ar.code = a.code
    JOIN Departure dep 
        ON f.airline_name = dep.airline_name 
        AND f.departure_time = dep.departure_time 
        AND f.flight_number = dep.flight_number
    JOIN Airport d 
        ON dep.code = d.code
    """   
    cursor.execute(query)
    flight_data = cursor.fetchall()

    for flight in flight_data:
        airline_name = flight['airline_name']
        departure_datetime = flight['departure_time']
        flight_number = flight['flight_number']
        plane_ID = flight['plane_ID']
        print(departure_datetime)

        getTicketCountQuery = """
        SELECT 
            COUNT(*) AS tickets_sold
        FROM Ticket
        WHERE 
            airline_name = %s AND
            departure_time = %s AND
            flight_number = %s AND
            email IS NOT NULL;  
        """
        cursor.execute(getTicketCountQuery, (airline_name, departure_datetime, flight_number,))
        ticket_count = int(cursor.fetchone()['tickets_sold'])
        getCapacityQuery = """
        SELECT 
            num_seats
        FROM Airplane 
        WHERE 
            plane_ID = %s;
        """
        cursor.execute(getCapacityQuery, (plane_ID))
        capacity = int(cursor.fetchone()['num_seats'])
        print(ticket_count)
        if (ticket_count > 0) and (capacity * 0.6 <= ticket_count):
            flight['curr_price'] = round(float(flight['base_price']) * 1.20, 2)
        else:
            flight['curr_price'] = flight['base_price']

    cursor.close()
    return jsonify(flight_data)

@app.route('/api/get-ratings', methods=['GET'])
def getRatings():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()        

    airline_name = request.args.get('airline_name')
    departure_time = datetime.strptime(request.args.get('departure_time'), '%a, %d %b %Y %H:%M:%S %Z')
    flight_number = request.args.get('flight_number')

    query = """
    SELECT 
        *,
        (SELECT AVG(customer_rating)
         FROM CustomerRating
         WHERE airline_name = %s AND departure_time = %s AND flight_number = %s
        ) AS average_rating 
    FROM CustomerRating 
    WHERE 
        airline_name = %s AND
        departure_time = %s AND
        flight_number = %s;
    """
    cursor.execute(query, (airline_name, departure_time, flight_number,airline_name, departure_time, flight_number,))
    data = cursor.fetchall()
    pprint.pprint(data)
    cursor.close()
    conn.close()

    return jsonify(data)

@app.route('/api/get-customers', methods=['GET'])
def getCustomers():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()    

    airline_name = request.args.get('airline_name')
    departure_time = datetime.strptime(request.args.get('departure_time'), '%a, %d %b %Y %H:%M:%S %Z')
    flight_number = request.args.get('flight_number')

    query = """
    SELECT 
        Ticket.*,
        Customer.cust_name,  
        Customer.phone_number,
        Customer.dob
    FROM Ticket INNER JOIN Customer ON Ticket.email = Customer.email
    WHERE 
        Ticket.airline_name = %s AND
        Ticket.departure_time = %s AND
        Ticket.flight_number = %s AND
        Ticket.email IS NOT NULL;
    """
    cursor.execute(query, (airline_name, departure_time, flight_number))
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    print(data)
    return jsonify(data)


@app.route('/api/edit-flight-status', methods=['POST'])
def editFlightStatus():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()    

    airline_name = request.json.get('airline_name')
    flight_number = request.json.get('flight_number')
    departure_time = datetime.strptime(request.json.get('departure_time'), '%a, %d %b %Y %H:%M:%S %Z')
    new_flight_status = request.json.get('flight_status')

    query = """
    UPDATE Flight
        SET
            flight_status = %s
        WHERE 
            airline_name = %s AND
            flight_number = %s AND
            departure_time = %s;
    """
    cursor.execute(query, (new_flight_status, airline_name, flight_number, departure_time))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message" : "Flight updated successfully."}


@app.route('/api/cancel-flight', methods=['POST'])
def cancelFlight():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()    

    airline_name = request.json.get('airline_name')
    departure_time = datetime.strptime(request.json.get('departure_time'), '%a, %d %b %Y %H:%M:%S %Z')
    flight_number = request.json.get('flight_number')
    email = request.json.get('email')

    removeFlightQuery = """
    UPDATE Ticket
    SET 
        email = NULL,
        sold_price = NULL,
        card_type = NULL,
        card_number = NULL,
        card_name = NULL,
        card_expiration = NULL,
        purchase_datetime = NULL
    WHERE 
        airline_name = %s AND
        departure_time = %s AND
        flight_number = %s AND
        email = %s;

    """
    cursor.execute(removeFlightQuery, (airline_name, departure_time, flight_number, email,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message" : "Flight Cancelled Successfully"}


@app.route('/api/add-plane', methods=['POST'])
def addplane():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()    

    plane_ID = str(random.randint(1000000, 9999999))
    airline_name = request.json.get('airline_name')
    num_seats = request.json.get('num_seats')
    manufacturer = request.json.get('manufacturer')

    query = "INSERT INTO Airplane VALUES(%s, %s, %s, %s);"
    cursor.execute(query, (plane_ID, airline_name, num_seats, manufacturer))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message" : "Successfully created airplane"}

@app.route('/api/add-airport', methods=['POST'])
def addAirport():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()    

    code = str(random.randint(1000000, 9999999))
    port_name = request.json.get('port_name')
    city = request.json.get('city')
    country = request.json.get('country')

    query = "INSERT INTO Airport VALUES(%s, %s, %s, %s);"
    cursor.execute(query, (code, port_name, city, country))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message" : "Successfully created airport"}


@app.route('/api/get-airports', methods=['GET'])
def getAirports():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()    
    query = "SELECT * FROM Airport;"
    cursor.execute(query)    
    data = cursor.fetchall()

    cursor.close()
    conn.close()
    return data

@app.route('/api/get-planes/<airline_name>', methods=['GET'])
def getPlanes(airline_name):
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()    
    query = "SELECT * FROM Airplane WHERE airline_name = %s;"
    cursor.execute(query, (airline_name,))
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)

@app.route('/api/create-flight', methods=['POST'])
def addFlight():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()

    source_port_code = request.json.get('source_port_code')
    dst_port_code = request.json.get('dst_port_code')

    print(request.json.get('departure_datetime'))
    print(request.json.get('arrival_datetime'))

    plane_ID = request.json.get('plane_ID')
    airline_name = request.json.get('airline_name')
    departure_datetime = datetime.strptime(
        request.json.get('departure_datetime'), '%Y-%m-%dT%H:%M:%S.%fZ'
    ).replace(tzinfo=pytz.utc)
    arrival_datetime = datetime.strptime(
        request.json.get('arrival_datetime'), '%Y-%m-%dT%H:%M:%S.%fZ'
    ).replace(tzinfo=pytz.utc)

    print(departure_datetime)
    print(arrival_datetime)

    flight_number = str(random.randint(100000, 999999))
    base_price = request.json.get('base_price')
    flight_status = request.json.get('flight_status')


    insertFlightQuery = "INSERT INTO Flight VALUES (%s, %s, %s, %s, %s, %s, %s);"
    cursor.execute(insertFlightQuery, (plane_ID, airline_name, departure_datetime, flight_number, arrival_datetime, base_price, flight_status))
    
    # get airplane info 
    getPlaneInfoQuery = "SELECT * FROM Airplane WHERE plane_ID = %s AND airline_name = %s;"
    cursor.execute(getPlaneInfoQuery, (plane_ID, airline_name))
    plane_data = cursor.fetchone()

    makeTicketQuery = "INSERT INTO Ticket VALUES (%s, %s, %s, NULL, %s, NULL, NULL, NULL, NULL, NULL, NULL);"
    for _ in range(plane_data['num_seats']):
        ticket_id = random.randint(1000000, 9999999)
        cursor.execute(makeTicketQuery, (airline_name, departure_datetime, flight_number, ticket_id))

    addDepartureQuery = "INSERT INTO Departure VALUES (%s, %s, %s, %s);"
    cursor.execute(addDepartureQuery, (source_port_code, airline_name, departure_datetime, flight_number))
    addArrivalQuery = "INSERT INTO Arrival VALUES (%s, %s, %s, %s);"
    cursor.execute(addArrivalQuery, (dst_port_code, airline_name, departure_datetime, flight_number))

    conn.commit()
    cursor.close()
    conn.close()
    return {"message" : "Successfully created flight."}

# huge issue with this, you will be able to make infinite tickets 
@app.route('/api/purchase-flight', methods=['POST'])
def purchaseFlight():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()

    airline_name = request.json.get('airline_name')
    departure_time = datetime.strptime(request.json.get('departure_time'), '%a, %d %b %Y %H:%M:%S %Z')
    flight_number = request.json.get('flight_number')
    email = request.json.get('email')
    sold_price = request.json.get('sold_price')
    card_type = request.json.get('card_type')
    card_number = request.json.get('card_number')
    card_name = request.json.get('card_name')
    card_expiration = request.json.get('card_expiration')
    purchase_datetime = datetime.strptime(request.json.get('purchase_datetime'), '%Y-%m-%dT%H:%M:%S.%fZ')

    checkExistenceQuery = """
    SELECT * 
    FROM Ticket
    WHERE 
        airline_name = %s AND
        departure_time = %s AND
        flight_number = %s AND
        email = %s;
    """

    cursor.execute(checkExistenceQuery, (airline_name, departure_time, flight_number, email))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        return {"error" : "You have already purchased this flight"}


    findAvailableTicketQuery = """
    SELECT ticket_ID 
    FROM Ticket
    WHERE 
        airline_name = %s AND
        departure_time = %s AND
        flight_number = %s AND
        email IS NULL AND
        card_type IS NULL AND
        card_number IS NULL AND
        card_name IS NULL AND
        card_expiration IS NULL AND
        sold_price IS NULL AND
        purchase_datetime IS NULL
    LIMIT 1;
    """
    cursor.execute(findAvailableTicketQuery, (airline_name, departure_time, flight_number,))
    row = cursor.fetchone()
    if not row: 
        cursor.close()
        conn.close()
        return {"error": "No Available tickets left for this flight"}
    ticket_ID = row['ticket_ID']
    updateTicketQuery = """
    UPDATE Ticket
    SET 
        email = %s,
        sold_price = %s,
        card_type = %s,
        card_number = %s,
        card_name = %s,
        card_expiration = %s,
        purchase_datetime = %s
    WHERE 
        ticket_ID = %s;
    """
    cursor.execute(updateTicketQuery, (
        email,
        sold_price,
        card_type,
        card_number,
        card_name,
        card_expiration,
        purchase_datetime,
        ticket_ID
    ))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message" : "Flight purchased Successfully.", "ticket_ID": ticket_ID}

@app.route('/api/submit-review', methods=['POST'])
def submitReview():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()


    airline_name = request.json.get('airline_name')
    departure_time = datetime.strptime(request.json.get('departure_time'), '%a, %d %b %Y %H:%M:%S %Z')
    flight_number = request.json.get('flight_number')
    email = request.json.get('email')
    customer_rating = request.json.get('rating')
    customer_comment = request.json.get('reviewText')

    checkExistenceQuery = """
    SELECT * 
    FROM CustomerRating
    WHERE 
        airline_name= %s AND
        departure_time= %s AND
        flight_number= %s AND
        email= %s;
    """
    cursor.execute(checkExistenceQuery, (airline_name, departure_time, flight_number, email))

    if cursor.fetchone():
        cursor.close()
        conn.close()
        return {"error" : "You have already reviewed this flight"}, 401
    
    submitReviewQuery = """
    INSERT INTO CustomerRating VALUES (%s, %s, %s, %s, %s, %s);
    """
    cursor.execute(submitReviewQuery, (airline_name, departure_time, flight_number, email, customer_rating, customer_comment))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message" : "Submitted Review Successfully."}, 200

@app.route('/api/my-flights/<email>', methods=['GET'])
def getMyFlights(email):
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()

    query = """
    SELECT 
        f.*, 
        a.port_name   AS arrival_port_name, 
        a.city        AS arrival_city, 
        a.country     AS arrival_country, 
        d.port_name   AS departure_port_name, 
        d.city        AS departure_city, 
        d.country     AS departure_country
    FROM Ticket t
    JOIN Flight f 
        ON f.airline_name = t.airline_name 
        AND f.departure_time = t.departure_time 
        AND f.flight_number = t.flight_number
    JOIN Arrival ar 
        ON t.airline_name = ar.airline_name 
        AND t.departure_time = ar.departure_time 
        AND t.flight_number = ar.flight_number
    JOIN Airport a 
        ON ar.code = a.code
    JOIN Departure dep 
        ON t.airline_name = dep.airline_name 
        AND t.departure_time = dep.departure_time 
        AND t.flight_number = dep.flight_number
    JOIN Airport d 
        ON dep.code = d.code
    WHERE 
        email = %s; 
    """

    cursor.execute(query, (email))
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

@app.route('/api/future-flights', methods=['GET'])
def getFutureFlights():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()


    query = """
    SELECT 
        f.*, 
        a.port_name   AS arrival_port_name, 
        a.city        AS arrival_city, 
        a.country     AS arrival_country, 
        d.port_name   AS departure_port_name, 
        d.city        AS departure_city, 
        d.country     AS departure_country
    FROM Flight f
    JOIN Arrival ar 
        ON f.airline_name = ar.airline_name 
        AND f.departure_time = ar.departure_time 
        AND f.flight_number = ar.flight_number
    JOIN Airport a 
        ON ar.code = a.code
    JOIN Departure dep 
        ON f.airline_name = dep.airline_name 
        AND f.departure_time = dep.departure_time 
        AND f.flight_number = dep.flight_number
    JOIN Airport d 
        ON dep.code = d.code
    WHERE 
        f.departure_time > NOW();   
    """   
    cursor.execute(query)
    flight_data = cursor.fetchall()

    for flight in flight_data:
        airline_name = flight['airline_name']
        departure_datetime = flight['departure_time']
        flight_number = flight['flight_number']
        plane_ID = flight['plane_ID']
        print(departure_datetime)

        getTicketCountQuery = """
        SELECT 
            COUNT(*) AS tickets_sold
        FROM Ticket
        WHERE 
            airline_name = %s AND
            departure_time = %s AND
            flight_number = %s AND
            email IS NOT NULL;  
        """
        cursor.execute(getTicketCountQuery, (airline_name, departure_datetime, flight_number,))
        ticket_count = int(cursor.fetchone()['tickets_sold'])
        getCapacityQuery = """
        SELECT 
            num_seats
        FROM Airplane 
        WHERE 
            plane_ID = %s;
        """
        cursor.execute(getCapacityQuery, (plane_ID))
        capacity = int(cursor.fetchone()['num_seats'])
        print(ticket_count)
        if (ticket_count > 0) and (capacity * 0.6 <= ticket_count):
            flight['curr_price'] = round(float(flight['base_price']) * 1.20, 2)
        else:
            flight['curr_price'] = flight['base_price']

    cursor.close()
    return jsonify(flight_data)

# staff registration    
@app.route('/api/register-staff', methods = ['POST'])
def registerStaff():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()

    username = request.json.get('username')
    airline_name = request.json.get('airline_name')
    pwd = hash_password(request.json.get('pwd'))
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    date_of_birth = request.json.get('date_of_birth')
    date_of_birth_obj = datetime.strptime(date_of_birth, "%Y-%m-%d").date()

    cursor.execute("SELECT * FROM AirlineStaff WHERE username = %s AND airline_name = %s", (username, airline_name,))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        return {"error": "A staff with this username already exists in this airline."}, 409

    query = """
    INSERT INTO AirlineStaff VALUES 
    (%s, %s, %s, %s, %s, %s);
    """
    cursor.execute(query, (username, airline_name, pwd, first_name, last_name, date_of_birth_obj))
    conn.commit()
    cursor.close()

    return {"message" : "Staff registered successfully!"}, 201    

# customer registration 
@app.route('/api/register-customer', methods = ['POST'])
def registerCustomer():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()

    email = request.json.get('email')
    cust_name = request.json.get('cust_name')
    pwd = hash_password(request.json.get('pwd'))
    building_number = int(request.json.get('building_number'))
    cust_street = request.json.get('cust_street')
    cust_city = request.json.get('cust_city')
    cust_state = request.json.get('cust_state')
    phone_number = request.json.get('phone_number')
    passport_expiration = request.json.get('passport_expiration')
    passport_expiration_obj = datetime.strptime(passport_expiration, "%Y-%m-%d").date()
    passport_country = request.json.get('passport_country')
    dob = request.json.get('dob')
    dob_obj = datetime.strptime(dob, "%Y-%m-%d").date()

    cursor.execute("SELECT * FROM Customer WHERE email = %s", (email,))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        return {"error": "A customer with this email already exists."}, 409

    query = """
    INSERT INTO Customer VALUES 
    (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
    """
    cursor.execute(query, (email, cust_name, pwd, building_number, cust_street, cust_city, cust_state, phone_number, passport_expiration_obj, passport_country, dob_obj))
    conn.commit()
    cursor.close()

    return {"message" : "Customer registered successfully!"}, 201

#Authenticates the login
@app.route('/api/login-staff', methods=['POST'])
def loginStaff():
    username = request.json.get('username')
    pwd = hash_password(request.json.get('pwd'))

    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()

    query = 'SELECT * FROM AirlineStaff WHERE username = %s and pwd = %s'
    cursor.execute(query, (username, pwd))
    data = cursor.fetchone()
    cursor.close()

    if data:
        session['username'] = username
        return jsonify({"message": "Login successful", "user": data, "type": "staff"}), 200
    else:
        return jsonify({"error": "Invalid login or username"}), 401

# Authenticates the login
@app.route('/api/login-customer', methods=['POST'])
def loginCustomer():
    email = request.json.get('email')
    pwd = hash_password(request.json.get('pwd'))

    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()

    query = 'SELECT * FROM Customer WHERE email = %s and pwd = %s'
    cursor.execute(query, (email, pwd))
    data = cursor.fetchone()
    cursor.close()

    if data:
        session['username'] = email
        return jsonify({"message": "Login successful", "user": data, "type": "customer"}), 200
    else:
        return {"error": "Invalid login or username"}, 401

@app.route('/api/logout')
def logout():
    
	session.pop('username', None)
	return jsonify({"message": "Logged out successfully"})

@app.route('/api/get-airlines', methods=['GET'])
def getAirlines():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PWD, db=DB_DB, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()
    query = "SELECT * FROM Airline;"
    cursor.execute(query)
    data = cursor.fetchall()
    print(data)
    return data


if __name__ == "__main__":
    app.run('127.0.0.1', 5002, debug = True)



"""

INSERT INTO Airline VALUES ("United Airlines");
INSERT INTO Airline VALUES ("American Airlines");
INSERT INTO Airline VALUES ("Delta Airlines");
INSERT INTO Airline VALUES ("Southwest Airlines");
INSERT INTO Airline VALUES ("Spirit Airlines");
"""


"""
TODO
searhcing future flights
homepage for customer, just something like welcome, here are your upcoming flihgts 
let airline staff view customers of a flight
let airlien staff change status of flight 
let airline staff view flight ratings 
let airline staff view reports
logout screen


UPDATE Ticket
    SET 
        email = "cust1@test.com",
        sold_price = "80",
        card_type = "debit",
        card_number = "12345678",
        card_name = "asdfghg",
        card_expiration = NULL,
        purchase_datetime = NULL
    WHERE 
        ticket_ID = "2411095";


        
DELETE FROM Arrival;
DELETE FROM Departure;
DELETE FROM Ticket;
DELETE FROM CustomerRating;
DELETE FROM Flight;
;
        


"""

"""
mysql -u root -p
SHOW DATABASES;
USE class_proj;
SHOW TABLES;
"""