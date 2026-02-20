const {
  query_all_events,
  query_event_with_id,
  query_create_new_event,
  query_edit_event,
  query_delete_event,
} = require("../db/event_queries");
const { supabase } = require("../db/supabaseClient");
const App_Error = require("../errors/app_error");
const app_error = require("../errors/app_error");
async function get_all_events(req, res, next) {
  try {
    const { sort_by, type } = req.query;
    if (sort_by && !["date", "price"].includes(sort_by)) {
      next(
        new app_error(
          "Invalid sort_by Value",
          400,
          "INVALID_QUERY_PARAM",
          true,
        ),
      );
      return;
    }
    const events = await query_all_events(sort_by, type);
    const formatted = events.map((event) => {
      return {
        id: event.event_id,
        title: event.title,
        date: event.event_date.toISOString().split("T")[0],
        time: event.time,
        type: event.type?.toLowerCase() || "physical",
        price: event.price,
        venue: event.venue,
        category: event.category,
        image: event.banner,
        qr_code: event.qr_code,
        totalSeats: event.total_seats,
        availableSeats: event.available_seats,
        club: {
          club_id: event.club_id,
          club_name: event.club_name,
          logo: event.logo,
        },
      };
    });
    res.json(formatted);
  } catch (err) {
    if (err.code === "22P02") {
      next(
        new app_error(
          "Invalid Query Parameter Format",
          400,
          "INVALID_INPUT",
          true,
          err.message,
        ),
      );
    }
    throw err;
  }
}

async function get_event_with_id(req, res, next) {
  try {
    const id = req.params.event_id;
    const event = await query_event_with_id(id);
    if (event.length === 0)
      next(new app_error("Event not Found", 404, "EVENT_NOT_FOUND"));

    const formatted = {
      id: event.event_id,
      title: event.title,
      date: event.event_date.toISOString().split("T")[0],
      time: event.time,
      type: event.type?.toLowerCase() || "physical",
      price: event.price,
      venue: event.venue,
      category: event.category,
      image: event.banner,
      qr_code: event.qr_code,
      totalSeats: event.total_seats,
      availableSeats: event.available_seats, // replace with real calculation later
      club: {
        club_id: event.club_id,
        club_name: event.club_name,
        logo: event.logo,
      },
    };
    res.json(formatted);
  } catch (err) {
    if (err.code === "22P02") {
      next(new app_error("Event ID must be a number", 400, "INVALID_EVENT_ID"));
    }

    next(new app_error("Database Fetch Failed", 500, "DB_FETCH_FAILED"));
  }
}

async function create_new_event(req, res) {
  try {
    const {
      club_id,
      title,
      description,
      date,
      time,
      venue,
      totalSeats,
      price,
      type,
      category,
      due_date,
      refund_policy,
      agenda,
    } = req.body;

    const banner_file = req.files?.["banner"]?.[0];
    if (!banner_file) {
      return res.status(400).json({ error: "Banner is Required" });
    }
    const { data: banner_data, error: banner_error } = await supabase.storage
      .from("Assets") // <-- bucket name here
      .upload(
        `banners/${Date.now()}-${banner_file.originalname}`,
        banner_file.buffer,
      );

    if (banner_error) throw banner_error;

    const banner_url = supabase.storage
      .from("Assets")
      .getPublicUrl(banner_data.path).data.publicUrl;

    const qr_file = req.files?.["qr_code"]?.[0];
    if (!qr_file) {
      return res.status(400).json({ error: "QR COde is Required" });
    }
    const { data: qr_data, error: qr_error } = await supabase.storage
      .from("Assets") // <-- bucket name here
      .upload(`banners/${Date.now()}-${qr_file.originalname}`, qr_file.buffer);

    if (qr_error) throw banner_error;

    const qr_url = supabase.storage.from("Assets").getPublicUrl(qr_data.path)
      .data.publicUrl;

    await query_create_new_event(
      club_id,
      title,
      description,
      date,
      time,
      venue,
      totalSeats,
      price,
      type,
      due_date,
      category,
      refund_policy,
      agenda,
      banner_url,
      qr_url,
    );
    res.json("Response: Event Added");
  } catch (err) {
    if (err.code === "23503") {
      next(new app_error("Invalid Club ID", 400, "INVALID_CLUB_ID"));
    }
    throw err;
  }
}

async function edit_event(req, res) {
  try {
    const {
      club_id,
      title,
      description,
      date,
      time,
      venue,
      totalSeats,
      price,
      type,
      category,
      due_date,
      refund_policy,
      agenda,
    } = req.body;

    const banner_file = req.files?.["banner"]?.[0];
    if (!banner_file) {
      return res.status(400).json({ error: "Banner is Required" });
    }
    const { data: banner_data, error: banner_error } = await supabase.storage
      .from("Assets") // <-- bucket name here
      .upload(
        `banners/${Date.now()}-${banner_file.originalname}`,
        banner_file.buffer,
      );

    if (banner_error) throw banner_error;

    const banner_url = supabase.storage
      .from("Assets")
      .getPublicUrl(banner_data.path).data.publicUrl;
    await query_edit_event(
      event_id,
      title,
      description,
      date_time,
      venue,
      total_seats,
      price,
      category,
      due_date,
    );
    res.json("Response: Event Edited");
  } catch (err) {
    throw err;
  }
}

async function delete_event(req, res, next) {
  try {
    const id = req.params.event_id;

    const event = await query_event_with_id(id);
    console.log(event);
    if (!event) {
      return res.status(404).json({ message: "Event Not Found" });
    }

    if (event.available_seats < event.total_seats) {
      next(
        new App_Error(
          "Tickets Already Booked",
          400,
          "CANNOT_DELETE_EVENT_TICKETS_ALREADY_BOOKED",
        ),
      );
      return;
    }

    const { confirm } = req.body;

    if (!confirm) {
      next(
        new App_Error(
          "Deletion Not Confirmed",
          400,
          "CANNOT_DELETE_EVENT_NOT_CONFIRMED",
        ),
      );
      return;
    }
    await query_delete_event(id);
    res.json("Message: Event Deleted");
  } catch (err) {
    throw err;
  }
}
module.exports = {
  get_all_events,
  get_event_with_id,
  create_new_event,
  edit_event,
  delete_event,
};
