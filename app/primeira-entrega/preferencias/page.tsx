import PreferencesForm from "@/components/preferences-form";
import { auth } from "@/auth";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { redirect } from "next/navigation";

export default async function Preferences() {
  const session = await auth();

  const bookings = await fetchQuery(api.bookings.get, {
    driver_id: session.user.driverId.toString(),
  });

  if (bookings.length > 0) {
    redirect("/primeira-entrega");
  }

  const preLoadedLocations = await fetchQuery(api.locations.get, {
    station: session?.user.station,
  });

  const preloadedPreferences = await preloadQuery(api.preferences.get, {
    driver_id: (session?.user.driverId).toString(),
  });

  return (
    <PreferencesForm
      redirectTo={"/primeira-entrega/data"}
      backButton
      preloadedPreferences={preloadedPreferences}
      regions={preLoadedLocations.map((location) => ({
        value: `${location.city}_${location?.neighbor}_${location.zipcode_prefix}`,
        label: `[${location.zipcode_prefix}-XXX] ${location?.neighbor}`,
        incentive: location.incentive,
        priority: location.priority,
      }))}
    />
  );
}
