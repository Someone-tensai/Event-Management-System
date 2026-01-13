-- A starting database to test stuff during development

INSERT INTO Users (username, email, password)
VALUES
  ('alice', 'alice@mail.com', 'pw_alice'),
  ('bob', 'bob@mail.com', 'pw_bob'),
  ('charlie', 'charlie@mail.com', 'pw_charlie');

INSERT INTO Clubs (club_name, creator_id)
VALUES
  (
    'AI Club',
    (SELECT user_id FROM Users WHERE email = 'alice@mail.com')
  ),
  (
    'Dev Club',
    (SELECT user_id FROM Users WHERE email = 'bob@mail.com')
  );

INSERT INTO Events (
  club_id, title, description, date_time, venue, total_seats, price
)
VALUES
(
  (SELECT club_id FROM Clubs WHERE club_name = 'AI Club'),
  'AI Workshop',
  'Intro to ML',
  '2026-02-01 10:00:00',
  'Auditorium A',
  50,
  500
);

INSERT INTO UserClub (user_id, club_id)
VALUES
  (
    (SELECT user_id FROM Users WHERE email = 'alice@mail.com'),
    (SELECT club_id FROM Clubs WHERE club_name = 'AI Club')
  ),
  (
    (SELECT user_id FROM Users WHERE email = 'bob@mail.com'),
    (SELECT club_id FROM Clubs WHERE club_name = 'AI Club')
  ),
  (
    (SELECT user_id FROM Users WHERE email = 'bob@mail.com'),
    (SELECT club_id FROM Clubs WHERE club_name = 'Dev Club')
  ),
  (
    (SELECT user_id FROM Users WHERE email = 'charlie@mail.com'),
    (SELECT club_id FROM Clubs WHERE club_name = 'Dev Club')
  );

INSERT INTO Bookings (
  user_id,
  event_id,
  tickets_booked,
  status
)
VALUES
(
  (SELECT user_id FROM Users WHERE email = 'alice@mail.com'),
  (SELECT event_id FROM Events WHERE title = 'AI Workshop'),
  2,
  'Confirmed'
),
(
  (SELECT user_id FROM Users WHERE email = 'bob@mail.com'),
  (SELECT event_id FROM Events WHERE title = 'AI Workshop'),
  1,
  'Pending'
);

INSERT INTO Payments (
  booking_id,
  amount,
  payment_status
)
VALUES
(
  (
    SELECT booking_id
    FROM Bookings b
    JOIN Users u ON b.user_id = u.user_id
    JOIN Events e ON b.event_id = e.event_id
    WHERE u.email = 'alice@mail.com'
      AND e.title = 'AI Workshop'
  ),
  1000,
  'Verified'
);