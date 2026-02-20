const app_error = require("../errors/app_error");
const config = require("../config/config");
const { verify_token } = require("../utils/jwt");
const {
  query_user_in_club,
  query_club_creator_check,
  query_number_of_people,
} = require("../db/club_queries");
const { pool } = require("../db/pool");
const { user } = require("pg/lib/defaults");
// Checks if User is Logged in
async function is_logged_in(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    next(new app_error("No token Provided", 401, "USER_NOT_LOGGED_IN"));
  }
  try {
    req.user = verify_token(token, config.jwt.secret);
    next();
  } catch (err) {
    next(new app_error(err.message, 401, "INVALID_TOKEN"));
  }
}

// Checks if User is Eligbile to Create an Event via
async function is_eligible_to_create(req, res, next) {
  const user_id = req.user.user_id;

  // 1. Club Creator
  const { club_id } = req.body;

  const is_creator = await is_club_creator(req, res, next);
  if (!is_creator)
    next(
      new app_error(
        "User is not the creator of the Club",
        403,
        "NOT_CLUB_CREATOR",
      ),
    );

  // 2. Members Count (TODO)
  const club_members = await query_number_of_people(club_id);

  next();
}

// Checks if the user making the request for a club is in the club
async function is_from_club(req, res, next) {
  const user_id = req.user.user_id;
  const { club_id } = req.body;
  const user_in_club = await query_user_in_club(user_id, club_id);
  if (user_in_club.length === 0)
    next(new app_error("Not a Club Member", 403, "NOT_CLUB_MEMBER"));

  next();
}

async function is_club_creator(req, res, next) {
  const user_id = req.user.user_id;
  const { club_id } = req.body;
  const creator = await query_club_creator_check(user_id, club_id);
  if (creator.length === 0) {
    return false;
  }
  return true;
}

const require_admin = (req, res, next) => {
  if (req.user.user_id !== 7) {
    next(new app_error("Admin Access Required", 403, "FORBIDDEN"));
  }
  next();
};

//optional auth
const optional_auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token);

      const result = await pool.query(
        "SELECT user_id, username,email,role FROM Users WHERE user_id=$1",
        [decoded.user_id],
      );
      if (result.rows.length > 0) {
        req.user = result.rows[0];
      }
    }
    next();
  } catch (error) {
    //continue without user if token invalid
    next();
  }
};

module.exports = {
  is_logged_in,
  is_eligible_to_create,
  is_from_club,
  is_club_creator,
  require_admin,
  optional_auth,
};
