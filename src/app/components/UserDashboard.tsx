import { AlertCircle, Bell, ClipboardList, FileText, LogOut, Shield } from "lucide-react";
import { useNavigate } from "react-router";

export function UserDashboard() {
  const navigate = useNavigate();

  const dashboardCards = [
    {
      title: "Report Incident",
      description: "Submit a new safety incident report",
      icon: FileText,
      color: "bg-red-500",
      route: "/report",
    },
    {
      title: "Track Incidents",
      description: "View status of your reported incidents",
      icon: ClipboardList,
      color: "bg-blue-500",
      route: "/track",
    },
    {
      title: "Notifications",
      description: "View safety alerts and updates",
      icon: Bell,
      color: "bg-amber-500",
      route: "/notifications",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-gray-900">Campus Safety</h2>
                <p className="text-sm text-gray-600">Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Welcome Back, {(() => {
            try { return JSON.parse(localStorage.getItem('user') || '{}').name || 'Student'; }
            catch(err) { return 'Student'; }
          })()}</h1>
          <p className="text-gray-600">Manage your safety reports and stay informed</p>
        </div>

        {/* Emergency Alert Banner */}
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-8 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-red-900">Emergency Hotline</h3>
            <p className="text-red-700 text-sm mt-1">
              For immediate assistance, call Campus Security: <strong>911</strong> or <strong>(555) 123-4567</strong>
            </p>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.title}
                onClick={() => navigate(card.route)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 text-left border border-gray-200"
              >
                <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.description}</p>
              </button>
            );
          })}
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { text: "Incident #1234 status updated to In Progress", time: "2 hours ago" },
              { text: "New safety alert: Campus lighting upgrade scheduled", time: "1 day ago" },
              { text: "Incident #1233 has been resolved", time: "3 days ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-gray-900 text-sm">{activity.text}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
