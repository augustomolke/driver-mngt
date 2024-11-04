import PreferencesForm from "@/components/preferences-form";
import { auth } from "@/auth";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import { getPreferences } from "@/gsheets/preferences";
import { getLocations } from "@/gsheets/locations";

export default async function Preferences() {
  const session = await auth();

  const bookings = await fetchQuery(api.bookings.get, {
    driver_id: session.user.driverId.toString(),
  });

  if (bookings.length > 0) {
    redirect("/primeira-entrega");
  }

  const preloadedPreferences = await getPreferences(
    session?.user.driverId.toString()
  );

  const locations = await getLocations(session?.user.station);

  return (
    <PreferencesForm
      priorityAlert
      user={session?.user}
      redirectTo={"/primeira-entrega/confirmation"}
      backButton
      preloadedPreferences={[preloadedPreferences]}
      regions={locations.map((location) => ({
        value: `${location.buyer_city}_${location.cep5}`,
        label: `CEP - ${location.cep5}-XXX`,
        incentive: location.incentive,
        priority: location.priority,
      }))}
    />
  );
}
