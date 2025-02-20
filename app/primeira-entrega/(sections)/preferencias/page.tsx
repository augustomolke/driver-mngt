import PreferencesForm from "@/components/preferences-form";
import { auth } from "@/auth";
import { getLocations } from "@/gsheets/locations";
import { getPreferences } from "@/lib/db/preferences";
import { getCurrentMode } from "@/lib/getCurrentMode";
export default async function Preferences() {
  const session = await auth();

  // const clusters = await getClusters(session?.user.station);
  // if (clusters.length > 0) {
  //   redirect("/primeira-entrega/clusters");
  // }
  const { choosed_station } = await getCurrentMode();

  const preloadedPreferences = await getPreferences(
    session?.user.driverId.toString(),
    choosed_station
  );

  const locations = await getLocations(choosed_station);

  return (
    <PreferencesForm
      priorityAlert
      choosed_station={choosed_station}
      user={session?.user}
      redirectTo={"/primeira-entrega/waitlist"}
      backButton
      preloadedPreferences={preloadedPreferences}
      regions={locations.map((location) => ({
        value: `${location.buyer_city}_${location.cep5}`,
        label: `CEP - ${location.cep5}-XXX`,
        incentive: location.incentive,
        priority: location.priority,
      }))}
    />
  );
}
