import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { BallTriangle } from 'react-loader-spinner';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';

const LazyHome = lazy(() => import('./pages/Home'));
const LazyProjectDetail = lazy(() => import('./pages/ProjectDetail'));

const AppContent = () => {
  const [activeComponent, setActiveComponent] = useState("Project");  // Default ke "Project"
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMenuItemClick = useCallback((component) => {
    setLoading(true);
    setTimeout(() => {
      setActiveComponent(component);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  // Reset activeComponent to "Project" when navigating to the home page
  const location = useLocation();
  useEffect(() => {
    console.log("Current location:", location.pathname);
    if (location.pathname === '/') {
      setActiveComponent("Project");
    }
  }, [location]);

  return (
    <div className="flex h-screen">
      <SideBar onMenuItemClick={handleMenuItemClick} />
      <div className="flex-1 flex flex-col h-full">
        <Header handleSearch={handleSearch} />
        <div className="flex-1 p-4 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <BallTriangle height={100} width={100} color="Blue" ariaLabel="Loading" />
            </div>
          ) : (
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <BallTriangle height={100} width={100} color="Blue" ariaLabel="Loading" />
              </div>
            }>
              <Routes>
                <Route path="/" element={<LazyHome activeComponent={activeComponent} searchQuery={searchQuery} />} />
                <Route path="/project/:slug" element={<LazyProjectDetail />} />
              </Routes>
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
