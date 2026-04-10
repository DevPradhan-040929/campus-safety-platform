import { createBrowserRouter } from "react-router";
import { LoginScreen } from "./components/LoginScreen";
import { UserDashboard } from "./components/UserDashboard";
import { ReportIncident } from "./components/ReportIncident";
import { TrackIncidents } from "./components/TrackIncidents";
import { AdminDashboard } from "./components/AdminDashboard";
import { Notifications } from "./components/Notifications";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginScreen,
  },
  {
    path: "/dashboard",
    Component: UserDashboard,
  },
  {
    path: "/report",
    Component: ReportIncident,
  },
  {
    path: "/track",
    Component: TrackIncidents,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/notifications",
    Component: Notifications,
  },
]);
