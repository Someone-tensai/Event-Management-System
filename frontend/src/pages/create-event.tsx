import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { ChevronLeft, ChevronRight, Upload, AlertCircle } from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { toast } from "../lib/toast";
import api from "../lib/api";

type EventType = "physical" | "online" | "hybrid";
type EventCategory = "academic" | "cultural" | "sports";

interface EventFormData {
  title: string;
  type: EventType;
  category: EventCategory;
  description: string;
  banner: string | null;
  date: string;
  due_date: string;
  time: string;
  venue: string;
  totalSeats: string;
  price: string;
  isFree: boolean;
  club_id: string | undefined;
  refundPolicy: string;
  qr_code: string;
}

export function CreateEventPage() {
  const { user, isClubMember } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [venueConflict, setVenueConflict] = useState(false);
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
    club_id: user?.adminClubs[0].club_id,
    refundPolicy: "Full refund available up to 48 hours before the event",
    qr_code: "",
  });

  // Check if user is club member
  if (!user || !isClubMember) {
    return (
      <div className="max-w-screen-2xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-4">
          <AlertCircle className="size-8 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You must be a member of a club to create events
        </p>
        <Link
          to="/clubs"
          className="inline-flex px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Explore Clubs
        </Link>
      </div>
    );
  }

  const updateField = (field: keyof EventFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const checkVenueAvailability = () => {
    // Mock venue conflict check
    const conflictingVenues = ["Main Auditorium", "Theater Hall"];
    const hasConflict =
      conflictingVenues.includes(formData.venue) &&
      formData.date === "2026-02-05";
    setVenueConflict(hasConflict);

    if (hasConflict) {
      toast.error("Venue conflict detected for selected date and time");
    } else {
      toast.success("Venue is available!");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await api.post("/events/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      throw err;
    }
    toast.success("Event created successfully!");
    navigate("/events");
  };

  const canProceed = () => {
    if (step === 1) {
      return formData.title && formData.description;
    } else if (step === 2) {
      return formData.date && formData.time && formData.venue && !venueConflict;
    } else if (step === 3) {
      return formData.totalSeats && (formData.isFree || formData.price);
    }
    return true;
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Link
        to="/profile/clubs"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6"
      >
        <ChevronLeft className="size-4" />
        Back
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Create New Event
      </h1>

      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {["Basics", "Logistics", "Tickets", "Review"].map((label, index) => {
            const stepNumber = index + 1;
            const isActive = step === stepNumber;
            const isCompleted = step > stepNumber;

            return (
              <div key={label} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                      isCompleted
                        ? "bg-green-600 text-white"
                        : isActive
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {isCompleted ? "✓" : stepNumber}
                  </div>
                  <div
                    className={`mt-2 text-sm font-medium ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {label}
                  </div>
                </div>
                {index < 3 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      isCompleted
                        ? "bg-green-600"
                        : "bg-gray-200 dark:bg-gray-800"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-8">
        {/* Step 1: Basics */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Event Basics
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Event Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="e.g., Tech Fest 2026"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Event Type *
              </label>
              <div className="flex gap-4">
                {(["physical", "online", "hybrid"] as EventType[]).map(
                  (type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="type"
                        checked={formData.type === type}
                        onChange={() => updateField("type", type)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300 capitalize">
                        {type}
                      </span>
                    </label>
                  ),
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Event Category *
              </label>
              <div className="flex gap-4">
                {(["academic", "cultural", "sports"] as EventCategory[]).map(
                  (category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={formData.category === category}
                        onChange={() => updateField("category", category)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300 capitalize">
                        {category}
                      </span>
                    </label>
                  ),
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={6}
                placeholder="Describe your event..."
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Event Banner
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                <Upload className="size-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                  Drop your banner here, or{" "}
                  <label
                    htmlFor="banner-upload"
                    className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
                  >
                    browse
                  </label>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Recommended: 1200x675px
                </p>
                <input
                  id="banner-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    updateField("banner", e.target.files?.[0]);
                  }}
                />
              </div>
              {formData.banner && (
                <img
                  src={URL.createObjectURL(formData.banner as any)}
                  className="mt-3 w-24 h-24 rounded-full object-cover"
                />
              )}
            </div>
          </div>
        )}

        {/* Step 2: Logistics */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Event Logistics
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Application Due Date *
                </label>
                <input
                  type="date"
                  max={formData.date}
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.due_date}
                  onChange={(e) => updateField("due_date", e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => updateField("time", e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Venue *
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.venue}
                  onChange={(e) => updateField("venue", e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                >
                  <option value="">Select a venue</option>
                  <option value="Main Auditorium">Main Auditorium</option>
                  <option value="Theater Hall">Theater Hall</option>
                  <option value="Sports Complex">Sports Complex</option>
                  <option value="Room 301">Room 301</option>
                  <option value="Open Air Theater">Open Air Theater</option>
                </select>
                <button
                  onClick={checkVenueAvailability}
                  disabled={!formData.venue || !formData.date || !formData.time}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    formData.venue && formData.date && formData.time
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Check Availability
                </button>
              </div>
              {venueConflict && (
                <div className="mt-2 flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertCircle className="size-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Venue conflict detected! Please choose a different date or
                    venue.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Tickets */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Ticketing
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Total Seats *
              </label>
              <input
                type="number"
                value={formData.totalSeats}
                min={1}
                onChange={(e) => updateField("totalSeats", e.target.value)}
                placeholder="e.g., 100"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={formData.isFree}
                  onChange={(e) => updateField("isFree", e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Free Event
                </span>
              </label>

              {!formData.isFree && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Ticket Price (USD) *
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={formData.price}
                      onChange={(e) => {
                        if (parseInt(e.target.value) > 0)
                          updateField("price", parseInt(e.target.value));
                      }}
                      placeholder="e.g., 10"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2 mt-2">
                      Event QR Code
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                      <Upload className="size-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                        Drop The QR Code here, or{" "}
                        <label
                          htmlFor="banner-upload"
                          className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
                        >
                          browse
                        </label>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        Recommended: 1200x675px
                      </p>
                      <input
                        id="banner-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          updateField("qr_code", e.target.files?.[0]);
                        }}
                      />
                    </div>
                    {formData.qr_code && (
                      <img
                        src={URL.createObjectURL(formData.qr_code as any)}
                        className="mt-3 w-24 h-24 rounded-full object-cover"
                      />
                    )}
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Refund Policy
              </label>
              <textarea
                value={formData.refundPolicy}
                onChange={(e) => updateField("refundPolicy", e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Review & Submit
            </h2>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Event Title
                </div>
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {formData.title}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Type
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white capitalize">
                    {formData.type}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Venue
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formData.venue}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Date & Time
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formData.date} at {formData.time}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Capacity
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formData.totalSeats} seats
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Price
                </div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {formData.isFree ? "Free" : `$${formData.price}`}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Description
                </div>
                <div className="flex flex-wrap text-gray-900 dark:text-white whitespace-pre-line">
                  {formData.description}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className={`px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2 ${
              step === 1
                ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                : "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            <ChevronLeft className="size-4" />
            Previous
          </button>

          {step < 4 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className={`px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2 ${
                canProceed()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
              }`}
            >
              Next
              <ChevronRight className="size-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
