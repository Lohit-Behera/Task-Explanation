import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./components/Header";
import { ErrorBoundary } from "react-error-boundary";
import SomethingWentWrong from "./pages/Error/SomethingWentWrong";

function Layout() {
  return (
    <div className="min-h-[100vh]">
      <Header />
      <ErrorBoundary fallback={<SomethingWentWrong />}>
        <main className="overflow-x-hidden">
          <ScrollRestoration />
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
}

export default Layout;
