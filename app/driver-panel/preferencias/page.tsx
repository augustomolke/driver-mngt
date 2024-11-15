import PreferencesForm from "@/components/preferences-form";
import { auth } from "@/auth";
import { getPreferences } from "@/lib/db/preferences";
import { getLocations } from "@/gsheets/locations";

export default async function Preferences() {
  const session = await auth();

  const preferences = await getPreferences(session?.user.driverId.toString());

  const locations = await getLocations(session?.user.station);

  return (
    <PreferencesForm
      incentiveAlert
      user={session?.user}
      redirectTo={"/driver-panel"}
      preloadedPreferences={preferences}
      regions={locations.map((location) => ({
        value: `${location.buyer_city}_${location.cep5}`,
        label: `CEP - ${location.cep5}-XXX`,
        incentive: location.incentive,
        priority: location.priority,
      }))}
    />
  );
}
