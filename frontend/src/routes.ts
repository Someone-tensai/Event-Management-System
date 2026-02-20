import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { EventsPage } from "./pages/events";
import { EventDetailsPage } from "./pages/event-details";
import { ClubsPage } from "./pages/clubs";
import { ClubDetailsPage } from "./pages/club-details";
import { ProfileLayout } from "./pages/profile/layout";
import { ProfilePage } from "./pages/profile/profile";
import { BookingsPage } from "./pages/profile/bookings";
import { MyClubsPage } from "./pages/profile/clubs";
import { NotificationsPage } from "./pages/profile/notifications";
import { ClubDashboardLayout } from "./pages/club-dashboard/layout";
import { DashboardOverviewPage } from "./pages/club-dashboard/overview";
import { DashboardEventsPage } from "./pages/club-dashboard/events";
import { DashboardFinancesPage } from "./pages/club-dashboard/finances";
import { DashboardMembersPage } from "./pages/club-dashboard/members";
import { CreateEventPage } from "./pages/create-event";
import { CreateClubPage } from "./pages/create-club";
import { EditEvent } from "./pages/club-dashboard/edit_event";
import DeleteEvent from "./pages/club-dashboard/delete_event";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
      { path: "events", Component: EventsPage },
      { path: "events/create", Component: CreateEventPage },
      { path: "events/edit/:id", Component: EditEvent },
      { path: "events/delete/:club_id/:event_id", Component: DeleteEvent },
      { path: "events/:id", Component: EventDetailsPage },
      { path: "clubs", Component: ClubsPage },
      { path: "clubs/create", Component: CreateClubPage },
      { path: "clubs/:id", Component: ClubDetailsPage },
      {
        path: "profile",
        Component: ProfileLayout,
        children: [
          { index: true, Component: ProfilePage },
          { path: "bookings", Component: BookingsPage },
          { path: "clubs", Component: MyClubsPage },
          { path: "notifications", Component: NotificationsPage },
        ],
      },
      {
        path: "clubs/:id/dashboard",
        Component: ClubDashboardLayout,
        children: [
          { index: true, Component: DashboardOverviewPage },
          { path: "events", Component: DashboardEventsPage },
          { path: "finances", Component: DashboardFinancesPage },
          { path: "members", Component: DashboardMembersPage },
        ],
      },
    ],
  },
]);
