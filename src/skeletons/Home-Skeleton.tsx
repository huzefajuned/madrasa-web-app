const HomeSkeleton = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      {/* Top Header - Fixed */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md z-10">
        <div className="h-6 bg-gray-300 rounded w-32 animate-pulse" />
        <div className="h-4 bg-gray-300 rounded w-24 animate-pulse" />
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6 animate-pulse">
        {/* Prayer Cards */}
        {[...Array(2)].map((_, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-4 shadow-md ${
              idx % 2 === 0 ? "bg-blue-100" : "bg-yellow-100"
            }`}
          >
            {/* Header Row */}
            <div className="flex justify-between items-center mb-2">
              <div className="h-6 bg-gray-300 rounded w-20" />
              <div className="h-4 bg-gray-300 rounded w-16" />
            </div>

            {/* Time Info */}
            <div className="flex justify-between items-center mb-4">
              <div className="h-4 bg-gray-300 rounded w-28" />
              <div className="h-4 bg-gray-300 rounded w-24" />
            </div>

            {/* Prayer Icons & Times */}
            <div className="flex justify-between items-center mb-4">
              {[...Array(5)].map((__, i) => (
                <div key={i} className="flex flex-col items-center space-y-1">
                  <div className="h-5 w-5 bg-gray-300 rounded-full" />
                  <div className="h-3 w-10 bg-gray-300 rounded" />
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-12 bg-gray-300 rounded-full" />
          </div>
        ))}
      </main>

      {/* Bottom Navigation - Fixed */}
      <footer className="flex justify-around items-center p-3 bg-white shadow-inner z-10">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="flex flex-col items-center space-y-1">
            <div className="h-5 w-5 bg-gray-300 rounded-full animate-pulse" />
            <div className="h-2 w-8 bg-gray-300 rounded animate-pulse" />
          </div>
        ))}
      </footer>
    </div>
  );
};

export default HomeSkeleton;
