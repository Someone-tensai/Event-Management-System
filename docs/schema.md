Users
- user_id (PK)
- username
- email (unique)
- password
- profile_pic
- created_at


Events
- event_id (PK)
- club_id (FK -> Clubs.club_id)
- title
- description
- UNIQUE(date_time, venue)
- total_seats
- price

Bookings
- booking_id (PK)
- user_id (FK -> Users.user_id)
- event_id (FK -> Events.event_id)
- tickets_booked
- booking_time
- status (Pending/Confirmed)

Payments
- payment_id (PK)
- booking_id (FK -> Bookings.booking_id)
- amount
- payment_status(Pending / Verified)
- payment_time

Clubs
- club_id (PK)
- UNIQUE(club_name)
- creator_id (FK -> Users.user_id)


UserClub
- group_id(PK)
- user_id(FK -> Users.user_id)
- club_id(FK -> Clubs.club_id)