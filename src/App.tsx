import { useEffect, useState } from "react";
import ErrorMessage from "./components/ErrorMsg";
import { usePrayerStore } from "./store/store.prayer";
import LocationHeader from "./components/Header";
import BottomNav from "./components/Bottom-Nav";
import HomeSkeleton from "./skeletons/Home-Skeleton";
import Hero from "./components/Hero";

function App() {
  const [isMobile, setIsMobile] = useState<boolean>(true);

  const {
    isLoading,
    error,
    location,
    prayerTimes,
    fetchLocation,
    fetchPrayerTimes,
  } = usePrayerStore();

  useEffect(() => {
    // Detect screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await fetchLocation();
      } catch (error) {
        console.error("Failed to initialize app:", error);
      }
    };

    initializeApp();
  }, [fetchLocation]);

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      fetchPrayerTimes(location.latitude, location.longitude);
    }
  }, [location, fetchPrayerTimes]);

  //message if not mobile
  if (!isMobile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
        <div className="bg-white border border-red-400 text-red-600 p-6 rounded-xl shadow-md max-w-md">
          <h2 className="text-xl font-semibold mb-2">Unsupported Screen</h2>
          <p>This app is designed for mobile devices only.</p>
          <p className="text-sm text-gray-500 mt-2">
            Please open on a phone or reduce your browser width.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="block bg-white min-h-screen max-w-sm mx-auto shadow-md border border-gray-200">
      {isLoading ? (
        <HomeSkeleton />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : !prayerTimes ? (
        <ErrorMessage message="No prayer times available" />
      ) : (
        <>
          <LocationHeader />
          <Hero prayerTimes={prayerTimes} />
          <BottomNav />
        </>
      )}
    </div>
  );
}

export default App;
