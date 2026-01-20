CREATE DATABASE Event_Management_System;

CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username text NOT NULL,
    email text UNIQUE NOT NULL,
    password text NOT NULL,
    profile_pic text,
    created_at date DEFAULT CURRENT_DATE
);

CREATE TABLE Clubs(
    club_id SERIAL PRIMARY KEY,
    club_name text UNIQUE NOT NULL,
    creator_id int NOT NULL,
    FOREIGN KEY(creator_id) REFERENCES Users(user_id)
);

CREATE TABLE UserClub(
    user_id int,
    club_id int,
    PRIMARY KEY(user_id, club_id),
    FOREIGN KEY(user_id) REFERENCES Users(user_id),
    FOREIGN KEY(club_id) REFERENCES Clubs(club_id)
);

CREATE TABLE Events (
    SERIAL PRIMARY KEY,
    club_id int NOT NULL,
    title text NOT NULL,
    description text,
    date_time TIMESTAMP NOT NULL,
    venue text NOT NULL,
    UNIQUE(date_time,venue),
    total_seats int CHECK(total_seats > 0),
    price int CHECK(price >= 0),
    FOREIGN KEY(club_id) REFERENCES Clubs(club_id)
);

CREATE TABLE Bookings(
    booking_id SERIAL PRIMARY KEY,
    user_id int NOT NULL,
    event_id int NOT NULL,
    tickets_booked int CHECK(tickets_booked > 0),
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status text CHECK(status IN ('Pending', 'Confirmed')),
    FOREIGN KEY(user_id) REFERENCES Users(user_id),
    FOREIGN KEY(event_id) REFERENCES Events(event_id)
);

CREATE TABLE Payments(
    payment_id SERIAL PRIMARY KEY,
    booking_id int NOT NULL UNIQUE,
    amount int CHECK(amount >= 0),
    payment_status text CHECK(payment_status IN ('Pending', 'Verified')),
    payment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(booking_id) REFERENCES Bookings(booking_id)
);

ALTER TABLE Events  
ADD COLUMN category text
CHECK(category IN ('Academic', 'Cultural', 'Sports','Club'));

ALTER TABLE Events
ADD COLUMN due_date date NOT NULL 
DEFAULT (CURRENT_DATE + INTERVAL '5 days');
