import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { ChevronLeft, ChevronRight, Upload, AlertCircle } from "lucide-react";
import { useAuth } from "../../lib/auth-context";
import { toast } from "../../lib/toast";
import api from "../../lib/api";

type EventType = "physical" | "online" | "hybrid";
type EventCategory = "academic" | "cultural" | "sports";

interface EventFormData {
  title: string;
  type: EventType;
  category: EventCategory;
  description: string;
  banner: any;
  date: string;
  due_date: string;
  time: string;
  venue: string;
  totalSeats: string;
  price: string;
  isFree: boolean;
  club_id: string | undefined;
  refundPolicy: string;
}

export function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isClubMember } = useAuth();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    type: "physical",
    category: "academic",
    description: "",
    banner: "",
    date: "",
    due_date: "",
    time: "",
    venue: "",
    totalSeats: "",
    price: "",
    isFree: true,
    club_id: user?.adminClubs[0]?.club_id,
    refundPolicy: "",
  });

  // 🚀 Fetch existing event
  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await api.get(`/events/${id}`);
        const event = res.data;

        setFormData({
          title: event.title,
          type: event.type,
          category: event.category,
          description: event.description,
          banner: event.image,
          date: event.date,
          due_date: event.due_date,
          time: event.time,
          venue: event.venue,
          totalSeats: event.totalSeats.toString(),
          price: event.price.toString(),
          isFree: event.price === 0,
          club_id: event.club.club_id,
          refundPolicy: event.refundPolicy,
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load event");
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, []);

  if (!user || !isClubMember) {
    return <div>Access Denied</div>;
  }

  if (loading) return <div>Loading...</div>;

  const updateField = (field: keyof EventFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value as any);
      });

      await api.put(`/events/${id}`, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Event updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 text-gray-900 dark:text-white">

  <Link
    to="/profile/clubs"
    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition"
  >
    <ChevronLeft className="size-4" />
    Back
  </Link>

  <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
    Edit Event
  </h1>

  <form
    onSubmit={handleSubmit}
    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-8 space-y-6"
  >
    {/* Title */}
    <div>
      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
        Event Title
      </label>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => updateField("title", e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                   bg-white dark:bg-gray-800 
                   text-gray-900 dark:text-white 
                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    {/* Category */}
    <div>
      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
        Category
      </label>
      <select
        value={formData.category}
        onChange={(e) => updateField("category", e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                   bg-white dark:bg-gray-800 
                   text-gray-900 dark:text-white 
                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="academic">Academic</option>
        <option value="cultural">Cultural</option>
        <option value="sports">Sports</option>
      </select>
    </div>

    {/* Date */}
    <div className="grid grid-cols-2 gap-4">
      <input
        type="date"
        value={formData.date}
        onChange={(e) => updateField("date", e.target.value)}
        className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                   bg-white dark:bg-gray-800 
                   text-gray-900 dark:text-white 
                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        type="time"
        value={formData.time}
        onChange={(e) => updateField("time", e.target.value)}
        className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                   bg-white dark:bg-gray-800 
                   text-gray-900 dark:text-white 
                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    {/* Seats */}
    <div>
      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
        Total Seats
      </label>
      <input
        type="number"
        value={formData.totalSeats}
        onChange={(e) => updateField("totalSeats", e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                   bg-white dark:bg-gray-800 
                   text-gray-900 dark:text-white 
                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    {/* Price */}
    <div>
      <label className="flex items-center gap-2 mb-2 text-gray-700 dark:text-gray-300">
        <input
          type="checkbox"
          checked={formData.isFree}
          onChange={(e) => updateField("isFree", e.target.checked)}
        />
        Free Event
      </label>

      {!formData.isFree && (
        <input
          type="number"
          value={formData.price}
          onChange={(e) => updateField("price", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                     bg-white dark:bg-gray-800 
                     text-gray-900 dark:text-white 
                     focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      )}
    </div>

    {/* Banner */}
    <div>
      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
        Banner
      </label>
      <input
        type="file"
        onChange={(e) =>
          updateField("banner", e.target.files?.[0])
        }
        className="text-gray-700 dark:text-gray-300"
      />

      {typeof formData.banner === "string" && (
        <img
          src={formData.banner}
          className="mt-3 w-32 rounded-lg border border-gray-200 dark:border-gray-700"
        />
      )}
    </div>

    <button
      type="submit"
      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
    >
      Update Event
    </button>
  </form>
</div>

  );
}
