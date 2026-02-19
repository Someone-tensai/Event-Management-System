const {
  query_club_details,
  query_get_all_clubs,
  query_disable_invite,
  query_user_in_club,
  query_user_was_invited,
  query_invite_only,
  query_club_invite,
  query_user_created_club,
  query_clubid_by_name,
  query_create_new_club,
  query_join_a_club,
  query_leave_club,
  query_get_events_of_clubs,
} = require("../db/club_queries");

const { supabase } = require("../db/supabaseClient");
const App_Error = require("../errors/app_error");
async function get_all_clubs(req, res, next) {
  try {
    const rows = await query_get_all_clubs();
    res.json(rows);
  } catch (err) {
    next(err);
  }
  return;
}

async function get_club_details(req, res, next) {
  try {
    const { club_id } = req.params;
    const rows = await query_club_details(club_id);
    res.json(rows);
  } catch (err) {
    next(err);
  }
  return;
}
async function create_new_club(req, res, next) {
  try {
    const { club_name, invite_only, description } = req.body;

    const logo_file = req.files?.["logo"]?.[0];
    const cover_image_file = req.files?.["cover_image"]?.[0];

    if (!logo_file || !cover_image_file) {
      return res
        .status(400)
        .json({ error: "Logo and Cover Image are required" });
    }
    const { data: logo_data, error: logo_error } = await supabase.storage
      .from("Assets") // <-- bucket name here
      .upload(
        `logos/${Date.now()}-${logo_file.originalname}`,
        logo_file.buffer,
      );

    if (logo_error) throw logo_error;

    const logo_url = supabase.storage
      .from("Assets")
      .getPublicUrl(logo_data.path).data.publicUrl;

    const { data: cover_image_data, error: cover_image_error } =
      await supabase.storage
        .from("Assets") // <-- bucket name here
        .upload(
          `cover_images/${Date.now()}-${cover_image_file.originalname}`,
          cover_image_file.buffer,
        );

    if (logo_error) throw logo_error;

    const cover_image_url = supabase.storage
      .from("Assets")
      .getPublicUrl(cover_image_data.path).data.publicUrl;

    if (!logo_url || !cover_image_url) {
      next(
        new App_Error(
          "Image Upload Failed",
          500,
          "IMAGE_UPLOAD_FAILED_INTERNAL_SEVER_ERROR",
        ),
      );
      return;
    }
    const creator_id = req.user.user_id;
    // Query for clubs created by the User
    const other_clubs = await query_user_created_club(creator_id);

    // If Already Created Clubs, Not valid to create more.
    if (other_clubs.length > 0) {
      next(
        new App_Error(
          "Cannot create more than one club",
          403,
          "ONLY_ONE_CLUB_VALID",
        ),
      );
      return;
    }
    // Parsing from string to boolean
    const invite = invite_only.toLowerCase() === "true";
    await query_create_new_club(
      club_name,
      creator_id,
      logo_url,
      cover_image_url,
      invite,
      description,
    );

    // Updating the UserClub Table to make the creator also a part of the relation.
    const club = await query_clubid_by_name(club_name);
    await query_join_a_club(creator_id, club.club_id);

    res.json("Message: Club Created");
  } catch (err) {
    next(err);
  }
}

async function join_a_club(req, res, next) {
  try {
    const user_id = req.user.user_id;
    const { club_id } = req.body;
    //Query if User is already in Club
    const user_already = await query_user_in_club(user_id, club_id);
    if (user_already.length > 0)
      next(new App_Error("User Already In Club", 400, "USER_ALREADY_IN_CLUB"));

    // Query if Club is Invite Only or not
    const invite_only = await query_invite_only(club_id);

    if (invite_only.length === 0)
      next(new App_Error("Club not Found", 400, "INVALID_CLUB_ID"));

    if (invite_only[0].invite_only) {
      // Check if User was Invited
      const valid_invite = await query_user_was_invited(user_id, club_id);

      if (valid_invite.length === 0)
        next(new App_Error("USER NOT INVITED", 400, "INVALID_USER_JOIN"));
      await query_join_a_club(user_id, club_id);

      // Delete the invite after a user joins
      await query_disable_invite(user_id, club_id);
      res.json("Message: Club Joined Succesfully");
      return;
    }
    await query_join_a_club(user_id, club_id);
    res.json("Message: Club Joined Succesfully");
  } catch (err) {
    next(err);
  }
}

async function club_invite(req, res, next) {
  try {
    const { user_id, club_id } = req.body;
    // Add a entry to the Invites Table for a invite
    await query_club_invite(user_id, club_id);
    res.json("Message: Invitation Successfully Sent");
  } catch (err) {
    next(err);
  }
}

async function leave_club(req, res, next) {
  try {
    const user_id = req.user.user_id;
    const { club_id } = req.body;
    await query_leave_club(user_id, club_id);
    res.json("Message: Left Club");
  } catch (err) {
    next(err);
  }
}

async function get_event_of_clubs(req, res, next) {
  try {
    const {club_id} = req.params;
    const events = await query_get_events_of_clubs(club_id);
    const formatted = events.map((event) => {
      return {
      id: event.event_id,
      title: event.title,
      date: event.event_date.toISOString().split("T")[0],
      time: event.time,
      type: event.category?.toLowerCase() || "physical",
      price: event.price,
      venue: event.venue,
      image: event.banner, 
      totalSeats: event.total_seats,
      availableSeats: event.total_seats,
    }
  });
  res.json(formatted);

  } catch (err) {
    throw err;
  }
}
module.exports = {
  get_all_clubs,
  create_new_club,
  join_a_club,
  club_invite,
  leave_club,
  get_club_details,
  get_event_of_clubs,
};
