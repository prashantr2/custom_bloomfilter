\c seatsdb;

-- To be performed on PostgreSQL DB
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40)
);

-- Total 60 entries
INSERT INTO users (name) VALUES
('Mia Brown'), ('John Jackson'), ('Chris Garcia'), ('James Lopez'), ('Joseph Rodriguez'), ('Ava Moore'), ('Sophia Gonzalez'), ('Sophia Miller'), ('John Gonzalez'), ('David Gonzalez'), ('Daniel Miller'), ('Emma Wilson'), ('John Rodriguez'), ('Michael Gonzalez'), ('Michael Garcia'), ('Emily Miller'), ('Joseph Anderson'), ('Joseph Rodriguez'), ('Daniel Smith'), ('Jane Garcia'), ('Jane Johnson'), ('James Brown'), ('Olivia Thomas'), ('Ava Smith'), ('Ava Martinez'), ('David Martinez'), ('Michael Gonzalez'), ('Charlotte Garcia'), ('Charlotte Brown'), ('William Lopez'), ('Michael Martinez'), ('Thomas Wilson'), ('Olivia Jackson'), ('Isabella Gonzalez'), ('Joseph Thomas'), ('Isabella Anderson'), ('Emily Smith'), ('Chris Taylor'), ('Ava Jackson'), ('Robert Martinez'), ('Emily Martinez'), ('Michael Taylor'), ('Mia Gonzalez'), ('David Thomas'), ('Chris Brown'), ('Charlotte Garcia'), ('Daniel Jones'), ('Emma Smith'), ('Thomas Miller'), ('Thomas Davis'), ('Robert Miller'), ('Sophia Davis'), ('Chris Hernandez'), ('Amelia Martinez'), ('Thomas Gonzalez'), ('David Martinez'), ('Joseph Davis'), ('William Miller'), ('Sophia Taylor'), ('Robert Miller');

CREATE TABLE IF NOT EXISTS seats (
    id SERIAL PRIMARY KEY,
    user_id INTEGER DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Total 60 entries
INSERT INTO seats(user_id) 
SELECT NULL
FROM generate_series(1, 60);

SELECT count(*) FROM seats;