import PreferencesForm from "@/components/preferences-form";
import { auth } from "@/auth";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export default async function Preferences() {
  const session = await auth();
  const preLoadedLocations = await fetchQuery(api.locations.get, {
    station: session?.user.station,
  });

  const preloadedPreferences = await fetchQuery(api.preferences.get, {
    driver_id: (session?.user.driverId).toString(),
  });

  return (
    <PreferencesForm
      preloadedPreferences={preloadedPreferences}
      regions={preLoadedLocations.map((location) => ({
        value: `${location.city}_${location?.neighbor}_${location.zipcode_prefix}`,
        label: `[${location.zipcode_prefix}] ${location?.neighbor} - ${location.city}`,
      }))}
    />
  );
}
