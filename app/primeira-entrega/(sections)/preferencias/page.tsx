import PreferencesForm from "@/components/preferences-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getLocations } from "@/gsheets/locations";
import { getPreferences } from "@/lib/db/preferences";
import { getClusters } from "@/lib/db/clusters";
import { getOptions } from "@/lib/db/options";
export default async function Preferences() {
  const session = await auth();

  // const clusters = await getClusters(session?.user.station);
  // if (clusters.length > 0) {
  //   redirect("/primeira-entrega/clusters");
  // }

  const preloadedPreferences = await getPreferences(
    session?.user.driverId.toString(),
    session?.user.station
  );

  const locations = await getLocations(session?.user.station);

  const options = await getOptions(session?.user.driverId);

  const parsedOptions = options?.options && JSON.parse(options.options);

  const choosed_station = session?.user.station;

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
