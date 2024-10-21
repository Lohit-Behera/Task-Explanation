import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./components/Header";

function Layout() {
  return (
    <div className="min-h-[100vh]">
      <Header />
      <main className="overflow-x-hidden">
        <ScrollRestoration />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
