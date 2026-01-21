--update clubs table for description and member_count
ALTER TABLE Clubs
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS member_count INT DEFAULT 1,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;


-- add role column to userClub for member/admin/Creator roles
 ALTER TABLE UserClub 
 ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'member'
    CHECK (role IN ('member', 'admin', 'creator'));

--create trigger to auto-update member_count in clubs table
CREATE OR REPLACE FUNCTION update_club_member_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE Clubs SET member_count =member_count + 1 WHERE club_id=NEW.club_id;

    ELSIF TG_OP ='DELETE' THEN
        UPDATE Clubs SET member_count = member_count -1 WHERE club_id=OLD.club_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

--create trigger for insert in userclb

DROP TRIGGER IF EXISTS trg_update_member_count ON UserClub;
CREATE TRIGGER IF EXISTS trg_update_member_count
AFTER INSERT OR DELETE ON UserClub
FOR EACH ROW EXECUTE FUNCTION update_club_member_count();

--create index for club name lookup

CREATE INDEX IF NOT EXISTS idx_userclub_user_id ON UserClub(user_id);
CREATE INDEX IF NOT EXISTS idx_userclub_club_id on UserClub(club_id);
CREATE INDEX IF NOT EXISTS idx_clubs_member_count ON Clubs(member_count);