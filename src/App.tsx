import { useEffect } from "react";
import "./App.css";
import LoadingSpinner from "./components/Spinner";
import ErrorMessage from "./components/ErrorMsg";
import { usePrayerStore } from "./store/store.prayer";
import LocationHeader from "./components/Header";
import PrayerCard from "./components/Prayer";
import BottomNav from "./components/Bottom-Nav";
import { gradients, prayerNames } from "./helpers/prayerIcons";

function App() {
  const {
    isLoading,
    error,
    location,
    prayerTimes,
    fetchLocation,
    fetchPrayerTimes,
  } = usePrayerStore();

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!prayerTimes) {
    return <ErrorMessage message="No prayer times available" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <LocationHeader />

      <main className="px-4 py-6 space-y-4">
        {prayerNames.map((prayer, index) => {
          const nextPrayer = prayerNames[index + 1] || prayerNames[0]; // wrap around
          const nextPrayerTime = prayerTimes[nextPrayer];

          return (
            <PrayerCard
              key={prayer}
              prayer={prayer}
              time={prayerTimes[prayer]}
              nextPrayer={nextPrayer}
              nextPrayerTime={nextPrayerTime}
              gradient={gradients[prayer]}
              allPrayers={prayerTimes}
            />
          );
        })}

        {/* <PrayerCard
          prayer="Isha"
          time={prayerTimes.Isha}
          nextPrayer="Fajr"
          nextPrayerTime={prayerTimes.Fajr}
          gradient="from-purple-600 to-purple-800"
          allPrayers={prayerTimes}
        /> */}
      </main>
      <BottomNav />
    </div>
  );
}

export default App;
