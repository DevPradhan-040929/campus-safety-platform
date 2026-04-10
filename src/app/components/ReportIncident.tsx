import { ArrowLeft, Calendar, MapPin, Shield, Upload } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { apiFetch } from "../api";

export function ReportIncident() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    category: "",
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiFetch('/incidents', {
        method: 'POST',
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          location: formData.location
        }),
      });
      alert("Incident report submitted successfully!");
      navigate("/track");
    } catch (error: any) {
      alert("Failed to submit request: " + error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-gray-900">Report Incident</h2>
            </div>
          </div>
        </div>
      </header>

      {/* Form Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-gray-900 mb-2">Submit Incident Report</h1>
            <p className="text-gray-600">Please provide detailed information about the incident</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-gray-700 mb-2">
                Incident Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                <option value="theft">Theft</option>
                <option value="vandalism">Vandalism</option>
                <option value="suspicious">Suspicious Activity</option>
                <option value="safety-hazard">Safety Hazard</option>
                <option value="harassment">Harassment</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-gray-700 mb-2">
                Incident Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Brief description of the incident"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-gray-700 mb-2">
                Detailed Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed description of what happened..."
                rows={5}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="Building name, room number, or area"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-gray-700 mb-2">
                  Time
                </label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-gray-700 mb-2">
                <Upload className="w-4 h-4 inline mr-1" />
                Attach Photos or Documents (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">
                  Click to upload or drag and drop
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  PNG, JPG, PDF up to 10MB
                </p>
              </div>
            </div>

            {/* Anonymous Option */}
            <div className="bg-gray-50 rounded-xl p-4">
              <label className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 rounded" />
                <div>
                  <span className="text-gray-900 block">Submit anonymously</span>
                  <span className="text-gray-600 text-sm">Your identity will be kept confidential</span>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-4 rounded-xl hover:bg-red-700 transition-colors"
            >
              Submit Report
            </button>
          </form>
        </div>

        {/* Emergency Notice */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            For immediate emergencies, call <strong>911</strong> or Campus Security <strong>(555) 123-4567</strong>
          </p>
        </div>
      </main>
    </div>
  );
}
