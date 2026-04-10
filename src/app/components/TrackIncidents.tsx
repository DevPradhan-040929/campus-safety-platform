import { ArrowLeft, Calendar, MapPin, Shield, Clock } from "lucide-react";
import { useNavigate } from "react-router";

interface Incident {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  status: "pending" | "in-progress" | "resolved";
  description: string;
}

import { useEffect, useState } from "react";
import { apiFetch } from "../api";

export function TrackIncidents() {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/incidents")
      .then((data) => {
        setIncidents(data.map((i: any) => ({
          id: i._id,
          title: i.title,
          category: i.category || 'Other',
          location: i.location,
          date: new Date(i.createdAt).toLocaleDateString(),
          status: i.status === "In Progress" ? "in-progress" : i.status.toLowerCase(),
          description: i.description
        })));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status: Incident["status"]) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "resolved":
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const getStatusText = (status: Incident["status"]) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "in-progress":
        return "In Progress";
      case "resolved":
        return "Resolved";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-gray-900">Track Incidents</h2>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Your Incident Reports</h1>
          <p className="text-gray-600">Track the status of your submitted reports</p>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["All", "Pending", "In Progress", "Resolved"].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                filter === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Incidents List */}
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <h3 className="text-gray-900">{incident.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{incident.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">ID:</span>
                      <span className="font-mono">#{incident.id}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {incident.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {incident.date}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(
                      incident.status
                    )}`}
                  >
                    {getStatusText(incident.status)}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {incident.category}
                  </span>
                </div>
              </div>

              {/* Progress Timeline */}
              {incident.status !== "pending" && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>
                      {incident.status === "in-progress"
                        ? "Under investigation by campus security"
                        : "Case closed - Resolution confirmed"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State (if no incidents) */}
        {incidents.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No Incidents Reported</h3>
            <p className="text-gray-600 mb-6">You haven't submitted any incident reports yet</p>
            <button
              onClick={() => navigate("/report")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Report an Incident
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
