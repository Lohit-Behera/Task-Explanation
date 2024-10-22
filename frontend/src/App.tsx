import { ThemeProvider } from "@/components/theme-provider";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import CreateUser from "./pages/CreateUser";
import PageNotFound from "./pages/Error/PageNotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="*" element={<PageNotFound />} />
      <Route index element={<HomePage />} />
      <Route path="/create" element={<CreateUser />} />
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster richColors />
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
