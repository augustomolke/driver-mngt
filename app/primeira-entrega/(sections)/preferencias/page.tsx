import PreferencesForm from "@/components/preferences-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getLocations } from "@/gsheets/locations";
import { getPreferences } from "@/lib/db/preferences";
import { getClusters } from "@/lib/db/clusters";

export default async function Preferences() {
  const session = await auth();

  // const clusters = await getClusters(session?.user.station);
  // if (clusters.length > 0) {
  //   redirect("/primeira-entrega/clusters");
  // }

  const preloadedPreferences = await getPreferences(
    session?.user.driverId.toString()
  );

  const locations = await getLocations(session?.user.station);

  return (
    <PreferencesForm
      priorityAlert
      user={session?.user}
      redirectTo={"/primeira-entrega/data"}
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
