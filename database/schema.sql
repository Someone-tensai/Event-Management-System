CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username text UNIQUE NOT NULL,
    email text UNIQUE NOT NULL,
    password text NOT NULL,
    profile_pic text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Clubs(
    club_id SERIAL PRIMARY KEY,
    club_name text UNIQUE NOT NULL,
    creator_id int NOT NULL,
    logo text,
    cover_image text,
    FOREIGN KEY(creator_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE UserClub(
    user_id int,
    club_id int,
    PRIMARY KEY(user_id, club_id),
    FOREIGN KEY(user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY(club_id) REFERENCES Clubs(club_id) ON DELETE CASCADE
);

CREATE TABLE Events (
    event_id SERIAL PRIMARY KEY,
    club_id int NOT NULL,
    title text NOT NULL,
    description text,
    date_time TIMESTAMP NOT NULL,
    type text CHECK(type IN ('physical', 'online', 'hybrid')),
    category text CHECK(category IN ('academic', 'cultural', 'workshop', 'sport')),
    venue text NOT NULL,
    UNIQUE(date_time,venue),
    total_seats int CHECK(total_seats > 0),
    available_seats int CHECK(available_seats >=0  AND available_seats <= total_seats),
    price int CHECK(price >= 0),
    refund_policy text,
    agenda text,
    FOREIGN KEY(club_id) REFERENCES Clubs(club_id) ON DELETE CASCADE
);

CREATE TABLE Bookings(
    booking_id SERIAL PRIMARY KEY,
    user_id int NOT NULL,
    event_id int NOT NULL,
    UNIQUE(user_id, event_id),
    tickets_booked int CHECK(tickets_booked > 0),
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status text CHECK(status IN ('pending', 'confirmed', 'cancelled')) DEFAULT 'pending',
    payment_proof text,
    qr_code text,
    FOREIGN KEY(user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY(event_id) REFERENCES Events(event_id) ON DELETE CASCADE
);

CREATE TABLE Payments(
    payment_id SERIAL PRIMARY KEY,
    booking_id int NOT NULL UNIQUE,
    amount int CHECK(amount >= 0),
    payment_status text CHECK(payment_status IN ('pending', 'verified')) DEFAULT 'pending',
    payment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(booking_id) REFERENCES Bookings(booking_id)
);

CREATE TABLE Invites(
	user_id int,
	club_id int,
	PRIMARY KEY(user_id, club_id),
	expiry_date date DEFAULT (CURRENT_DATE + 5),
	FOREIGN KEY(user_id) REFERENCES Users(user_id)
	ON DELETE CASCADE,
	
	FOREIGN KEY(club_id) REFERENCES Clubs(club_id)
	ON DELETE CASCADE
);

