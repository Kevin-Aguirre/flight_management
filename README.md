# Description 
Flight management project for CS-UY 3083, Introduction to Databases. 

# Frontend 
`cd` into `flightmanagement_fe` then run 

```bash
npm install 
npm start 
```

# Backend 
Make a database using mysql and create the tables using the queries in `create.sql`. insert some data into the Airline Table. More data can be inserted via the frontend.

you may have to install some libraries lile pymysql i think

you will also have to configure the following line towards the top 
of `main.py` to connect your database

```python
DB_HOST = 'localhost' # hostname (leave alone for local dev)
DB_USER = 'root' # user (typically this is default)
DB_PWD = 'password' # password (i believe this is the default as well)
DB_DB = 'class_proj' # name of actual database
```

`cd` in `flightmanagement_be` then run 

`python3 main.py`

you'll want to start by registering at least one staff, some planes, some airports, then some flights. then register some users, purchase some flights, rate some flights. etc. 

NOTE: i have not converted time from local time when creating flights, when you are writing arrival and departure time, use this website to put your time in 24-hr utc format.
https://www.utctime.net/