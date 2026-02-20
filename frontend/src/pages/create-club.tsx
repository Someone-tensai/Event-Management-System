import { use, useState } from "react";
import { useNavigate, Link } from "react-router";
import { ChevronLeft, Upload } from "lucide-react";
import api from "../lib/api";
import { toast } from "../lib/toast";
import { useAuth } from "../lib/auth-context";

export function CreateClubPage() {
  const navigate = useNavigate();

  const { refreshUser } = useAuth();
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [cover_image, setCoverImage] = useState<File | null>(null);
  const [inviteOnly, setInviteOnly] = useState<boolean>(false);
  const [description, setDescription] = useState("");

  const handleFileChange = (
    type: "logo" | "cover_image",
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0] || null;
    if (type === "logo") setLogo(file);
    if (type === "cover_image") setCoverImage(file);
  };

  const handleSubmit = async () => {
    if (!name || !logo || !cover_image) {
      toast.error("All Fields are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("club_name", name);
      formData.append("invite_only", inviteOnly as any);
      formData.append("description", description);
      if (logo) formData.append("logo", logo);
      if (cover_image) formData.append("cover_image", cover_image);

      await api.post("/clubs/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Club created successfully!");
      refreshUser();
      navigate("/clubs");
    } catch (err) {
      toast.error("Failed to create club");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <Link
        to="/clubs"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
      >
        <ChevronLeft className="size-4" />
        Back
      </Link>

      <h1 className="text-3xl font-bold mb-8">Create New Club</h1>

      <div className="bg-white dark:bg-gray-900 border rounded-lg p-8 space-y-6">
        {/* Club Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Club Name *</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g., Tech Club"
          />
        </div>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="inviteOnly"
            checked={inviteOnly}
            onChange={(e) => setInviteOnly(!inviteOnly)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="inviteOnly"
            className="text-sm font-medium text-gray-900 dark:text-white"
          >
            Invite Only
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Club Description *
          </label>
          <input
            type="text"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g., Tech Club"
          />
        </div>
        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Club Logo *</label>
          {
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer">
              <Upload className="size-8 mb-2 text-gray-400" />
              <span className="text-sm text-gray-500">
                Click to upload logo
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange("logo", e)}
              />
            </label>
          }

          {logo && (
            <img
              src={URL.createObjectURL(logo)}
              className="mt-3 w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>

        {/* Banner Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Cover Image *
          </label>
          {
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer">
              <Upload className="size-8 mb-2 text-gray-400" />
              <span className="text-sm text-gray-500">
                Click to upload Cover Image
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange("cover_image", e)}
              />
            </label>
          }

          {cover_image && (
            <img
              src={URL.createObjectURL(cover_image)}
              className="mt-3 w-full h-32 object-cover rounded-lg"
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!name || !logo || !cover_image}
          className={`w-full py-2 rounded-lg text-white ${
            name && logo && cover_image
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Create Club
        </button>
      </div>
    </div>
  );
}
