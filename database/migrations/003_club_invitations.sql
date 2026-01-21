CREATE TABLE IF NOT EXISTS ClubInvitations (
inv_id SERIAL PRIMARY KEY,
club_id INT NOT NULL,
inviter_id INT NOT NULL,
invitee_id INT NOT NULL,
invitee_email TEXT NOT NULL,
status VARCHAR(20) DEFAULT 'pending'
    CHECK (status IN ('pending','accepted', 'declined','expired')),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '7 days'),
FOREIGN KEY (club_id) REFERENCES Clubs(club_id) ON DELETE CASCADE,
FOREIGN KEY (inviter_id) REFERENCES Users(user_id),
FOREIGN KEY (invitee_id) REFERENCES Users(user_id)
);

-- prevent duplicate pending invitations
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_pending_invitation
ON ClubInvitations(club_id, invitee_email)
WHERE status = 'pending';

--index for finding user invitation

CREATE INDEX IF NOT EXISTS idx_invitations_email ON
ClubInvitations(invitee_email);

CREATE INDEX IF NOT EXISTS idx_invitation_invitee_id ON 
ClubInvitations(invitee_id);

--trigger to auto-expire old invitations after 7 days
CREATE EXTENSION IF NOT EXISTS pg_cron;
SELECT cron.schedule(
  'expire-invites',
  '0 * * * *',   -- every hour
  $$
  UPDATE ClubInvitations
  SET status = 'expired'
  WHERE status = 'pending'
    AND expires_at < NOW();
  $$
);
