import { create } from "zustand"
import { persist } from "zustand/middleware"
import axios from "axios"
import type { PrayerTimes, Location } from "../types/prayer"

interface PrayerState {
  prayerTimes: PrayerTimes | null
  location: Location | null
  isLoading: boolean
  error: string | null
  lastUpdated: string | null
  fetchLocation: () => Promise<void>
  fetchPrayerTimes: (latitude: number, longitude: number) => Promise<void>
  setError: (error: string) => void
  clearError: () => void
}

export const usePrayerStore = create<PrayerState>()(
  persist(
    (set) => ({
      prayerTimes: null,
      location: null,
      isLoading: false,
      error: null,
      lastUpdated: null,

      fetchLocation: async () => {
        set({ isLoading: true, error: null })

        try {
          // Try to get user's geolocation
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            if (!navigator.geolocation) {
              reject(new Error("Geolocation is not supported"))
              return
            }

            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 10000,
              enableHighAccuracy: true,
            })
          })

          const { latitude, longitude } = position.coords

          // Reverse geocode to get city and country
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
          )
          console.log("response : in store :",response )
          const address = response.data.address
          const location: Location = {
            latitude,
            longitude,
            city: address.county ||   "Select Location",
            country: address.country || "Select Location",
          }

          set({ location, isLoading: false })
        } catch (error) {
          console.error("Location error:", error)

          // Fallback to IP-based location
          try {
            const ipResponse = await axios.get("https://ipapi.co/json/")
            const location: Location = {
              latitude: ipResponse.data.latitude,
              longitude: ipResponse.data.longitude,
              city: ipResponse.data.city || "Unknown City",
              country: ipResponse.data.country_name || "Unknown Country",
            }
            set({ location, isLoading: false })
          } catch (ipError) {
            set({
              error: "Unable to detect location. Please enable location services or check your internet connection.",
              isLoading: false,
            })
          }
        }
      },

      // fetch prayare times.
      
      fetchPrayerTimes: async (latitude: number, longitude: number) => {
        set({ isLoading: true, error: null })

        try {
          const today = new Date().toISOString().split("T")[0]
          const response = await axios.get(
            `https://api.aladhan.com/v1/timings/${today}?latitude=${latitude}&longitude=${longitude}&method=2`,
          )

          if (response.data.code === 200) {
            const timings = response.data.data.timings
            const prayerTimes: PrayerTimes = {
              Fajr: timings.Fajr,
              Dhuhr: timings.Dhuhr,
              Asr: timings.Asr,
              Maghrib: timings.Maghrib,
              Isha: timings.Isha,
            }

            set({
              prayerTimes,
              lastUpdated: new Date().toISOString(),
              isLoading: false,
            })
          } else {
            throw new Error("Failed to fetch prayer times")
          }
        } catch (error) {
          console.error("Prayer times error:", error)
          set({
            error: "Unable to fetch prayer times. Please check your internet connection.",
            isLoading: false,
          })
        }
      },

      setError: (error: string) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: "prayer-storage",
      partialize: (state) => ({
        prayerTimes: state.prayerTimes,
        location: state.location,
        lastUpdated: state.lastUpdated,
      }),
    },
  ),
)
