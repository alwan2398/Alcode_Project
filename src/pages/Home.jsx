import { Suspense, lazy } from 'react';

const LazyProject = lazy(() => import('@/components/Project'));
const LazyContact = lazy(() => import('@/components/Contact'));


const Home = ({ activeComponent, searchQuery }) => {
  const renderComponent = () => {
    switch (activeComponent) {
      case "Project":
        console.log("Rendering Project with searchQuery:", searchQuery);
        return <LazyProject searchQuery={searchQuery} />;
      case "Contact":
        return <LazyContact />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* <WelcomeBanner/> */}
      <Suspense fallback={<div>Loading...</div>}>
        {renderComponent()}
      </Suspense>
    </div>
  );
};

export default Home;
