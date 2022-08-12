import sqlite3

connection = sqlite3.connect('data.db')
cursor = connection.cursor()

create_table = "Create TABLE IF NOT EXISTS\
    users (\
        user_id INTEGER PRIMARY KEY,\
        username text(20) NOT NULL UNIQUE, \
        first_name text(20) NOT NULL, \
        last_name text(20) NOT NULL, \
        password text(16) NOT NULL,\
        email text(30) NOT NULL UNIQUE,\
        user_type INTEGER NOT NULL\
        )"
        
cursor.execute(create_table)

create_table = "Create TABLE IF NOT EXISTS\
    bird_info (\
        bird_name text(30) NOT NULL UNIQUE, \
        bird_info text(300) NOT NULL \
        )"

cursor.execute(create_table)

create_table = "Create TABLE IF NOT EXISTS\
    birds_location (\
        bird_id INTEGER PRIMARY KEY,\
        bird_name text(20) NOT NULL UNIQUE, \
        bird_family text(30) NOT NULL,\
        image_path text(300) NOT NULL, \
        bird_info text(300) NOT NULL, \
        isApproved boolean default True,\
        lat FLOAT(5,5) NOT NULL,\
        lng FLOAT(5,5) NOT NULL\
        )"
cursor.execute(create_table)

create_table = "Create TABLE IF NOT EXISTS\
    birds_to_train (\
        bird_id INTEGER PRIMARY KEY,\
        bird_name text(20) NOT NULL UNIQUE,\
        image_id text(60) NOT NULL,\
        user_id INTEGER, \
        isApproved INTEGER NOT NULL,\
        lat FLOAT(5,5) NOT NULL,\
        lng FLOAT(5,5) NOT NULL,\
        type text(20)\
        )"

cursor.execute(create_table)

connection.commit()
connection.close()

