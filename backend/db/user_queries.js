const user_router = require("../routes/users.js");
const pool = require("./pool.js");

const findByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM Users WHERE email=$1", [
    email.toLowerCase(),
  ]);
  return result.rows[0] || null;
};

const find_by_id = async (user_id) => {
  const result = await pool.query(
    "SELECT user_id,username,email,created_at FROM Users WHERE user_id=$1",
    [user_id],
  );
  return result.rows[0] || null;
};

async function query_find_by_username(username) {
  const { rows } = await pool.query(
    `
        SELECT * FROM Users WHERE username = $1
        `,
    [username],
  );
  return rows[0];
}
async function query_register_user(user_data) {
  try {
    const { rows } = await pool.query(
      `
        INSERT INTO Users (username, email, password, profile_pic) 
        VALUES($1, $2, $3, $4)
        `,
      [user_data[0], user_data[1], user_data[2], user_data[3]],
    );
  } catch (err) {
    throw err;
  }
}

async function query_get_all_users() {
  try {
    const { rows } = await pool.query(
      `
            SELECT * FROM Users
            `,
    );
    return rows;
  } catch (err) {
    throw err;
  }
}

async function query_get_users_club(user_id) {
  try {
    const { rows } = await pool.query(
      `
            SELECT c.* FROM Clubs c LEFT JOIN
            UserClub u ON u.club_id = c.club_id LEFT JOIN
            Users us ON us.user_id = u.user_id
            WHERE u.user_id = $1
            `,
      [user_id],
    );
    return rows;
  } catch (err) {
    throw err;
  }
}

async function query_get_users_admin_club(user_id) {
  try {
    const { rows } = await pool.query(
      `
            SELECT * FROM Clubs
            WHERE creator_id = $1
            `,
      [user_id],
    );
    return rows;
  } catch (err) {
    throw err;
  }
}

async function query_update_user_info(
  new_name,
  new_email,
  new_profile_pic,
  user_id,
) {
  try {
    const { rows } = await pool.query(
      `
            UPDATE Users SET username = $1, email = $2, profile_pic = $3
            WHERE user_id = $4
            `,
      [new_name, new_email, new_profile_pic, user_id],
    );
  } catch (err) {
    throw err;
  }
}
module.exports = {
  query_register_user,
  query_find_by_username,
  query_get_all_users,
  find_by_id,
  query_get_users_club,
  query_get_users_admin_club,
  query_update_user_info,
};
