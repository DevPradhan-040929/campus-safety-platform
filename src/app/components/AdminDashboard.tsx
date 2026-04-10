import { ArrowLeft, BarChart3, Shield, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

interface AdminIncident {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  status: "pending" | "in-progress" | "resolved";
  reporter: string;
  priority: "low" | "medium" | "high";
}


import { apiFetch } from "../api";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState<AdminIncident[]>([]);

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
          reporter: i.userId?.name || 'Unknown',
          priority: "medium", // static priority for now
        })));
      })
      .catch((err) => console.error(err));
  }, []);

  const stats = {
    total: incidents.length,
    pending: incidents.filter((i) => i.status === "pending").length,
    inProgress: incidents.filter((i) => i.status === "in-progress").length,
    resolved: incidents.filter((i) => i.status === "resolved").length,
  };

  const updateStatus = async (id: string, newStatus: AdminIncident["status"]) => {
    // Optimistic update
    setIncidents(
      incidents.map((incident) =>
        incident.id === id ? { ...incident, status: newStatus } : incident
      )
    );

    // Send to backend formatting the status back to backend casing
    try {
      let backendStatus = "Pending";
      if (newStatus === "in-progress") backendStatus = "In Progress";
      if (newStatus === "resolved") backendStatus = "Resolved";

      await apiFetch(`/incidents/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: backendStatus }),
      });
    } catch (err) {
      console.error(err);
      alert("Failed to update status on server.");
    }
  };

  const getStatusColor = (status: AdminIncident["status"]) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "resolved":
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const getPriorityColor = (priority: AdminIncident["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "low":
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h2>Admin Dashboard</h2>
                  <p className="text-blue-100 text-sm">Campus Safety Management</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <BarChart3 className="w-5 h-5 text-blue-200" />
                <TrendingUp className="w-4 h-4 text-green-300" />
              </div>
              <div className="text-2xl font-semibold mb-1">{stats.total}</div>
              <div className="text-blue-100 text-sm">Total Incidents</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-5 h-5 text-amber-200" />
              </div>
              <div className="text-2xl font-semibold mb-1">{stats.pending}</div>
              <div className="text-blue-100 text-sm">Pending Review</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-5 h-5 text-blue-200" />
              </div>
              <div className="text-2xl font-semibold mb-1">{stats.inProgress}</div>
              <div className="text-blue-100 text-sm">In Progress</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-5 h-5 text-green-200" />
              </div>
              <div className="text-2xl font-semibold mb-1">{stats.resolved}</div>
              <div className="text-blue-100 text-sm">Resolved</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Incident Management</h1>
          <p className="text-gray-600">Review and update incident reports</p>
        </div>

        {/* Incidents Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-700">ID</th>
                  <th className="px-6 py-4 text-left text-gray-700">Incident</th>
                  <th className="px-6 py-4 text-left text-gray-700">Location</th>
                  <th className="px-6 py-4 text-left text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-gray-700">Reporter</th>
                  <th className="px-6 py-4 text-left text-gray-700">Priority</th>
                  <th className="px-6 py-4 text-left text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {incidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-gray-600">#{incident.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-gray-900">{incident.title}</div>
                        <div className="text-sm text-gray-500">{incident.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{incident.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{incident.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{incident.reporter}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs border uppercase ${getPriorityColor(
                          incident.priority
                        )}`}
                      >
                        {incident.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(
                          incident.status
                        )}`}
                      >
                        {incident.status === "in-progress" ? "In Progress" : incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={incident.status}
                        onChange={(e) =>
                          updateStatus(incident.id, e.target.value as AdminIncident["status"])
                        }
                        className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
