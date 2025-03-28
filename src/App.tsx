import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";

// Lazy load components for better performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Lesson = lazy(() => import("./pages/Lesson"));
const Practice = lazy(() => import("./pages/Practice"));
const Achievements = lazy(() => import("./pages/Achievements"));
const Settings = lazy(() => import("./pages/Settings"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lesson" element={<Lesson />} />
          <Route path="/practice/:topicId" element={<Practice />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/settings" element={<Settings />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
