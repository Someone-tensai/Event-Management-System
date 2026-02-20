import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./lib/theme-context";
import { AuthProvider } from "./lib/auth-context";
import { Toaster } from "sonner@2.0.3";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </ThemeProvider>
  );
}
