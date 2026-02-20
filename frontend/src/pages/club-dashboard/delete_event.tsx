"use client";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../lib/api";

export default function DeleteEvent() {
  const { club_id, event_id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event? This action cannot be undone.",
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);
      setError("");

      const response = await api.delete(`/events/${event_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: { confirm: true, club_id: club_id },
      });

      const data = await response.data;

      if (response.status !== 200) {
        setError(data.message || "Failed to delete event.");
        setLoading(false);
        return;
      }

      // Success → redirect
      navigate("/events");
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Delete Event</h2>

      <p className="text-gray-600 mb-6 text-center">
        This will permanently delete the event.
      </p>

      {error && (
        <div className="text-red-600 text-sm mb-4 text-center">{error}</div>
      )}

      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Confirm Delete"}
        </button>
      </div>
    </div>
  );
}
