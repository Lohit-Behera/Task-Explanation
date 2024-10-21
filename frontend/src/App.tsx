import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1 className="text-3xl text-center font-bold">New Project</h1>
    </ThemeProvider>
  );
}

export default App;
